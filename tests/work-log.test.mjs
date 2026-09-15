import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { unlinkSync, readFileSync } from 'node:fs';
import { authenticate, configured, createSession, sessionUser, validateEntry, encrypt, decrypt, readLog, saveEntry } from '../lib/workLog.mjs';

const file = join(tmpdir(), `nahiara-work-log-${randomUUID()}.enc`);
Object.assign(process.env, {
  NODE_ENV: 'test', WORK_LOG_LOCAL_FILE: file, WORK_LOG_SECRET: 's'.repeat(40),
  WORK_LOG_ADITYA_KEY: 'a'.repeat(40), WORK_LOG_MATIAS_KEY: 'm'.repeat(40),
});
const input = { instruction: 'Review the English feedback', notes: '', receivedOn: '2026-09-15', completedOn: '', status: 'Not started', revision: null };
try {
  assert.equal(configured(), true);
  assert.equal(authenticate('Matías', 'm'.repeat(40)), 'Matías');
  assert.equal(authenticate('Aditya', 'wrong'), null);
  assert.equal(authenticate('Other', 'a'.repeat(40)), null);
  const token = createSession('Aditya', 1000);
  assert.equal(sessionUser(token, 2000), 'Aditya');
  assert.equal(sessionUser(`${token}x`, 2000), null);
  assert.equal(sessionUser(token, 1000 + 12 * 3600000), null);
  assert.throws(() => validateEntry({ ...input, receivedOn: '2026-02-30' }));
  assert.throws(() => validateEntry({ ...input, instruction: ' ' }));
  assert.throws(() => validateEntry({ ...input, status: 'Completed' }));
  assert.throws(() => validateEntry({ ...input, status: 'Completed', completedOn: '2026-09-14' }));
  assert.throws(() => validateEntry({ ...input, completedOn: '2026-09-16' }));
  assert.throws(() => validateEntry({ ...input, notes: 'x'.repeat(8001) }));
  const encrypted = encrypt([input]);
  assert.deepEqual(decrypt(encrypted), [input]);
  encrypted[30] ^= 1;
  assert.throws(() => decrypt(encrypted));
  assert.deepEqual(await readLog(), { entries: [], revision: null });
  await assert.rejects(saveEntry(input, 'Other'));
  const first = await saveEntry(input, 'Matías');
  assert.equal(first.entries[0].createdBy, 'Matías');
  assert.equal(readFileSync(file).includes(Buffer.from(input.instruction)), false);
  await assert.rejects(saveEntry(input, 'Aditya'), /Someone updated/);
  const completed = await saveEntry({ ...first.entries[0], revision: first.revision, status: 'Completed', completedOn: '2026-09-16', createdBy: 'spoofed' }, 'Aditya');
  assert.equal(completed.entries[0].createdBy, 'Matías');
  assert.equal(completed.entries[0].updatedBy, 'Aditya');
  assert.equal((await readLog()).entries[0].status, 'Completed');
  const attempts = await Promise.allSettled([
    saveEntry({ ...input, revision: completed.revision }, 'Aditya'),
    saveEntry({ ...input, revision: completed.revision }, 'Matías'),
  ]);
  assert.equal(attempts.filter(item => item.status === 'fulfilled').length, 1);
  process.env.NODE_ENV = 'production';
  delete process.env.WORK_LOG_BUCKET;
  assert.equal(configured(), false, 'Production must never use local development storage');
  console.log('Work log checks passed: authentication, expiry, validation, encrypted persistence, attribution, and concurrent edits.');
} finally {
  try { unlinkSync(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
