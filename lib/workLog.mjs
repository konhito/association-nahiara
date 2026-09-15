import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { readFileSync, writeFileSync, renameSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

export const statuses = ['Not started', 'In progress', 'Waiting', 'Completed'];
export const people = ['Aditya', 'Matías'];
export const cookieName = 'nahiara-work-log';
export const sessionSeconds = 60 * 60 * 12;
export class LogError extends Error {}
const digest = value => createHash('sha256').update(value).digest();
const equal = (a, b) => timingSafeEqual(digest(a), digest(b));

export function configured() {
  return ['WORK_LOG_SECRET', 'WORK_LOG_ADITYA_KEY', 'WORK_LOG_MATIAS_KEY'].every(key => process.env[key]?.length >= 32)
    && process.env.WORK_LOG_ADITYA_KEY !== process.env.WORK_LOG_MATIAS_KEY
    && Boolean(process.env.WORK_LOG_BUCKET || (process.env.NODE_ENV !== 'production' && process.env.WORK_LOG_LOCAL_FILE));
}

export function authenticate(person, key) {
  if (!configured() || typeof key !== 'string' || key.length > 256 || !people.includes(person)) return null;
  const expected = process.env[person === 'Aditya' ? 'WORK_LOG_ADITYA_KEY' : 'WORK_LOG_MATIAS_KEY'];
  return equal(key, expected) ? person : null;
}

export function createSession(person, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ person, expires: now + sessionSeconds * 1000 })).toString('base64url');
  const signature = createHmac('sha256', process.env.WORK_LOG_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function sessionUser(token, now = Date.now()) {
  if (!configured() || typeof token !== 'string' || token.length > 512) return null;
  try {
    const [payload, signature, extra] = token.split('.');
    const expected = createHmac('sha256', process.env.WORK_LOG_SECRET).update(payload).digest('base64url');
    if (extra || !signature || !equal(signature, expected)) return null;
    const { person, expires } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return people.includes(person) && Number.isFinite(expires) && expires > now ? person : null;
  } catch { return null; }
}

function date(value, label, optional = false) {
  if (optional && value === '') return '';
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
    throw new LogError(`Enter a valid ${label}.`);
  }
  return value;
}

export function validateEntry(input) {
  if (!input || typeof input !== 'object') throw new LogError('Enter the instruction details.');
  const entry = {};
  for (const [field, max] of [['instruction', 4000], ['notes', 8000]]) {
    if (typeof input[field] !== 'string' || input[field].length > max) throw new LogError(`${field === 'notes' ? 'Notes' : 'Instruction'} must be under ${max} characters.`);
    entry[field] = input[field].trim();
  }
  if (!entry.instruction) throw new LogError('Enter an instruction.');
  if (!statuses.includes(input.status)) throw new LogError('Choose a valid status.');
  entry.status = input.status;
  entry.receivedOn = date(input.receivedOn, 'received date');
  entry.completedOn = date(input.completedOn, 'completion date', true);
  if (entry.status === 'Completed' && !entry.completedOn) throw new LogError('Add the completion date before marking this completed.');
  if (entry.status !== 'Completed' && entry.completedOn) throw new LogError('A completion date requires Completed status.');
  if (entry.completedOn && entry.completedOn < entry.receivedOn) throw new LogError('Completion cannot be before the instruction was received.');
  return entry;
}

// Encrypt before upload: the site's existing asset bucket may allow public reads.
export function encrypt(value) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', digest(process.env.WORK_LOG_SECRET), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]);
}

export function decrypt(body) {
  const decipher = createDecipheriv('aes-256-gcm', digest(process.env.WORK_LOG_SECRET), body.subarray(0, 12));
  decipher.setAuthTag(body.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(body.subarray(28)), decipher.final()]).toString());
}

// ponytail: one encrypted object for two people, capped at 5,000 entries; archive or split if the log outgrows this.
const objectKey = 'work-log/entries.enc';
const s3 = () => new S3Client({ region: process.env.AWS_REGION || 'ap-south-1' });
const localFile = () => process.env.NODE_ENV !== 'production' && process.env.WORK_LOG_LOCAL_FILE;
const revisionOf = body => createHash('sha256').update(body).digest('hex');
const conflict = () => new LogError('Someone updated the log. Refresh the log, then reopen the entry before saving. Your draft is still here.');

export async function readLog() {
  if (!configured()) throw new LogError('The work log is awaiting server setup.');
  try {
    if (localFile()) {
      const body = readFileSync(localFile());
      return { entries: decrypt(body), revision: revisionOf(body) };
    }
    const result = await s3().send(new GetObjectCommand({ Bucket: process.env.WORK_LOG_BUCKET, Key: objectKey }));
    return { entries: decrypt(Buffer.from(await result.Body.transformToByteArray())), revision: result.ETag };
  } catch (error) {
    if (error.code === 'ENOENT' || error.name === 'NoSuchKey') return { entries: [], revision: null };
    throw error;
  }
}

export async function saveEntry(input, person) {
  if (!people.includes(person)) throw new LogError('Sign in to update the log.');
  const entry = validateEntry(input);
  const current = await readLog();
  if (input.revision !== current.revision) throw conflict();
  const previous = input.id ? current.entries.find(item => item.id === input.id) : null;
  if (input.id && !previous) throw new LogError('This entry no longer exists. Refresh the log.');
  if (!previous && current.entries.length >= 5000) throw new LogError('The log has reached 5,000 entries. Contact the site administrator to archive older entries.');
  const now = new Date().toISOString();
  const saved = { ...entry, id: previous?.id || randomUUID(), createdAt: previous?.createdAt || now, createdBy: previous?.createdBy || person, updatedAt: now, updatedBy: person };
  const entries = previous ? current.entries.map(item => item.id === saved.id ? saved : item) : [saved, ...current.entries];
  const body = encrypt(entries);
  if (localFile()) {
    // Development only: synchronous compare + atomic rename within one Node process.
    let revision = null;
    try { revision = revisionOf(readFileSync(localFile())); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (revision !== current.revision) throw conflict();
    mkdirSync(dirname(localFile()), { recursive: true });
    writeFileSync(`${localFile()}.tmp`, body);
    renameSync(`${localFile()}.tmp`, localFile());
    return { entries, revision: revisionOf(body) };
  }
  try {
    const result = await s3().send(new PutObjectCommand({
      Bucket: process.env.WORK_LOG_BUCKET, Key: objectKey, Body: body,
      ContentType: 'application/octet-stream', CacheControl: 'no-store',
      ...(current.revision ? { IfMatch: current.revision } : { IfNoneMatch: '*' }),
    }));
    return { entries, revision: result.ETag };
  } catch (error) {
    if ([409, 412].includes(error.$metadata?.httpStatusCode)) throw conflict();
    throw error;
  }
}
