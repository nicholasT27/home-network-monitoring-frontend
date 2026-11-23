import { useState } from 'react';
import { Cpu } from 'lucide-react';
import { API_URL } from '../api.js';

export default function AgentPanel({ status }) {
  const [copied, setCopied] = useState('');
  const settings = `AGENT_API_URL=${new URL(API_URL, window.location.href).href}\nAGENT_KEY=${status.agent_key}`;
  async function copy(text, what) {
    try { await navigator.clipboard.writeText(text); setCopied(what); setTimeout(() => setCopied(''), 2000); } catch { /* clipboard unavailable */ }
  }
  return (
    <section className="card" aria-labelledby="agent-h">
      <h2 id="agent-h"><Cpu size={16} aria-hidden="true" /> Home agent <span className={`badge ${status.agent_online ? 'ok' : 'bad'}`}>{status.agent_online ? 'Online' : 'Offline'}</span></h2>
      <p className="muted small">A website cannot see inside your home network, so a small agent must run on a computer connected to your router. It scans your network and sends the results here. It only makes outgoing connections.</p>
      <ol className="steps small">
        <li>On that computer install <strong>PHP</strong> and download the <strong>home-network-monitoring-backend</strong> project from GitHub.</li>
        <li>In that folder, create a file named <code>.env</code> with these two lines:
          <pre className="code">{settings}</pre>
          <button className="btn small" onClick={() => copy(settings, 'settings')}>{copied === 'settings' ? 'Copied' : 'Copy'}</button>
        </li>
        <li>Run <code>sudo php agent.php</code> and leave it open (on Windows, open the terminal as Administrator and run <code>php agent.php</code>). The first line should say <strong>ARP check: ON</strong>, so that devices which ignore pings are found too; without administrator rights it says OFF and the agent still works with pings only. This panel turns <strong>Online</strong>.</li>
      </ol>
      <p className="muted small">Keep your agent key private: it lets a program send data to your account.</p>
    </section>
  );
}
