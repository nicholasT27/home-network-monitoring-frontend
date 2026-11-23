import { BellRing, CheckCheck } from 'lucide-react';
import { api } from '../api.js';
import { fullTime, timeAgo } from '../format.js';

const TITLES = { unknown_device: 'Unknown device', suspicious_device: 'Suspicious device', baseline: 'Initial scan complete' };

// This function shows the open alerts.
export default function AlertsPanel({ alerts, onChange }) {
  const ack = async (id) => { try { await api.ackAlert(id); await onChange(); } catch (e) { alert(e.message); } };
  return (
    <section className="card" aria-labelledby="alerts-h">
      <div className="card-head">
        <h2 id="alerts-h"><BellRing size={16} aria-hidden="true" /> Active alerts {alerts.length > 0 && <span className="count">{alerts.length}</span>}</h2>
        {alerts.length > 1 && <button className="btn small" onClick={() => ack('all')}><CheckCheck size={14} /> Dismiss all</button>}
      </div>
      {alerts.length === 0 ? <p className="empty">All clear. No unrecognised devices.</p> : (
        <ul className="alerts">
          {alerts.map((a) => (
            <li key={a.id} className={a.type === 'suspicious_device' ? 'bad' : a.type === 'baseline' ? 'info' : 'warn'}>
              <div>
                <strong>{TITLES[a.type] || 'Alert'}</strong>
                <p>{a.message}</p>
                {a.type !== 'baseline' && <p className="muted mono small">{a.ip || '-'} · {a.mac}{a.hostname ? ` · ${a.hostname}` : ''}</p>}
                <p className="muted small" title={fullTime(a.created_at)}>
                  {timeAgo(a.created_at)}{a.type !== 'baseline' && (a.email_sent ? ' · email sent' : ' · email not sent')}
                </p>
              </div>
              <button className="btn small" onClick={() => ack(a.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
