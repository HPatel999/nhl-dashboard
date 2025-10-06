import { useState } from "react";

export default function SeasonTotals({ seasonTotals, color, isGoalie, textColor }) {
  const [activeTab, setActiveTab] = useState("regular");
  const [leagueFilter, setLeagueFilter] = useState("all"); // new filter state


  const regularSeasons = seasonTotals.filter((s) => s.gameTypeId === 2);
  const playoffSeasons = seasonTotals.filter((s) => s.gameTypeId === 3);

  const tabs = [
    { key: "regular", label: "Regular Season", data: regularSeasons },
    { key: "playoffs", label: "Playoffs", data: playoffSeasons },
  ];

  const skaterColumns = [
  { key: "season", label: "Season" },
  { key: "teamName", label: "Team" },
  { key: "leagueAbbrev", label: "League" },
  { key: "gamesPlayed", label: "GP" },
  { key: "goals", label: "Goals" },
  { key: "assists", label: "Assists" },
  { key: "points", label: "Points" },
  { key: "plusMinus", label: "+/-" },
  { key: "shots", label: "Shots" },
  { key: "shootingPctg", label: "S%" }, // Shooting Percentage
  { key: "powerPlayGoals", label: "PPG" },
  { key: "powerPlayPoints", label: "PPP" },
  { key: "shorthandedGoals", label: "SHG" },
  { key: "shorthandedPoints", label: "SHP" },
  { key: "gameWinningGoals", label: "GWG" },
  { key: "otGoals", label: "OTG" },
  { key: "faceoffWinningPctg", label: "FO%" }, // Faceoff %
  { key: "avgToi", label: "ATOI" }, // Average Time on Ice
  { key: "pim", label: "PIM" }, // Penalty Minutes
];


  const goalieColumns = [
  { key: "season", label: "Season" },
  { key: "teamName", label: "Team" },
  { key: "leagueAbbrev", label: "League" },
  { key: "gamesPlayed", label: "GP" },
  { key: "gamesStarted", label: "GS" },
  { key: "wins", label: "W" },
  { key: "losses", label: "L" },
  { key: "otLosses", label: "OTL" },
  { key: "savePctg", label: "SV%" },
  { key: "goalsAgainstAvg", label: "GAA" },
  { key: "shutouts", label: "SO" },
  { key: "shotsAgainst", label: "SA" },
  { key: "goalsAgainst", label: "GA" },
  { key: "timeOnIce", label: "TOI" },
  { key: "assists", label: "Assists" },
  { key: "pim", label: "PIM" },
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

  const activeTabData = tabs.find((t) => t.key === activeTab).data;
  const filteredData =
    leagueFilter === "nhl"
      ? activeTabData.filter((row) => row.leagueAbbrev === "NHL")
      : activeTabData;


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

      {/* League Filter */}
      <div className="mb-6 flex items-center space-x-3">
        <label className="text-sm md:text-base font-semibold text-gray-700">League:</label>
        <select
          value={leagueFilter}
          onChange={(e) => setLeagueFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Leagues</option>
          <option value="nhl">NHL Only</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr style={{ backgroundColor: color, color: textColor }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredData.map((row, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100 transition-colors:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td
                      key={`${i}-${col.key}`}
                      className="px-4 py-3 whitespace-nowrap text-gray-800"
                    >
                      {formatValue(col.key, row[col.key], row)}
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
