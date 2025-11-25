import { useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GoaliePerformanceChart = ({ seasonTotals, color, textColor }) => {
  const [selectedGameType, setSelectedGameType] = useState(2); 

  const data = seasonTotals
    .filter((s) => s.leagueAbbrev === "NHL" && s.gameTypeId === selectedGameType)
    .map((s) => ({
      season: `${s.season.toString().slice(0, 4)}-${s.season
        .toString()
        .slice(4)}`,
      team: s.teamName.default,
      shotsAgainst: s.shotsAgainst,
      savePctg: s.savePctg,
    }));

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
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="shotsAgainst"
            name="Shots Against"
            label={{
              value: "Shots Against",
              position: "insideBottom",
              offset: -3,
            }}
            
          />
          <YAxis
            type="number"
            dataKey="savePctg"
            name="Save %"
            tickFormatter={(v) => (v * 100).toFixed(1) + "%"}
            domain={[0.7, 1]}
            label={{
              value: "Save%",
              angle: -90,
              position: "left",
              offset: -2,
            }}
            style={{
              fontSize: '13',
          }}
          />

          <ZAxis dataKey="shotsAgainst" range={[50, 3200]} />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {

                const d = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow text-sm">
                    <p className="font-semibold">{d.season}</p>
                    <p>Team: {d.team}</p>
                    <p>Shots Against: {d.shotsAgainst}</p>
                    <p>Save %: {(d.savePctg * 100).toFixed(2)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Scatter
            name="Stints"
            data={data}
            fill={color}
            stroke={textColor}
            strokeWidth={1}            
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoaliePerformanceChart;
