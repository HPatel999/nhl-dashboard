import StatWithTooltip from "../ToolTip";

export default function PossessionPercentages({ data,primaryColor,textColor }) {
  if (!data) return null;

  const d = data;
  const t = textColor || "text-black";


  const states = [
    { label: "Ahead", sat: d.satPercentageAhead, usat: d.usatPercentageAhead },
    { label: "Tied", sat: d.satPercentageTied, usat: d.usatPercentageTied },
    { label: "Close", sat: d.satPercentageClose, usat: d.usatPrecentageClose },
    { label: "Behind", sat: d.satPercentageBehind, usat: d.usatPercentageBehind },
  ];

  return (
    <div className="p-8 rounded-2xl shadow-md space-y-10" style={{ background: primaryColor, color: textColor }}>
      <h2 className="text-2xl font-bold">Advanced Possession Percentages</h2>

      <div>
        <h3 className="text-lg font-semibold mb-4">Game State Possession</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {states.map((s) => (
            <div key={s.label} className="space-y-3">

              <StatWithTooltip
                label={`SAT% — ${s.label}`}
                value={(s.sat * 100).toFixed(1) + "%"}
                tooltip={`Shot Attempt Share (Corsi%) when the team is ${s.label.toLowerCase()}. Indicates how the player drives play in this situation.`}
                textColor={t}
              />

              <StatWithTooltip
                label={`USAT% — ${s.label}`}
                value={(s.usat * 100).toFixed(1) + "%"}
                tooltip={`Unblocked Shot Attempt Share (Fenwick%) when ${s.label.toLowerCase()}. More stable indicator of puck control.`}
                textColor={t}
              />

            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 space-y-6 pt-6 border-t">

        <StatWithTooltip
          label="SAT% — Overall"
          value={(d.satPercentage * 100).toFixed(1) + "%"}
          tooltip="Overall possession share (Corsi%). Most common shot-share metric."
          textColor={t}
        />

        <StatWithTooltip
          label="USAT% — Overall"
          value={(d.usatPercentage * 100).toFixed(1) + "%"}
          tooltip="Unblocked shot attempt share (Fenwick%). Stronger signal of true puck possession."
          textColor={t}
        />

        <StatWithTooltip
          label="SAT Relative"
          value={(d.satRelative * 100).toFixed(1) + "%"}
          tooltip="Team possession with vs without the player. Positive = direct improvement to on-ice shot share."
          textColor={t}
        />

        <StatWithTooltip
          label="Zone Start % (5v5)"
          value={(d.zoneStartPct5v5 * 100).toFixed(1) + "%"}
          tooltip="Percentage of 5v5 shifts that begin in the offensive zone. Higher = sheltered or offense-focused deployment."
          textColor={t}
        />

        <StatWithTooltip
          label="PDO"
          value={d.skaterShootingPlusSavePct5v5.toFixed(3)}
          tooltip="On-ice shooting% + save%. High = luck or elite finishing. Low = bad luck or poor finishing environment."
          textColor={t}
        />

        <StatWithTooltip
          label="On-Ice Save%"
          value={(d.skaterSavePct5v5 * 100).toFixed(1) + "%"}
          tooltip="Goalie save percentage behind the player at 5v5 — influential on plus/minus and defensive perception."
          textColor={t}
        />
      </div>
    </div>
  );
}
