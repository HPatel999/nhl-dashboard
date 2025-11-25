import React from "react";

export default function SpecialTeamsStats({ data, primaryColor, textColor }) {
  if (!data || (!data.pp && !data.pk)) return null;

  const { pp, pk } = data;

  const formatLabel = (label) => {
    const names = {
      goals: "Goals",
      assists: "Assists",
      points: "Points",
      shots: "Shots",
      shootingPct: "Shooting %",
      toi: "TOI (min) Per Game",
      toiPct: "TOI % Per Game",
      pointsPer60: "Points / 60",
      goalsPer60: "Goals / 60",
      shotsPer60: "Shots / 60",
      primaryAssistsPer60: "Primary Assists / 60",
      goalsAgainstPer60: "GA / 60",
    };
    return names[label] || label;
  };

  const StatBlock = ({ title, stats }) => (
    <div
      className="rounded-2xl p-6 shadow-md border border-white/10"
      style={{ backgroundColor: primaryColor, color: textColor }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <div className="grid grid-cols-2 gap-y-3 text-sm">
        {Object.entries(stats).map(([key, value]) => (
          <p key={key}>
            <span className="font-medium">{formatLabel(key)}:</span>{" "}
            {typeof value === "number" ? value.toFixed(1) : value}
          </p>
        ))}
      </div>
    </div>
  );

  const NotUsed = ({ title }) => (
    <div
      className="rounded-2xl p-6 shadow-md border border-white/10"
      style={{ backgroundColor: primaryColor, color: textColor }}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm opacity-90">Not used meaningfully on {title}</p>
    </div>
  );

  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pp && hasMeaningfulUsage(pp)
          ? <StatBlock title="Power Play" stats={pp} />
          : <NotUsed title="Power Play" />}

        {pk && hasMeaningfulUsage(pk)
          ? <StatBlock title="Penalty Kill" stats={pk} />
          : <NotUsed title="Penalty Kill" />}
      </div>
    </section>
  );
}

function hasMeaningfulUsage(stats) {
  if (!stats) return false;

  const toiPct = stats.toiPct ?? 0;
  const toi = stats.toi ?? 0;

  if (toiPct < 3 && toi < 5) return false;

  return Object.values(stats).some(v => v !== 0);
}
