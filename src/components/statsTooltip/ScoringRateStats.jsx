import StatWithTooltip from "../ToolTip";

export default function ScoringRateStats({ data,primaryColor,textColor }) {
  if (!data) return null;
  const t = textColor || "text-black";

  return (
    <div className=" p-8 rounded-2xl shadow-md space-y-8 mb-1"style={{ background: primaryColor, color: textColor }}>
      <h2 className="text-2xl font-bold">5v5 Scoring Rate</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

        <StatWithTooltip
          label="Goals (5v5)"
          value={data.goals5v5}
          tooltip="Total goals scored at 5v5 this season."
          textColor={t}

        />

        <StatWithTooltip
          label="Goals/60 (5v5)"
          value={data.goalsPer605v5.toFixed(2)}
          tooltip="Goal scoring rate per 60 minutes at 5v5 — best indicator of pure scoring pace."
          textColor={t}
        />

        <StatWithTooltip
          label="Assists (5v5)"
          value={data.assists5v5}
          tooltip="Total assists at 5v5 this season."
          textColor={t}
        />

        <StatWithTooltip
          label="Assists/60"
          value={data.assistsPer605v5.toFixed(2)}
          tooltip="Total assists per 60 minutes — helps separate role vs opportunity."
          textColor={t}
        />

        <StatWithTooltip
          label="Primary Assists/60"
          value={data.primaryAssistsPer605v5.toFixed(2)}
          tooltip="Primary assists per 60 — direct playmaking impact, strongest signal of pass-first skill."
          textColor={t}
        />

        <StatWithTooltip
          label="Points/60"
          value={data.pointsPer605v5.toFixed(2)}
          tooltip="Points per 60 minutes — best single metric of 5v5 offensive production."
          textColor={t}
        />

        <StatWithTooltip
          label="On-Ice Sh% (5v5)"
          value={(data.onIceShootingPct5v5 * 100).toFixed(1) + "%"}
          tooltip="Shooting percentage of teammates while this player is on the ice."
          textColor={t}
        />

        <StatWithTooltip
          label="OZ Start% (5v5)"
          value={(data.offensiveZoneStartPct5v5 * 100).toFixed(1) + "%"}
          tooltip="Offensive zone start ratio — shows how sheltered or offensive their deployment is."
          textColor={t}
        />

        <StatWithTooltip
          label="Net Penalties/60"
          value={data.netMinorPenaltiesPer60.toFixed(2)}
          tooltip="Penalties drawn minus taken per 60 — important for team value."
          textColor={t}
        />

      </div>
    </div>
  );
}
