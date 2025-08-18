import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function HomeRoadGoalsChart({ goalsData, color }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={goalsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="For" fill={color} />
        <Bar dataKey="Against" fill="#8884d8" />
        <Bar dataKey="Diff" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
