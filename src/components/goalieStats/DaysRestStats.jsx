import React from "react";

export default function DaysRestStats({ data, primaryColor, textColor }) {
  if (!data) return null;

  const {
    savePctDaysRest0,
    savePctDaysRest1,
    savePctDaysRest2,
    savePctDaysRest3,
    savePctDaysRest4Plus,

    gamesPlayedDaysRest0,
    gamesPlayedDaysRest1,
    gamesPlayedDaysRest2,
    gamesPlayedDaysRest3,
    gamesPlayedDaysRest4Plus,
  } = data;

  const restBuckets = [
    { label: "0 Days Rest", value: savePctDaysRest0, gp: gamesPlayedDaysRest0 },
    { label: "1 Day Rest", value: savePctDaysRest1, gp: gamesPlayedDaysRest1 },
    { label: "2 Days Rest", value: savePctDaysRest2, gp: gamesPlayedDaysRest2 },
    { label: "3 Days Rest", value: savePctDaysRest3, gp: gamesPlayedDaysRest3 },
    { label: "4+ Days Rest", value: savePctDaysRest4Plus, gp: gamesPlayedDaysRest4Plus },
  ];


  return (
    <div
      className="w-full rounded-2xl shadow-lg p-6 mt-1"
      style={{ background: primaryColor, color: textColor }}
    >
      <h2 className="text-2xl font-bold mb-4">Save% by Days of Rest</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {restBuckets.map((bucket) => (
          <RestBucketCard
            key={bucket.label}
            label={bucket.label}
            value={bucket.value}
            gp={bucket.gp}
            primaryColor={primaryColor}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  );
}

function RestBucketCard({ label, value, gp, primaryColor, textColor }) {
  if (!value) return null;

  const pct = (value * 100).toFixed(1);

  return (
    <div
      className="rounded-xl bg-black/20 backdrop-blur-sm p-6 flex flex-col items-center text-center shadow-inner"
      style={{ color: textColor }}
    >
      <div className="relative w-20 h-20 mb-3">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="32"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="32"
            stroke={textColor}
            strokeWidth="6"
            fill="none"
            strokeDasharray={2 * Math.PI * 32}
            strokeDashoffset={2 * Math.PI * 32 * (1 - value)}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {pct}%
        </div>
      </div>

      <div className="text-xs font-medium">{label}</div>

      <div className="text-[10px] mt-1 opacity-90">
        GP: {gp}
      </div>


    </div>
  );
}
