import StatWithTooltip from "../ToolTip";

export default function PuckPossessionStats({ data,primaryColor,textColor }) {
  if (!data) return null;
  const d = data;
  const t = textColor || "text-black";


  return (
    <div className="p-8 rounded-2xl shadow-md space-y-8 mb-1" style={{ background: primaryColor, color: textColor }}>
      <h2 className="text-2xl font-bold">Puck Possession & Deployment</h2>
      <div>
        <h3 className="text-lg font-semibold mb-4">Zone Start Distribution</h3>

        <div className="grid grid-cols-3 gap-8">

          <StatWithTooltip
            label="Defensive Zone Starts"
            value={(d.defensiveZoneStartPct * 100).toFixed(1) + "%"}
            tooltip="Percentage of 5v5 shifts beginning in the defensive zone. More DZ starts usually means harder defensive deployment."
            textColor={t}

          />

          <StatWithTooltip
            label="Neutral Zone Starts"
            value={(d.neutralZoneStartPct * 100).toFixed(1) + "%"}
            tooltip="How often shifts start in the neutral zone. These are generally 'fair' starts without advantage or disadvantage."
            textColor={t}

          />

          <StatWithTooltip
            label="Offensive Zone Starts"
            value={(d.offensiveZoneStartPct * 100).toFixed(1) + "%"}
            tooltip="High OZ starts mean the coach trusts the player in scoring situations."
            textColor={t}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Possession Metrics</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          <StatWithTooltip
            label="SAT% (Corsi%)"
            value={(d.satPct * 100).toFixed(1) + "%"}
            tooltip="Share of total shot attempts while on ice. Above 50% means outshooting opponents consistently."
            textColor={t}
          />

          <StatWithTooltip
            label="USAT% (Fenwick%)"
            value={(d.usatPct * 100).toFixed(1) + "%"}
            tooltip="Unblocked shot attempt percentage — cleaner version of SAT%. Removes blocked shots."
            textColor={t}
          />

          <StatWithTooltip
            label="On-Ice Shooting%"
            value={(d.onIceShootingPct * 100).toFixed(1) + "%"}
            tooltip="Team shooting percentage when this player is on the ice."
            textColor={t}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Individual Creation (per 60)</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <StatWithTooltip
            label="iSAT/60"
            value={d.individualSatForPer60.toFixed(2)}
            tooltip="Individual shot attempts generated per 60 minutes of play."
            textColor={t}
          />
          <StatWithTooltip
            label="iSF/60"
            value={d.individualShotsForPer60.toFixed(2)}
            tooltip="Individual shots on goal per 60 minutes."
            textColor={t}
          />
        </div>
      </div>
    </div>
  );
}
