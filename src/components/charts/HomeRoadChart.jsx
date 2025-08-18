import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function HomeRoadResultsChart({ resultsData, color }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={resultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Wins" fill={color} />
        <Bar dataKey="OT" fill="#8884d8" />
        <Bar dataKey="Losses" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
