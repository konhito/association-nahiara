import Link from 'next/link';
import { configured } from '../../lib/workLog.mjs';
import { currentUser, loadEntries } from './actions';
import WorkLog from './work-log';
import styles from './work-log.module.css';

export const metadata = {
  title: 'Work log',
  description: 'Private project work log for Aditya and Matías.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
export const dynamic = 'force-dynamic';

export default async function WorkLogPage() {
  const user = await currentUser();
  const initial = user ? await loadEntries() : { entries: [], revision: null };
  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/">← Association home</Link>
      <header className={styles.heading}><span className={styles.private}>Private workspace · Aditya &amp; Matías</span><h1>Work log</h1><p>Every instruction, followed through.</p></header>
      {configured() ? <WorkLog initialUser={user} initial={initial} /> : <section className={styles.setup}><h2>The work log is being prepared</h2><p>Private access and shared storage need to be connected before you can sign in. Please contact Aditya.</p></section>}
    </div>
  </main>;
}
