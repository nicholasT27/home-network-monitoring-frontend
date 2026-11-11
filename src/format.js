// The API returns UTC "YYYY-MM-DD HH:MM:SS" timestamps.
export const parseTime = (s) => (s ? new Date(`${s.replace(' ', 'T')}Z`) : null);

export function timeAgo(s) {
  const d = parseTime(s);
  if (!d) return 'never';
  const sec = Math.max(0, Math.round((Date.now() - d.getTime()) / 1000));
  if (sec < 45) return 'just now';
  if (sec < 3600) return `${Math.round(sec / 60)} min ago`;
  if (sec < 86400) return `${Math.round(sec / 3600)} h ago`;
  return `${Math.round(sec / 86400)} d ago`;
}

export const fullTime = (s) => (parseTime(s) ? parseTime(s).toLocaleString() : '');

export const deviceName = (d) => d.label || d.hostname || 'Unnamed device';

export const isPrivateMac = (mac) => (parseInt(mac.slice(0, 2), 16) & 2) !== 0;

export const EVENT_TEXT = {
  first_seen: 'First seen on the network',
  joined: 'Came online',
  left: 'Went offline',
  ip_changed: 'IP address changed (DHCP)',
  mac_rotated: 'MAC address rotated, same hostname',
};

// Mirrors what the server saves: "192.168.0.124/24" -> "192.168.0.0/24".
export function networkAddress(cidr) {
  const m = cidr.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!m) return cidr.trim();
  const prefix = Number(m[5]);
  const ip = m.slice(1, 5).reduce((acc, o) => acc * 256 + Number(o), 0);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const net = (ip & mask) >>> 0;
  return `${net >>> 24}.${(net >>> 16) & 255}.${(net >>> 8) & 255}.${net & 255}/${prefix}`;
}
