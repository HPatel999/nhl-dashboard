import { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SkaterPerformanceChart = ({ seasonTotals, color, textColor }) => {
  const [selectedGameType, setSelectedGameType] = useState(2); 

  const filtered = seasonTotals.filter(
    (s) => s.leagueAbbrev === "NHL" && s.gameTypeId === selectedGameType
  );

  // Aggregate stats per season (combine rows if traded mid-season)
  const seasonMap = {};
  filtered.forEach((s) => {
    const seasonKey = s.season;
    if (!seasonMap[seasonKey]) {
      seasonMap[seasonKey] = {
        season: `${seasonKey.toString().slice(0, 4)}-${seasonKey
          .toString()
          .slice(4)}`,
        goals: 0,
        assists: 0,
        points: 0,
      };
    }
    seasonMap[seasonKey].goals += s.goals;
    seasonMap[seasonKey].assists += s.assists;
    seasonMap[seasonKey].points += s.points;
  });

  const aggregatedData = Object.values(seasonMap).sort(
    (a, b) => parseInt(a.season) - parseInt(b.season)
  );

  // const colorCons = getTwoContrastingColors(color)
  const lighter = adjustColor(color, 40); // lighter
  const darker = adjustColor(color, -40)
  console.log(textColor);


  return (
    <div className="p-4 bg-white rounded-2xl shadow w-full">
      {/* Toggle */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setSelectedGameType(2)}
          className="px-4 py-2 rounded-xl transition-colors duration-200"
          style={
            selectedGameType === 2
              ? { backgroundColor: color, color: textColor }
              : { backgroundColor: "#e5e7eb", color: "#1f2937" } 
          }
        >
          Regular Season
        </button>

        <button
          onClick={() => setSelectedGameType(3)}
          className="px-4 py-2 rounded-xl transition-colors duration-200"
          style={
            selectedGameType === 3
              ? { backgroundColor: color, color: textColor }
              : { backgroundColor: "#e5e7eb", color: "#1f2937" }
          }
        >
          Playoffs
        </button>
      </div>


      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={aggregatedData}>
          <XAxis dataKey="season" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="goals" fill={lighter} name="Goals" stackId="a" />
          <Bar dataKey="assists" fill={darker} name="Assists" stackId="a" />

          <Line
            type="monotone"
            dataKey="points"
            stroke={color}
            strokeWidth={3}
            name="Points"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

function adjustColor(hex, amount) {
  let usePound = false;

  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }

  let num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1);
}

export default SkaterPerformanceChart;
