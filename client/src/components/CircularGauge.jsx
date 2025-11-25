export default function CircularGauge({ pct, label, primaryColor, textColor }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={textColor}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="text-center -mt-6 font-bold mt-2" style={{ color: textColor }}>
        {pct.toFixed(1)}%
      </div>

      <div className="text-sm opacity-80 mt-1">{label}</div>
    </div>
  );
}
