import { useEffect, useState } from 'react';
import { Mail, Settings } from 'lucide-react';
import { api } from '../api.js';
import { networkAddress } from '../format.js';
import Note from './Note.jsx';

export default function SettingsPanel({ status, onSaved }) {
  const [subnet, setSubnet] = useState(status?.subnet || '');
  const [email, setEmail] = useState(status?.alert_email || '');
  const [netNote, setNetNote] = useState(null);
  const [mailNote, setMailNote] = useState(null);
  const [testing, setTesting] = useState(false);
  // Follow the server's values (e.g. after a save or a reload) without resetting the messages.
  useEffect(() => { setSubnet(status.subnet || ''); }, [status.subnet]);
  useEffect(() => { setEmail(status.alert_email || ''); }, [status.alert_email]);

  async function saveNetwork(e) {
    e.preventDefault();
    try {
      await api.saveSettings({ subnet });
      setNetNote({ text: subnet.trim() ? `Network range saved. Scans will now look at ${networkAddress(subnet)}.` : 'Network range cleared. The default range will be used.' });
      onSaved();
    } catch (err) { setNetNote({ text: err.message, error: true }); }
  }
  async function saveEmail(e) {
    e.preventDefault();
    try {
      await api.saveSettings({ alert_email: email });
      setMailNote({ text: email.trim()
        ? `Email saved. We will email ${email.trim()} when a new unknown or suspicious device is detected.`
        : 'Email alerts turned off. No emails will be sent.' });
      onSaved();
    } catch (err) { setMailNote({ text: err.message, error: true }); }
  }
  async function sendTest() {
    setTesting(true);
    setMailNote(null);
    try {
      const r = await api.testEmail();
      setMailNote(r.sent
        ? { text: `Test email sent to ${r.to}. Check your inbox (and spam).` }
        : { text: `Could not send the test email (via ${r.via}). The server's email settings are missing or wrong.`, error: true });
    } catch (err) {
      setMailNote({ text: err.message, error: true });
    } finally {
      setTesting(false);
    }
  }
  const emailChanged = email.trim() !== (status.alert_email || '');

  return (
    <section className="card" aria-labelledby="settings-h">
      <h2 id="settings-h"><Settings size={16} aria-hidden="true" /> Network &amp; alerts</h2>

      <form className="settings-form" onSubmit={saveNetwork}>
        <label htmlFor="subnet">Your network range</label>
        <input id="subnet" value={subnet} onChange={(e) => { setSubnet(e.target.value); setNetNote(null); }} placeholder="192.168.0.0/24" className="mono" />
        <p className="muted small">Take your computer's IP (for example 192.168.0.124), keep the first three numbers and end with .0/24.</p>
        <div className="row"><button className="btn primary">Save network</button></div>
        <Note note={netNote} onDone={() => setNetNote(null)} />
      </form>

      <hr className="divider" />

      <form className="settings-form" onSubmit={saveEmail}>
        <label htmlFor="alert-email"><Mail size={14} aria-hidden="true" /> Email for alerts</label>
        <input id="alert-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setMailNote(null); }} placeholder="test@gmail.com" />
        <p className="muted small">An email is sent when a new unknown or suspicious device is detected, even if the dashboard is closed.</p>
        <div className="row">
          <button className="btn primary">Save email</button>
          <button type="button" className="btn" onClick={sendTest} disabled={testing || !status.alert_email || emailChanged}
            title={emailChanged ? 'Save the email first' : undefined}>{testing ? 'Sending…' : 'Send test email'}</button>
        </div>
        <Note note={mailNote} onDone={() => setMailNote(null)} />
      </form>
    </section>
  );
}
