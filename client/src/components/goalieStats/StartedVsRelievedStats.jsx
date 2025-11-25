import React from "react";
import CircularGauge from "../CircularGauge";

export default function StartedVsRelievedStats({ data, primaryColor, textColor }) {
  if (!data) return null;

  const {
    gamesPlayed,
    gamesStarted,
    gamesRelieved,

    gamesStartedWins,
    gamesStartedLosses,
    gamesStartedOtLosses,
    gamesStartedShotsAgainst,
    gamesStartedSaves,
    gamesStartedGoalsAgainst,
    gamesStartedSavePct,

    gamesRelievedWins,
    gamesRelievedLosses,
    gamesRelievedOtLosses,
    gamesRelievedShotsAgainst,
    gamesRelievedSaves,
    gamesRelievedGoalsAgainst,
    gamesRelievedSavePct,
  } = data;
  const statBox = (label, value) => (
    <div className="flex flex-col p-3 bg-white/10 rounded-xl">
      <span className="text-xs opacity-70">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );

  return (
    <div
      className="rounded-2xl p-6 shadow-lg space-y-6 mt-1"
      style={{ backgroundColor: primaryColor, color: textColor }}
    >
      <h2 className="text-xl font-bold">Started vs Relieved Performance</h2>

      <div className="grid grid-cols-3 gap-4">
        {statBox("Games Played", gamesPlayed)}
        {statBox("Starts", gamesStarted)}
        {statBox("Relieved", gamesRelieved)}
      </div>

      <div className="grid grid-cols-2 gap-6 bg-black/10 rounded-xl p-4">
        <CircularGauge
          pct={gamesStartedSavePct * 100}
          label="Save% When Starting"
          primaryColor={primaryColor}
          textColor={textColor}
        />

        <CircularGauge
          pct={gamesRelievedSavePct * 100}
          label="Save% When Relieving"
          primaryColor={primaryColor}
          textColor={textColor}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/10 p-5 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">When Starting</h3>

          <div className="grid grid-cols-2 gap-3">
            {statBox("Wins", gamesStartedWins)}
            {statBox("Losses", gamesStartedLosses)}
            {statBox("OT Losses", gamesStartedOtLosses)}

            {statBox("Shots Against", gamesStartedShotsAgainst)}
            {statBox("Saves", gamesStartedSaves)}
            {statBox("Goals Against", gamesStartedGoalsAgainst)}

            {statBox("Save %", (gamesStartedSavePct * 100).toFixed(2) + "%")}
          </div>
        </div>

        <div className="bg-black/10 p-5 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">When Relieving</h3>

          <div className="grid grid-cols-2 gap-3">
            {statBox("Wins", gamesRelievedWins)}
            {statBox("Losses", gamesRelievedLosses)}
            {statBox("OT Losses", gamesRelievedOtLosses)}

            {statBox("Shots Against", gamesRelievedShotsAgainst)}
            {statBox("Saves", gamesRelievedSaves)}
            {statBox("Goals Against", gamesRelievedGoalsAgainst)}

            {statBox("Save %", (gamesRelievedSavePct * 100).toFixed(2) + "%")}
          </div>
        </div>
      </div>
    </div>
  );
}
