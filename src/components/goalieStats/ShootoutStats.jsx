import React from "react";
import CircularGauge from "../CircularGauge";

export default function ShootoutStats({ data, primaryColor, textColor }) {
  if (!data) return null;

  const {
    gamesPlayed,
    shootoutShotsAgainst,
    shootoutSaves,
    shootoutGoalsAgainst,
    shootoutWins,
    shootoutLosses,
    shootoutSavePct,

    careerShootoutGamesPlayed,
    careerShootoutShotsAgainst,
    careerShootoutSaves,
    careerShootoutGoalsAllowed,
    careerShootoutWins,
    careerShootoutLosses,
    careerShootoutSavePct,
  } = data;

  const statBox = (label, value) => (
    <div className="flex flex-col p-3 bg-white/10 rounded-xl">
      <span className="text-xs opacity-70">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );

  return (
    <div
      className="rounded-2xl p-6 shadow-lg space-y-8 mt-1"
      style={{ backgroundColor: primaryColor, color: textColor }}
    >
      <h2 className="text-xl font-bold">Shootout Performance</h2>

      <div className="grid grid-cols-2 gap-6 bg-black/10 rounded-xl p-4">
        <CircularGauge
          pct={shootoutSavePct * 100}
          label="Season Save%"
          primaryColor={primaryColor}
          textColor={textColor}
        />

        <CircularGauge
          pct={careerShootoutSavePct * 100}
          label="Career Save%"
          primaryColor={primaryColor}
          textColor={textColor}
        />
      </div>

      <div className="bg-black/10 p-5 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Season (2024-25)</h3>

        <div className="grid grid-cols-2 gap-3">
          {statBox("Games Played", gamesPlayed)}
          {statBox("Shots Against", shootoutShotsAgainst)}
          {statBox("Saves", shootoutSaves)}
          {statBox("Goals Allowed", shootoutGoalsAgainst)}
          {statBox("Wins", shootoutWins)}
          {statBox("Losses", shootoutLosses)}
          {statBox("Save %", (shootoutSavePct * 100).toFixed(1) + "%")}
        </div>
      </div>

      <div className="bg-black/10 p-5 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Career</h3>

        <div className="grid grid-cols-2 gap-3">
          {statBox("Games Played", careerShootoutGamesPlayed)}
          {statBox("Shots Against", careerShootoutShotsAgainst)}
          {statBox("Saves", careerShootoutSaves)}
          {statBox("Goals Allowed", careerShootoutGoalsAllowed)}
          {statBox("Wins", careerShootoutWins)}
          {statBox("Losses", careerShootoutLosses)}
          {statBox("Save %", (careerShootoutSavePct * 100).toFixed(1) + "%")}
        </div>
      </div>
    </div>
  );
}
