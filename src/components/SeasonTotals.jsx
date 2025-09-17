import { useState } from "react";

export default function SeasonTotals({ seasonTotals, color, isGoalie }) {
  const [activeTab, setActiveTab] = useState("regular");

  const regularSeasons = seasonTotals.filter((s) => s.gameTypeId === 2);
  const playoffSeasons = seasonTotals.filter((s) => s.gameTypeId === 3);

  const tabs = [
    { key: "regular", label: "Regular Season", data: regularSeasons },
    { key: "playoffs", label: "Playoffs", data: playoffSeasons },
  ];

  const skaterColumns = [
    "season",
    "teamName",
    "leagueAbbrev",
    "gamesPlayed",
    "goals",
    "assists",
    "points",
    "plusMinus",
    "shots",
    "shootingPctg",
    "powerPlayGoals",
    "powerPlayPoints",
    "shorthandedGoals",
    "shorthandedPoints",
    "gameWinningGoals",
    "otGoals",
    "pim",
    "avgToi",
    "faceoffWinningPctg",
  ];

  const goalieColumns = [
    "season",
    "teamName",
    "leagueAbbrev",
    "gamesPlayed",
    "gamesStarted",
    "wins",
    "losses",
    "otLosses",
    "shotsAgainst",
    "goalsAgainst",
    "goalsAgainstAvg",
    "savePctg",
    "shutouts",
    "timeOnIce",
    "assists",
    "pim",
  ];

  const columns = isGoalie ? goalieColumns : skaterColumns;

  // Helpers
  const formatSeason = (season) =>
    season ? `${String(season).slice(0, 4)}-${String(season).slice(4)}` : "—";

  const formatValue = (key, val, row) => {
    if (val === undefined || val === null) return "—";

    if (key === "season") return formatSeason(val);
    if (key === "teamName") return row.teamName?.default || "—";
    if (key === "leagueAbbrev") return row.leagueAbbrev || "—";

    if (typeof val === "number") {
      // Keep 3 decimals for percentages/averages
      if (
        key.toLowerCase().includes("pctg") ||
        key.toLowerCase().includes("avg")
      ) {
        return val.toFixed(3).replace(/\.?0+$/, "");
      }
      return val;
    }

    return val;
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="pb-2 px-4 font-medium border-b-2 transition-colors"
              style={{
                borderColor: isActive ? color : "transparent",
                color: isActive ? color : "#6b7280", // gray-500 fallback
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left border-b whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabs
              .find((t) => t.key === activeTab)
              .data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-3 py-2 border-b whitespace-nowrap"
                    >
                      {formatValue(col, row[col], row)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
