import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import teamColors from "../data/teamColors";
import StatsTabs from "../components/StatsTabs";
import SeasonTotals from "../components/SeasonTotals";

export default function PlayerPage() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch(`/api/player/${id}/landing`);
        const data = await res.json();
        setPlayerData(data);
      } catch (err) {
        console.error("Error fetching player landing:", err);
      }
    }
    fetchPlayer();
  }, [id]);

  if (!playerData) {
    return <div className="text-center mt-10">Loading player data...</div>;
  }

  const {
    currentTeamAbbrev,
    firstName,
    lastName,
    sweaterNumber,
    position,
    headshot,
    fullTeamName,
    birthDate,
    birthCity,
    birthCountry,
    heightInCentimeters,
    weightInKilograms,
    birthStateProvince,
    shootsCatches,
    draftDetails,
    careerTotals,
    featuredStats,
    last5Games,
    seasonTotals,
  } = playerData;

  const isGoalie = position === "G";
  console.log(position)

  const defaultColor = "#1d1d1d"; // fallback
  const color = teamColors[currentTeamAbbrev]?.primary || defaultColor;
  const textColor = teamColors[currentTeamAbbrev]?.secondary || "#fff";

  return (
    <div className="min-h-screen bg-white relative">
      {/* Vertical color stripe */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{
          width: "10px",
          backgroundColor: color,
        }}
      />
    {/* Hero Banner */}
    <div
      className="w-full flex flex-col md:flex-row items-center md:items-start justify-center py-12 px-6 gap-8"
      style={{ backgroundColor: color }}
    >
  
    {/* Headshot */}
    {headshot && (
      <div className="flex-shrink-0 flex justify-center">
        <img
          src={headshot}
          alt={`${firstName.default} ${lastName.default}`}
          style={{
            width: "clamp(140px, 18vw, 220px)",
            height: "auto",
            borderRadius: "50%",
            border: "4px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    )}

    {/* Player Info + Bio */}
    <div className="text-center md:text-left space-y-3" style={{ color: textColor }}>
      <h1 className="text-3xl md:text-4xl font-bold">
        {firstName.default} {lastName.default}
      </h1>
      <p className="text-lg md:text-xl">
        #{sweaterNumber} • {position} • {fullTeamName.default}
      </p>

    {/* Bio */}
    <div className="text-base md:text-lg space-y-1">
      <p>
        {heightInCentimeters} cm • {weightInKilograms} kg • Shoots {shootsCatches}
      </p>
      <p>
        Born {birthDate} • {birthCity?.default || ""}, {birthStateProvince?.default || ""}{" "}
        {birthCountry}
      </p>
      {draftDetails && (
        <p>
          Drafted {draftDetails.year} • Round {draftDetails.round} (#
          {draftDetails.overallPick} Overall) • {draftDetails.teamAbbrev}
        </p>
      )}
    </div>
  </div>
</div>

    {/* Content Section */}
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Stats</h2>
        <StatsTabs featuredStats={featuredStats} isGoalie={isGoalie} color={color} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Season Totals</h2>
        <SeasonTotals seasonTotals={seasonTotals} color={color} isGoalie={isGoalie} />
      </section>

    </div>
  </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value || "—"}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value ?? "—"}</p>
    </div>
  );
}
