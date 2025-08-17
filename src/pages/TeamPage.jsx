import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RosterCard from "../components/RosterCard";
import Last10GamesChart from "../components/charts/Last10GamesChart";
import PowerPlayChart from "../components/charts/PowerPlayChart";
import teamColors from "../data/teamColors";

export default function TeamPage() {
  const { abbr } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        // Fetch standings
        const standingsRes = await fetch("http://localhost:5000/api/standings");
        const standingsData = await standingsRes.json();
        const team = standingsData.standings.find(
          (t) => t.teamAbbrev.default === abbr
        );

        if (!team) throw new Error("Team not found");

        setTeamData({
          team_name: team.teamName.default,
          team_abbr: team.teamAbbrev.default,
          logo: team.teamLogo,
          wins: team.wins,
          losses: team.losses,
          points: team.points,
          l10_wins: team.l10Wins,
          l10_losses: team.l10Losses,
          l10_ot_losses: team.l10OtLosses,
          goals_for: team.goalFor,
          goals_against: team.goalAgainst,
          conference : team.conferenceName,
          division: team.divisionName,
        });

        // Fetch roster
        const rosterRes = await fetch(`http://localhost:5000/api/roster/${abbr}`);
        const rosterData = await rosterRes.json();

        const rosterMapped = [
          ...(rosterData.forwards || []),
          ...(rosterData.defensemen || []),
          ...(rosterData.goalies || []),
        ].map((p) => ({
          player_id: p.id,
          player: `${p.firstName.default} ${p.lastName.default}`,
          positionCode: p.positionCode,
          sweaterNumber: p.sweaterNumber,
          team_abbr: abbr,
          headshot: p.headshot,
        }));

        setRoster(rosterMapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchTeam();
  }, [abbr]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!teamData) return <p className="p-6">Team not found.</p>;

  const defaultColor = "#1d1d1d"; // fallback
  const color = teamColors[abbr]?.primary || defaultColor;
  const textColor = teamColors[abbr]?.secondary ||defaultColor;


  const last10Data = [
    { name: "Wins", value: teamData.l10_wins || 0 },
    { name: "Losses", value: teamData.l10_losses || 0 },
    { name: "OT Losses", value: teamData.l10_ot_losses || 0 },
  ];

  const ppData = [
    { name: "PP%", value: teamData.power_play_pct || 0 },
    { name: "PP Goals", value: teamData.power_play_goals || 0 },
  ];

  return (
    <div className="min-h-screen bg-white relative" style={{paddingLeft:"10px"}}>
  {/* Vertical color stripe */}
  <div
    className="absolute left-0 top-0 h-full"
    style={{
      width: "10px", // thickness of the stripe
      backgroundColor: color, // use the team's primary color
    }}
  />

  {/* Hero Banner */}
  <div
    className="w-full flex items-center justify-center py-12 px-6"
    style={{ backgroundColor: color }}
  >
    {/* Logo */}
    {teamData.logo && (
      <div className="flex-shrink-0 flex justify-center">
        <img
          src={teamData.logo}
          alt={teamData.team_name}
          style={{
            width: "clamp(120px, 20vw, 30vw)",  // min 120px, grows with viewport, max 30% of screen
            height: "auto",                       // keeps aspect ratio
          }}
        />
      </div>
    )}

    {/* Team Info */}
    <div className="flex-1 px-6 flex flex-col justify-center items-center text-center">
      <h1
        className="font-bold"
        style={{
          color: textColor,
          fontSize: "clamp(1rem, 5vw, 20rem)",
          lineHeight: 1.1,
          wordBreak: "break-word",
        }}
      >
        {teamData.team_name}
      </h1>

      <div
        className="font-medium mt-3 text-center"
        style={{
          color: textColor,
          fontSize: "clamp(1rem, 2vw, 2rem)",
        }}
      >
        {teamData.conference} Conference | {teamData.division} Division | Points:{" "}
        {teamData.points} | Wins: {teamData.wins}
      </div>
    </div>
  </div>

  {/* Roster */}
  <section className="p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4">Roster</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {roster.map((player) => (
        <RosterCard key={player.player_id} player={player} />
      ))}
    </div>
  </section>

  {/* Stats & Charts */}
  <section className="p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4">Team Stats</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 border rounded">Wins: {teamData.wins}</div>
      <div className="p-4 border rounded">Losses: {teamData.losses}</div>
      <div className="p-4 border rounded">Points: {teamData.points}</div>
      <div className="p-4 border rounded">Goals For: {teamData.goals_for}</div>
      <div className="p-4 border rounded">Goals Against: {teamData.goals_against}</div>
      
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Last 10 Games</h3>
      <Last10GamesChart data={last10Data} color={color} />
    </div>

    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Power Play Stats</h3>
      <PowerPlayChart data={ppData} color={color} />
    </div>
  </section>
</div>

  );
}
