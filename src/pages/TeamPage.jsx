import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RosterCard from "../components/RosterCard";
import teamColors from "../data/teamColors";
import GoalsBarChart from "../components/charts/GoalsBarChart";
import HomeRoadChart from "../components/charts/HomeRoadChart";
import WinTypesDonut from "../components/charts/WinTypesDonut";
import FaceoffPercentagesByZone from "../components/charts/FaceoffWinByZoneChart";
import GoalsByPeriodChart from "../components/charts/GoalsByPeriodChart";
import ShootingTypeandGoalRadarChart from "../components/charts/ShootingTypeandGoalRadarChart";
import Calendar from "../components/Calendar";
import GoalDistributionRadarChart from "../components/charts/GoalDistributionRadarChart";
import ShootingPercentageRadarChart from "../components/charts/ShootingPercentageRadarChart";
import { transformShotTypeData } from "../utils/helper";
import BackButton from "../components/BackButton";
import BackToTop from "../components/BackToTop";
import { usePageTransition } from "../transitions/usePageTransition";


export default function TeamPage() {
  const { abbr } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faceoffData, setFaceoffData] = useState(null);
  const [goalsByPeriodData, setGoalsByPeriodData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [games, setGames] = useState([]);
  const { hideTransition } = usePageTransition();





  useEffect(() => {
    console.log("Mounted PlayerPage");
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
        conference: team.conferenceName,
        division: team.divisionName,

        wins: team.wins,
        losses: team.losses,
        ot_losses: team.otLosses,
        games_played: team.gamesPlayed,
        points: team.points,
        point_pctg: team.pointPctg,
        win_pctg: team.winPctg,
        clinch: team.clinchIndicator || "",

        goals_for: team.goalFor,
        goals_against: team.goalAgainst,
        goal_diff: team.goalDifferential,

        streak_type: team.streakCode || "",
        streak_length: team.streakCount || 0,

        regulation_wins: team.regulationWins,
        reg_ot_wins: (team.regulationPlusOtWins || 0) - (team.regulationWins || 0),
        shootout_wins: team.shootoutWins,
        shootout_losses: team.shootoutLosses,

        home_games_played: team.homeGamesPlayed,
        home_wins: team.homeWins,
        home_losses: team.homeLosses,
        home_ot_losses: team.homeOtLosses,
        home_points: team.homePoints,
        home_goals_for: team.homeGoalsFor,
        home_goals_against: team.homeGoalsAgainst,
        home_goal_diff: team.homeGoalDifferential,

        road_games_played: team.roadGamesPlayed,
        road_wins: team.roadWins,
        road_losses: team.roadLosses,
        road_ot_losses: team.roadOtLosses,
        road_points: team.roadPoints,
        road_goals_for: team.roadGoalsFor,
        road_goals_against: team.roadGoalsAgainst,
        road_goal_diff: team.roadGoalDifferential,

        l10_wins: team.l10Wins,
        l10_losses: team.l10Losses,
        l10_ot_losses: team.l10OtLosses,
        l10_points: team.l10Points,
        l10_goals_for: team.l10GoalsFor,
        l10_goals_against: team.l10GoalsAgainst,
        l10_goal_diff: team.l10GoalDifferential,
      });

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

        const faceoffRes = await fetch(`http://localhost:5000/api/stats/${abbr}/faceoffpercentages`);
        const faceoffData = await faceoffRes.json();
        const faceoffMapped = (faceoffData.data || []).map((p) => ([
          { name: "Overall", value: p.faceoffWinPct },
          { name: "Even Strength", value: p.evFaceoffPct },
          { name: "Power Play", value: p.ppFaceoffPct },
          { name: "Shorthanded", value: p.shFaceoffPct },
          { name: "Defensive Zone", value: p.defensiveZoneFaceoffPct },
          { name: "Neutral Zone", value: p.neutralZoneFaceoffPct },
          { name: "Offensive Zone", value: p.offensiveZoneFaceoffPct },
          ])).flat(); 
        
          const goalsByPeriodRes = await fetch(`http://localhost:5000/api/stats/${abbr}/goalsbyperiod`);
          const goalsByPeriodJson = await goalsByPeriodRes.json();
          if (goalsByPeriodJson.data && goalsByPeriodJson.data.length > 0) {
            const p = goalsByPeriodJson.data[0];

            const goalsByPeriodChartData = [
            { period: "#1st", GoalsFor: p.period1GoalsFor, GoalsAgainst: p.period1GoalsAgainst },
            { period: "#2nd", GoalsFor: p.period2GoalsFor, GoalsAgainst: p.period2GoalsAgainst },
            { period: "#3rd", GoalsFor: p.period3GoalsFor, GoalsAgainst: p.period3GoalsAgainst },
            { period: "OT", GoalsFor: p.periodOtGoalsFor, GoalsAgainst: p.periodOtGoalsAgainst },
            ];

            setGoalsByPeriodData(goalsByPeriodChartData)

        
          }

        const radarRes = await fetch(`http://localhost:5000/api/stats/${abbr}/shottype`);
        const radarJson = await radarRes.json();
        const radarRaw = radarJson.data[0];

        const shotTypeStats = [
          { key: "Wrap Around", goals: radarRaw.goalsWrapAround, pct: radarRaw.shootingPctWrapAround },
          { key: "Slap", goals: radarRaw.goalsSlap, pct: radarRaw.shootingPctSlap },
          { key: "Snap", goals: radarRaw.goalsSnap, pct: radarRaw.shootingPctSnap },
          { key:"Backhand", goals: radarRaw.goalsBackhand, pct:radarRaw.shootingPctBackhand},
          { key: "Deflected", goals: radarRaw.goalsDeflected, pct: radarRaw.shootingPctDeflected },         
          { key: "Wrist", goals: radarRaw.goalsWrist, pct: radarRaw.shootingPctWrist },
          { key: "Tip-In", goals: radarRaw.goalsTipIn, pct: radarRaw.shootingPctTipIn },

        ]


        const totalGoals = shotTypeStats.reduce((sum,s) => sum + s.goals,0);

        const normalizeShotTypePctandGoals = shotTypeStats.map(s =>({
          name:s.key,
          goals: totalGoals > 0 ? (s.goals/totalGoals) *100 : 0,
          pct: s.pct * 100
        }));

        const scheduleRes = await fetch(`http://localhost:5000/api/schedule/${abbr}`);
        const scheduleJson = await scheduleRes.json();

        setGames(scheduleJson.games)



        setRadarData(normalizeShotTypePctandGoals)
        setFaceoffData(faceoffMapped);
        setRoster(rosterMapped);
        setLoading(false);
        hideTransition();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }

      
    }

    fetchTeam();
    return () => {
    console.log("Unmounted TeamPage");
  };
  }, [abbr]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!teamData) return <p className="p-6">Team not found.</p>;
  if (!faceoffData) return <p className="p-6">Faceoff Stats N/A.</p>;


  const defaultColor = "#1d1d1d"; // fallback
  const color = teamColors[abbr]?.primary || defaultColor;
  const textColor = teamColors[abbr]?.secondary ||defaultColor;


 


const goalsData = [
  {
    name: "Home",
    For: teamData.home_goals_for || 0,
    Against: teamData.home_goals_against || 0,
    Diff: teamData.home_goal_diff || 0,
  },
  {
    name: "Road",
    For: teamData.road_goals_for || 0,
    Against: teamData.road_goals_against || 0,
    Diff: teamData.road_goal_diff || 0,
  },
];

const resultsData = [
  {
    name: "Home",
    Wins: teamData.home_wins || 0,
    OT: teamData.home_ot_losses || 0,
    Losses: teamData.home_losses || 0,
  },
  {
    name: "Road",
    Wins: teamData.road_wins || 0,
    OT: teamData.road_ot_losses || 0,
    Losses: teamData.road_losses || 0,
  },
];

const winTypesData = teamData
  ? [
      { name: "Regulation", value: teamData.regulation_wins || 0 },
      { name: "OT", value: teamData.reg_ot_wins || 0 },
      { name: "Shootout", value: teamData.shootout_wins || 0 },
    ]
  : [];

 



  return (

    
  <div className="min-h-screen bg-white relative" style={{paddingLeft:"10px"}}>
    <BackButton
          transitionData={{
            name: 'NHL Standings',
            image: null,
            primaryColor: '#1a1a1a',
            textColor: "#ffffff"
          }}
          buttonTextColor={textColor}
        />
    <BackToTop primaryColor={color} textColor={textColor} />

  <div
    className="absolute left-0 top-0 h-full"
    style={{
      width: "10px", 
      backgroundColor: color, 
    }}
  />

  <div
    className="w-full flex items-center justify-center py-12 px-6"
    style={{ backgroundColor: color }}
  >
    {teamData.logo && (
      <div className="flex-shrink-0 flex justify-center">
        <img
          src={teamData.logo}
          alt={teamData.team_name}
          style={{
            width: "clamp(120px, 20vw, 30vw)", 
            height: "auto",                      
          }}
        />
      </div>
    )}

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

<section className="p-6 mb-8">
  <h2 className="text-2xl font-semibold mb-4">Roster</h2>

  {roster.filter(p => ["L", "C", "R"].includes(p.positionCode)).length > 0 && (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Forwards</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roster
          .filter(p => ["L", "C", "R"].includes(p.positionCode))
          .map(player => <RosterCard key={player.player_id} player={player} />)}
      </div>
    </div>
  )}


  {roster.filter(p => p.positionCode === "D").length > 0 && (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Defensemen</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roster
          .filter(p => p.positionCode === "D")
          .map(player => (
            <RosterCard key={player.player_id} player={player} />
          ))}
      </div>
    </div>
  )}

  {roster.filter(p => p.positionCode === "G").length > 0 && (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Goalies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roster
          .filter(p => p.positionCode === "G")
          .map(player => (
            <RosterCard key={player.player_id} player={player} />
          ))}
      </div>
    </div>
  )}
</section>

<section className="p-6 mb-8">
  <h2 className="text-2xl font-semibold mb-6">Team Stats</h2>

  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Wins</span>
      <span className="text-2xl font-bold">{teamData.wins}</span>
    </div>
    
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Losses</span>
      <span className="text-2xl font-bold">{teamData.losses}</span>
    </div>
    
        <div className="p-4 bg-white rounded-2xl shadow relative w-full h-32 flex flex-col items-center">
      <span className="text-sm text-gray-500 font-semibold mb-2">Last 10 Games</span>

   
      {teamData.streak_type && teamData.streak_length > 0 && (
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white font-semibold text-sm ${
            teamData.streak_type.startsWith("W")
              ? "bg-green-600"
              : teamData.streak_type.startsWith("L")
              ? "bg-red-600"
              : "bg-gray-500"
          }`}
        >
          {teamData.streak_type}{teamData.streak_length}
        </span>
      )}


      <div className="text-center">
        <span className="text-2xl font-bold">
          {teamData.l10_wins || 0}-{teamData.l10_losses || 0}-{teamData.l10_ot_losses || 0}
        </span>
        <span className="text-xs text-gray-500 block mt-1">W - L - OT</span>
      </div>
    </div>
    
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Points</span>
      <span className="text-2xl font-bold">{teamData.points}</span>
    </div>

    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center ">
      <span className="text-sm text-gray-500">Goals For</span>
      <span className="text-2xl font-bold">{teamData.goals_for}</span>
    </div>

    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Goals Against</span>
      <span className="text-2xl font-bold">{teamData.goals_against}</span>
    </div>

  
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Goal Diff</span>
      <span className={`text-2xl font-bold ${teamData.goal_diff >= 0 ? "text-green-600" : "text-red-600"}`}>
        {teamData.goal_diff >= 0 ? `+${teamData.goal_diff}` : teamData.goal_diff}
      </span>
    </div>
   
    <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
      <span className="text-sm text-gray-500">Faceoff Win %</span>
      <span className="text-2xl font-bold">{(faceoffData[0]?.value  * 100).toFixed(1)} %</span>
    </div>
    
    



  </div>


  
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4 text-center">Home vs Road Goals</h3>
    <div className="w-full max-w-md"> {/* constrains chart width */}
      <GoalsBarChart goalsData={goalsData} color={color} />
    </div>
  </div>

  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4 text-center">Home vs Road Results</h3>
    <div className="w-full max-w-md">
      <HomeRoadChart resultsData={resultsData} color={color} />
    </div>
  </div>

  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4 text-center">Win Breakdown</h3>
    <div className="w-full max-w-md h-72"> {/* matches other charts' max width */}
      <WinTypesDonut winTypesData={winTypesData} color={color} />
    </div>
  </div>

  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4 text-center">Faceoff Breakdown</h3>
    <div className="w-full max-w-md h-72"> {/* matches other charts' max width */}
      <FaceoffPercentagesByZone faceoffData={faceoffData} color={color} />
    </div>
  </div>

  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4 text-center">Goals By Period</h3>
    <div className="w-full max-w-md">
      <GoalsByPeriodChart goalsByPeriodData={goalsByPeriodData} color={color} />
    </div>
  </div>
   
  <div className="p-4 bg-white rounded-2xl shadow flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-6 text-center"> Shooting Analysis</h3>
    <div className="w-full max-w-md">
      <ShootingTypeandGoalRadarChart radarData={radarData} color={color} />
    </div>
  </div>

 

</section>
      
<div className="p-4 sm:p-6 max-w-7xl mx-auto">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">{abbr} Schedule</h1>
  <Calendar games={games} abbr={abbr} color = {color} textColor = {textColor} />
</div>


</section>
</div>

  );
}
