import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function HomeRoadGoalsChart({ goalsData, color }) {
      const oppositeColor = getOppositeColor(color)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={goalsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="For" fill={color} />
        <Bar dataKey="Against" fill={oppositeColor} />
        <Bar dataKey="Diff" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function getOppositeColor(hex) {
  const cleanHex = hex.replace("#", "");
  const r = 255 - parseInt(cleanHex.substring(0, 2), 16);
  const g = 255 - parseInt(cleanHex.substring(2, 4), 16);
  const b = 255 - parseInt(cleanHex.substring(4, 6), 16);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}