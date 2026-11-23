import { EVENT_TEXT, fullTime, timeAgo } from '../format.js';

// This function shows the recent activity.
export default function ActivityPanel({ events }) {
  return (
    <section className="card" aria-labelledby="activity-h">
      <h2 id="activity-h">Recent activity</h2>
      {events.length === 0 ? <p className="empty">Nothing recorded yet.</p> : (
        <ul className="timeline">
          {events.slice(0, 12).map((e) => (
            <li key={e.id}>
              <span>{EVENT_TEXT[e.event] || e.event}<br /><span className="muted small mono">{e.hostname || e.mac} · {e.ip}</span></span>
              <time title={fullTime(e.event_time)}>{timeAgo(e.event_time)}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
