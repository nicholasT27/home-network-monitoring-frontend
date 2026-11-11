export default function Tile({ label, value, tone, hint }) {
  return (
    <div className={`tile ${tone || ''}`}>
      <span className="tile-label">{label}</span>
      <strong className="tile-value">{value}</strong>
      {hint && <span className="tile-hint">{hint}</span>}
    </div>
  );
}
