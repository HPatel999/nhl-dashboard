import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function FaceoffRadarChart({ faceoffData, color }) {
  if (!faceoffData) return null;

  const radarData = [
    { zone: "Overall", value: (faceoffData.faceoffWinPct || 0) * 100 },
    { zone: "Even Strength", value: (faceoffData.evFaceoffPct || 0) * 100 },
    { zone: "Power Play", value: (faceoffData.ppFaceoffPct || 0) * 100 },
    { zone: "Shorthanded", value: (faceoffData.shFaceoffPct || 0) * 100 },
    { zone: "Defensive Zone", value: (faceoffData.defensiveZoneFaceoffPct || 0) * 100 },
    { zone: "Neutral Zone", value: (faceoffData.neutralZoneFaceoffPct || 0) * 100 },
    { zone: "Offensive Zone", value: (faceoffData.offensiveZoneFaceoffPct || 0) * 100 },
  ].filter((d) => d.value > 0);

  if (radarData.length === 0) return null;

  return (
    <div className="flex-col w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Faceoff Win % by Zone
      </h2>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-gray-100 p-6 w-full">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="zone"
              tick={{ fill: "#374151", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, Math.ceil(Math.max(...radarData.map((d) => d.value)) + 5)]}
              tick={{ fill: "#6b7280" }}
            />
            <Radar
              name="Faceoff %"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.45}
              dot={{ r: 3 }}
            />
            <Tooltip
              formatter={(val) => `${val.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
