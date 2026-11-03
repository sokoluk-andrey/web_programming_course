const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Circular progress indicator; the stroke animates via a CSS transition
export default function ProgressRing({ done, total }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className={`progress ${pct === 100 ? 'progress--complete' : ''}`} title={`${pct}% complete`}>
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="progress__track" cx="32" cy="32" r={RADIUS} />
        <circle
          className="progress__bar"
          cx="32"
          cy="32"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - pct / 100)}
        />
      </svg>
      <span className="progress__label">{pct}%</span>
    </div>
  );
}
