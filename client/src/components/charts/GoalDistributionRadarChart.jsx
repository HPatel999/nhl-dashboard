import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GoalDistributionRadarChart({ radarData, color }) {
  if (!radarData || radarData.length === 0) return null;

  const oppositeColor = getOppositeColor(color);

  const goalsData = radarData.map((d) => ({
    name: d.name,
    value: d.goals,
    rawGoals: d.rawGoals,
    shots: d.shots,
  }));


  const maxGoals = Math.max(...goalsData.map((d) => d.value));

  return (
    <div className="rounded-3xl bg-white shadow-md p-4 flex flex-col justify-between border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-center text-lg font-medium mb-2 text-gray-700">
        Goals Distribution by Shot Type
      </h3>
      <div className="h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={goalsData}
            margin={{ top: 10, right: 20, bottom: 40, left: 20 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis domain={[0, Math.ceil(maxGoals * 1.1)]} />
            <Radar
              name="Goals (% of total)"
              dataKey="value"
              stroke={oppositeColor}
              fill={oppositeColor}
              fillOpacity={0.5}
            />
            <Legend verticalAlign="bottom" align="center" />
          <Tooltip content={<CustomGoalsTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
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

function CustomGoalsTooltip({ active, payload }) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>Goals (% of total): {data.value.toFixed(1)}%</p>
        <p>Raw Goals: {data.rawGoals}</p>
      </div>
    );
  }
  return null;
}
