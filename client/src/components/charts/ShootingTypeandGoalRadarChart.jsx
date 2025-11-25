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

export default function ShootingTypeandGoalRadarChart({ radarData, color }) {
  const maxValue = Math.max(...radarData.flatMap((d) => [d.goals, d.pct]));
  const oppositeColor = getOppositeColor(color);

  return (
    <div className="w-full h-[450px]"> 
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="70%"
          data={radarData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name"  />
          <PolarRadiusAxis angle={20} domain={[0, Math.ceil(maxValue * 1.1)]} />
          <Radar
            name="Goals (% of total)"
            dataKey="goals"
            stroke={oppositeColor}
            fill={oppositeColor}
            fillOpacity={0.5}
          />
          <Radar
            name="Shooting %"
            dataKey="pct"
            stroke={color}
            fill={color}
            fillOpacity={0.5}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
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
