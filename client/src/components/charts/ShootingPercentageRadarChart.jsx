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

export default function ShootingPercentageRadarChart({ radarData, color }) {
  if (!radarData || radarData.length === 0) return null;

  const pctData = radarData.map((d) => ({
    name: d.name,
    value: d.pct,
    rawGoals: d.rawGoals,
    shots: d.shots,
  }));

  const maxPct = Math.max(...pctData.map((d) => d.value));

  return (
    <div className="rounded-3xl bg-white shadow-md p-4 flex flex-col justify-between border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-center text-lg font-medium mb-2 text-gray-700">
        Shooting Percentage by Shot Type
      </h3>
      <div className="h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={pctData}
            margin={{ top: 10, right: 20, bottom: 40, left: 20 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis domain={[0, Math.ceil(maxPct * 1.1)]} />
            <Radar
              name="Shooting %"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.5}
            />
            <Legend verticalAlign="bottom" align="center" />
            <Tooltip content={<CustomPctTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomPctTooltip({ active, payload }) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>Shooting %: {data.value.toFixed(1)}%</p>
        <p>Shots Attempted: {data.shots}</p>
      </div>
    );
  }
  return null;
}
