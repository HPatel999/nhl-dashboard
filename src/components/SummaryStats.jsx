import React from "react";

const SummaryStats = ({ summaryStats, isGoalie }) => {
  if (!summaryStats) return null;

  const seasonTitle = summaryStats.seasonId
    ? `${String(summaryStats.seasonId).slice(0, 4)}-${String(
        summaryStats.seasonId
      ).slice(4)} Season Summary`
    : "Season Summary";

  const StatCard = ({ label, value }) => (
    <div className="bg-gray-50 hover:bg-gray-100 transition rounded-xl p-4 flex flex-col items-center justify-center shadow-sm border border-gray-200">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value ?? "—"}</p>
    </div>
  );

  // Skater stats
  const skaterStats = [
    { label: "Games", value: summaryStats.gamesPlayed },
    { label: "Goals", value: summaryStats.goals },
    { label: "Assists", value: summaryStats.assists },
    { label: "Points", value: summaryStats.points },
    { label: "+/-", value: summaryStats.plusMinus },
    { label: "Shots", value: summaryStats.shots },
    summaryStats.shootingPct !== undefined && {
      label: "Shooting %",
      value: (summaryStats.shootingPct * 100).toFixed(1) + "%",
    },
    summaryStats.faceoffWinPct
      ? { label: "FO %", value: (summaryStats.faceoffWinPct * 100).toFixed(1) + "%" }
      : null,
    { label: "PP Points", value: summaryStats.ppPoints },
    { label: "SH Points", value: summaryStats.shPoints },
    { label: "OT Goals", value: summaryStats.otGoals },
    { label: "GWG", value: summaryStats.gameWinningGoals },
  ].filter(Boolean);

  // Goalie stats
  const goalieStats = [
    { label: "Games", value: summaryStats.gamesPlayed },
    { label: "Starts", value: summaryStats.gamesStarted },
    { label: "Wins", value: summaryStats.wins },
    { label: "Losses", value: summaryStats.losses },
    { label: "OTL", value: summaryStats.otLosses },
    {
      label: "GAA",
      value:
        summaryStats.gaa !== undefined && summaryStats.gaa !== null
          ? summaryStats.gaa.toFixed(2)
          : "—",
    },
    {
      label: "Save %",
      value:
        summaryStats.savePct !== undefined && summaryStats.savePct !== null
          ? (summaryStats.savePct * 100).toFixed(1) + "%"
          : "—",
    },
    { label: "Shutouts", value: summaryStats.shutouts },
    { label: "Saves", value: summaryStats.saves },
  ];

  const stats = isGoalie ? goalieStats : skaterStats;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-8 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
        {seasonTitle}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default SummaryStats;
