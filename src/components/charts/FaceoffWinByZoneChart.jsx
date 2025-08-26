import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function FaceoffWinByZone({ faceoffData, color }) {
  const zoneColors = {
    Overall: color,
    "Even Strength": "#ff7f0e",
    "Power Play": "#2ca02c",
    "Shorthanded": "#d62728",
    "Defensive Zone": "#9467bd",
    "Neutral Zone": "#8c564b",
    "Offensive Zone": "#e377c2",
  };

  const renderLegend = () => {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap" }}>
        {faceoffData.map((entry, index) => (
          <li
            key={`legend-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 15,
              marginBottom: 1,
              fontSize: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: zoneColors[entry.name] || "#8884d8",
                marginRight: 6,
                borderRadius: 2,
              }}
            />
            {entry.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={faceoffData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Tooltip />
        <Legend content={renderLegend} />
        <Bar dataKey="value">
          {faceoffData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={zoneColors[entry.name] || "#8884d8"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
