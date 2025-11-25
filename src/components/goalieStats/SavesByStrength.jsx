import CircularGauge from "../CircularGauge";
export default function SavesByStrength({ data, primaryColor, textColor }) {
  if (!data) return null;
  const d = data;

  const strengths = [
    {
      label: "Even Strength",
      pct: d.evSavePct * 100,
      shots: d.evShotsAgainst,
      saves: d.evSaves,
    },
    {
      label: "Shorthanded",
      pct: d.ppSavePct * 100,
      shots: d.ppShotsAgainst,
      saves: d.ppSaves,
    },
    {
      label: "Power Play",
      pct: d.shSavePct * 100,
      shots: d.shShotsAgainst,
      saves: d.shSaves,
    },
  ];

  return (
    <div
      className="w-full rounded-2xl shadow-lg p-6"
      style={{ background: primaryColor, color: textColor }}
    >
      <h2 className="text-2xl font-bold mb-4">Saves by Strength</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strengths.map((s, i) => (
          <div
            key={i}
            className="rounded-xl bg-black/20 backdrop-blur-sm p-10 flex flex-col items-center text-center shadow-inner"
          >
            <CircularGauge
              pct={s.pct}
              label={s.label}
              primaryColor={primaryColor}
              textColor={textColor}
            />

            <div className="mt-4 w-full text-sm space-y-1">
              <div className="flex justify-between">
                <span className="opacity-80">Shots Against:</span>
                <span className="font-medium">{s.shots}</span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-80">Saves:</span>
                <span className="font-medium">{s.saves}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
