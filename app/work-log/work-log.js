'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut, loadEntries, updateEntry } from './actions';
import styles from './work-log.module.css';

const statuses = ['Not started', 'In progress', 'Waiting', 'Completed'];
const today = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; };
const freshEntry = () => ({ instruction: '', receivedOn: today(), status: 'Not started', completedOn: '', notes: '' });
const formatDate = value => value ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value)) : '—';

export default function WorkLog({ initialUser, initial }) {
  const [user, setUser] = useState(initialUser);
  const [log, setLog] = useState(initial);
  const [draft, setDraft] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initial.error || '');
  const [notice, setNotice] = useState('');
  const [lastChecked, setLastChecked] = useState(null);

  function accept(result) {
    if (result.error) {
      setError(result.error);
      if (result.signedOut) { setUser(null); setLog({ entries: [], revision: null }); }
      return false;
    }
    setLog(result);
    setLastChecked(new Date());
    setError('');
    return true;
  }

  async function refresh() {
    setBusy(true);
    try { accept(await loadEntries()); } catch { setError('Could not refresh the log. Check your connection and try again.'); }
    finally { setBusy(false); }
  }

  useEffect(() => {
    if (!user || draft || busy) return;
    let active = true;
    const timer = setInterval(async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const result = await loadEntries();
        if (active) accept(result);
      } catch { if (active) setError('Automatic refresh failed. Use Refresh to try again.'); }
    }, 60000);
    return () => { active = false; clearInterval(timer); };
  }, [user, draft, busy]);

  useEffect(() => {
    if (!draft) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [draft]);

  async function login(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError('');
    try {
      const result = await signIn(form.get('person'), form.get('key'));
      if (result.error) setError(result.error);
      else { setUser(result.user); accept(await loadEntries()); }
    } catch { setError('Could not sign in. Check your connection and try again.'); }
    finally { setBusy(false); }
  }

  async function logout() {
    if (draft && !window.confirm('Discard your unsaved changes and sign out?')) return;
    setBusy(true);
    try { await signOut(); setUser(null); setDraft(null); setLog({ entries: [], revision: null }); setError(''); setNotice(''); }
    catch { setError('Could not sign out. Please try again.'); }
    finally { setBusy(false); }
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true); setError(''); setNotice('');
    try {
      if (accept(await updateEntry(draft))) { setDraft(null); setNotice('Entry saved to the shared log.'); }
    } catch { setError('Could not save. Your draft is still here; please try again.'); }
    finally { setBusy(false); }
  }

  function open(entry, column = 'instruction') {
    if (draft && !window.confirm('Discard the current unsaved draft?')) return;
    setDraft({ ...(entry || freshEntry()), revision: log.revision });
    setNotice(''); setError('');
    requestAnimationFrame(() => document.getElementById(`cell-${column}`)?.focus());
  }

  function close() {
    if (window.confirm('Discard this unsaved draft?')) setDraft(null);
  }

  const entries = log.entries || [];
  const query = search.trim().toLowerCase();
  const visible = entries.filter(entry => (filter === 'All' ? entry.status !== 'Completed' : entry.status === filter) && `${entry.instruction} ${entry.notes} ${entry.createdBy}`.toLowerCase().includes(query));
  const field = event => setDraft({ ...draft, [event.target.name]: event.target.value });
  const rows = draft && !visible.some(entry => entry.id === draft.id) ? [draft, ...visible] : visible;

  function editableRow(entry, index) {
    const editing = draft && (entry === draft || entry.id === draft.id);
    const value = editing ? draft : entry;
    const cell = (column, content) => <button className={styles.cellButton} type="button" disabled={busy} onClick={() => open(entry, column)} aria-label={`Edit ${column === 'completedOn' ? 'completion date' : column} in row ${index + 1}`}>{content || <span className={styles.blank}>—</span>}</button>;
    return <tr key={entry.id || 'new'} className={editing ? styles.editing : undefined}>
      <th scope="row" className={styles.rowNumber}>{index + 1}</th>
      <td>{editing ? <textarea id="cell-instruction" aria-label="Instruction received" name="instruction" value={value.instruction} onChange={field} required maxLength={4000} rows={3} disabled={busy} /> : cell('instruction', value.instruction)}</td>
      <td>{editing ? <input id="cell-receivedOn" aria-label="Date received" name="receivedOn" type="date" value={value.receivedOn} onChange={field} required disabled={busy} /> : cell('receivedOn', formatDate(value.receivedOn))}</td>
      <td>{editing ? <select id="cell-status" aria-label="Status" value={value.status} onChange={event => setDraft({ ...draft, status: event.target.value, completedOn: event.target.value === 'Completed' ? draft.completedOn || today() : '' })} disabled={busy}>{statuses.map(status => <option key={status}>{status}</option>)}</select> : cell('status', <span className={styles.badge} data-status={value.status}>{value.status}</span>)}</td>
      <td>{editing ? <input id="cell-completedOn" aria-label="Completion date" name="completedOn" type="date" value={value.completedOn} onChange={event => setDraft({ ...draft, completedOn: event.target.value, status: event.target.value ? 'Completed' : draft.status === 'Completed' ? 'In progress' : draft.status })} min={value.receivedOn} required={value.status === 'Completed'} disabled={busy} /> : cell('completedOn', formatDate(value.completedOn))}</td>
      <td>{editing ? <textarea id="cell-notes" aria-label="Progress notes" name="notes" value={value.notes} onChange={field} maxLength={8000} rows={3} disabled={busy} /> : cell('notes', value.notes)}</td>
      <td className={styles.updatedCell}>{value.updatedBy || user}<small>{value.updatedAt ? formatDate(value.updatedAt) : 'Not saved yet'}</small></td>
      <td><div className={styles.rowActions}>{editing ? <><button className={styles.primary} type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save row'}</button><button type="button" onClick={close} disabled={busy}>Cancel</button></> : <button type="button" onClick={() => open(entry)} disabled={busy}>Edit row</button>}</div></td>
    </tr>;
  }

  return <>
    {error && <div className={styles.error} role="alert">{error}</div>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {!user ? <section className={styles.login}>
      <h2>Open your shared log</h2><p>Sign in to record instructions and keep each other up to date.</p>
      <form onSubmit={login}>
        <label>Your name<select name="person" autoComplete="username"><option>Aditya</option><option>Matías</option></select></label>
        <label>Access key<input name="key" type="password" autoComplete="current-password" required maxLength={256} /></label>
        <button className={styles.primary} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form><p className={styles.hint}>Private to this project. Your session lasts 12 hours.</p>
    </section> : <>
      <div className={styles.toolbar}>
        <div><strong>{user}</strong><span className={styles.hint}> · Shared with {user === 'Aditya' ? 'Matías' : 'Aditya'}</span></div>
        <div className={styles.actions}><button type="button" onClick={refresh} disabled={busy}>{busy ? 'Please wait…' : 'Refresh'}</button><button type="button" onClick={logout} disabled={busy}>Sign out</button><button className={styles.primary} type="button" onClick={() => open()} disabled={busy || Boolean(log.error)}>+ Add instruction</button></div>
      </div>
      <section aria-labelledby="instructions-heading">
        <div className={styles.listHeading}><div><h2 id="instructions-heading">Instructions &amp; progress</h2><p className={styles.hint}>{entries.length} {entries.length === 1 ? 'instruction' : 'instructions'} · {entries.filter(entry => entry.status !== 'Completed').length} open</p></div><label className={styles.search}>Search instructions<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search instructions or notes" /></label></div>
        <div className={styles.filters} aria-label="Filter by status">{['All', ...statuses].map(status => <button key={status} type="button" aria-pressed={filter === status} onClick={() => setFilter(status)}>{status}<span>{entries.filter(entry => status === 'All' ? entry.status !== 'Completed' : entry.status === status).length}</span></button>)}</div>
        <p className={styles.sheetHint}>{draft ? 'Editing a row · Tab moves between cells. Choose Save row when finished.' : 'Click a cell to edit. Setting a completion date also marks the instruction Completed.'}</p>
        <form onSubmit={save}>
          <div className={styles.sheetScroll} role="region" aria-label="Work log spreadsheet" tabIndex={0}>
            <table className={styles.sheet}>
              <caption className={styles.srOnly}>Shared work log. Click a cell to edit its row, then save your changes.</caption>
              <colgroup>{[48, 300, 160, 170, 160, 340, 150, 120].map((width, index) => <col key={index} style={{ width }} />)}</colgroup>
              <thead><tr className={styles.letters} aria-hidden="true"><th></th>{['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(letter => <th key={letter}>{letter}</th>)}</tr><tr><th scope="col">#</th>{['Instruction received', 'Date received', 'Status', 'Completion date', 'Progress notes', 'Last updated by', 'Actions'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
              <tbody>{rows.map(editableRow)}{!rows.length && <tr><th scope="row" className={styles.rowNumber}>1</th><td colSpan={7} className={styles.empty}>{entries.length ? 'No matching instructions. Change the search or status filter.' : <button type="button" onClick={() => open()} disabled={busy || Boolean(log.error)}>+ Add your first instruction</button>}</td></tr>}</tbody>
            </table>
          </div>
        </form>
        <div className={styles.sheetFooter}><span>Work log</span><span>{rows.length} {rows.length === 1 ? 'row' : 'rows'} · {draft ? 'Unsaved changes' : 'Ready'}</span></div>
        <p className={styles.sync}>Shared log · {lastChecked ? `Checked at ${lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Loaded from shared storage'} · {draft ? 'Automatic refresh paused while editing' : 'Refreshes every minute'}</p>
      </section>
    </>}
  </>;
}
