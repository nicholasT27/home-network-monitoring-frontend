<<<<<<< HEAD
//This function shows one summary box at the top of the dashboard.//
=======
// This function shows one summary box at the top of the dashboard.
>>>>>>> b8f272a4cab355dfdb13096756d0085c5cdd9f5e
export default function Tile({ label, value, tone, hint }) {
  return (
    <div className={`tile ${tone || ''}`}>
      <span className="tile-label">{label}</span>
      <strong className="tile-value">{value}</strong>
      {hint && <span className="tile-hint">{hint}</span>}
    </div>
  );
}
