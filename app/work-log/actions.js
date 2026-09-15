'use server';

import { cookies } from 'next/headers';
import { authenticate, cookieName, createSession, sessionUser, sessionSeconds, readLog, saveEntry, LogError } from '../../lib/workLog.mjs';

export async function currentUser() {
  return sessionUser((await cookies()).get(cookieName)?.value);
}

export async function signIn(person, key) {
  const user = authenticate(person, key);
  if (!user) return { error: 'The name or access key is incorrect, or access has not been configured.' };
  (await cookies()).set(cookieName, createSession(user), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/work-log', maxAge: sessionSeconds,
  });
  return { user };
}

export async function signOut() {
  (await cookies()).set(cookieName, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/work-log', maxAge: 0 });
  return { success: true };
}

async function execute(input) {
  const user = await currentUser();
  if (!user) return { error: 'Your session has ended. Sign in again. Your unsaved draft has been kept on this page.', signedOut: true };
  try {
    return input ? await saveEntry(input, user) : await readLog();
  } catch (error) {
    if (error instanceof LogError) return { error: error.message };
    console.error('Work log storage failure:', error.name);
    return { error: 'The shared log could not be reached. Your draft has not been cleared. Please try again.' };
  }
}

export async function loadEntries() { return execute(); }
export async function updateEntry(input) { return execute(input); }
