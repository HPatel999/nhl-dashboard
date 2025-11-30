import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import teamColors from "../data/teamColors";
import StatsTabs from "../components/StatsTabs";
import SeasonTotals from "../components/SeasonTotals";
import SkaterPerformanceChart from "../components/charts/SkaterPerformanceChart";
import GoaliePerformanceChart from "../components/charts/GoaliePerformanceChart";
import SummaryStats from "../components/SummaryStats";
import FaceoffRadarChart from "../components/charts/FaceoffRadarChart";
import ShootingTypeandGoalRadarChart from "../components/charts/ShootingTypeandGoalRadarChart";
import GoalDistributionRadarChart from "../components/charts/GoalDistributionRadarChart";
import ShootingPercentageRadarChart from "../components/charts/ShootingPercentageRadarChart";
import { transformShotTypeData,transformSpecialTeamsData } from "../utils/helper";
import SpecialTeamsStats from "../components/SpecialTeamsStats";
import BackButton from "../components/BackButton";
import BackToTop from "../components/BackToTop";
import PuckPossessionStats from "../components/statsTooltip/PuckPossessionStats";
import PossessionPercentages from "../components/statsTooltip/PossessionPercentages";
import { usePageTransition } from "../transitions/usePageTransition";
import ScoringRateStats from "../components/statsTooltip/ScoringRateStats";
import SavesByStrength from "../components/goalieStats/SavesByStrength";
import DaysRestStats from "../components/goalieStats/DaysRestStats";
import StartedVsRelievedStats from "../components/goalieStats/StartedVsRelievedStats";
import ShootoutStats from "../components/goalieStats/ShootoutStats";

export default function PlayerPage() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [faceoffData, setFaceoffData] = useState(null);
  const [shotTypeData, setShotTypeData] = useState(null);
  const [specialTeams, setSpecialTeams] = useState({ pp: null, pk: null });
  const [deploymentData,setDeploymentData] = useState(null);
  const [v5Data, set5V5data] = useState(null);
  const [satData,setSatData] = useState(null);
  const [svByStrength, setSvByStrength] = useState(null);
  const [daysRestData,setDaysRestData] = useState(null);
  const [startVsRelievedData, setStartVsRelieved] = useState(null);
  const [shootoutData, setShootOutData] = useState(null);
  const { hideTransition } = usePageTransition();






  useEffect(() => {
     console.log("Mounted PlayerPage");

  async function fetchPlayer() {
    try {
      const res = await fetch(`/api/player-landing?id=${id}`);
      if (!res.ok) throw new Error("Failed to fetch landing");
      const data = await res.json();
      console.log("Landing data:", data);
      setPlayerData(data);

      const type = data.position === "G" ? "goalie" : "skater";
      console.log("Type", type);
      const seasonId = 20242025;

      const summaryRes = await fetch(`/api/player-stats?type=${type}&endpoint=summary&id=${id}&seasonId=${seasonId}`);
      if (!summaryRes.ok) {
        const text = await summaryRes.text();
        throw new Error(`Summary fetch failed: ${summaryRes.status} - ${text}`);
      }
      const summaryJson = await summaryRes.json();
      console.log("Summary data:", summaryJson);
      setSummaryData(summaryJson);

      if (type !== "goalie") {
      const ftaRes = await fetch(`/api/player-stats?type=${type}&endpoint=faceoffpercentages&id=${id}&seasonId=20242025`);
      if (ftaRes.ok) {
        const ftaJson = await ftaRes.json();
        console.log("Faceoff data:", ftaJson);
        if (ftaJson.data && ftaJson.data.length > 0) {
          setFaceoffData(ftaJson.data[0]);
        }
      }
      const stres = await fetch(`/api/player-stats?type=${type}&endpoint=shottype&id=${id}&seasonId=20242025`);
      if (stres.ok) {
        const stjson = await stres.json();
        if (stjson.data && stjson.data.length > 0) {
          console.log("Shot Type data:", stjson);
          const transformed = transformShotTypeData(stjson.data[0]);
          setShotTypeData(transformed);
        }
      }
      const ppRes = await fetch(`/api/player-stats?type=${type}&endpoint=powerplay&id=${id}&seasonId=20242025`);
      const pkRes = await fetch(`/api/player-stats?type=${type}&endpoint=penaltykill&id=${id}&seasonId=20242025`);


      if (ppRes.ok && pkRes.ok) {
          const ppJson = await ppRes.json();
          const pkJson = await pkRes.json();
          const ppData = ppJson?.data?.[0];
          const pkData = pkJson?.data?.[0];
          console.log("PP:", ppJson);
          console.log("PK:", pkJson);
          const transformed = transformSpecialTeamsData(ppData, pkData);
          setSpecialTeams(transformed);
        }

      const deploymentRes = await fetch(`/api/player-stats?type=${type}&endpoint=puckPossessions&id=${id}&seasonId=20242025`);
      if (deploymentRes.ok){
        const deploymentJson = await deploymentRes.json();
        const deploymentData = deploymentJson?.data?.[0];
        console.log("deployment:",deploymentData);
        setDeploymentData(deploymentData);
      }

      const v5Res = await fetch(`/api/player-stats?type=${type}&endpoint=scoringRates&id=${id}&seasonId=20242025`);
      if (v5Res.ok){
        const v5Json = await v5Res.json();
        const v5Data = v5Json?.data?.[0];
        console.log("5v5 Data:", v5Data);
        set5V5data(v5Data);
      }
      const satRes = await fetch(`/api/player-stats?type=${type}&endpoint=percentages&id=${id}&seasonId=20242025`);
      if (satRes.ok){
        const satJson = await satRes.json();
        const satData = satJson?.data?.[0];
        console.log("SAT/USAT Data:", satData);
        setSatData(satData);
      }

    }

      if (type == "goalie"){
        const svBySRes = await fetch(`/api/player-stats?type=${type}&endpoint=savesByStrength&id=${id}&seasonId=20242025`);
        if (svBySRes.ok){
          const svByResJson = await svBySRes.json();
          const svByStrength  =svByResJson?.data?.[0];
          console.log("Saves By Strength:", svByStrength);
          setSvByStrength(svByStrength);
        }

        const daysres = await fetch(`/api/player-stats?type=${type}&endpoint=daysrest&id=${id}&seasonId=20242025`);
        if (daysres.ok){
          const daysResJson = await daysres.json();
          const daysRestToSet = daysResJson?.data?.[0];
          console.log("Days Rest:", daysRestToSet);
          setDaysRestData(daysRestToSet);
        }

        const startvsRres = await fetch(`/api/player-stats?type=${type}&endpoint=startedVsRelieved&id=${id}&seasonId=20242025`);
        if (startvsRres.ok){
          const startVsRelJson = await startvsRres.json();
          const startVsRelToSet = startVsRelJson?.data?.[0];
          console.log("Started vs Relieved:", startVsRelToSet);
          setStartVsRelieved(startVsRelToSet);
        }

        const shootoutRes = await fetch(`/api/player-stats?type=${type}&endpoint=shootout&id=${id}&seasonId=20242025`);
        if (shootoutRes.ok){
          const shootoutJson = await shootoutRes.json();
          const shootoutToSet = shootoutJson?.data?.[0];
          console.log("Shootout Data:",  shootoutToSet);
          setShootOutData(shootoutToSet);
        }

      }

    } catch (err) {
      console.error("Error fetching player or summary:", err);
    }
    finally {
    hideTransition();
  }
  }

  if (id) fetchPlayer();

  return () => console.log("Unmounted PlayerPage");
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
    teamLogo,
  } = playerData;

  const isGoalie = position === "G";
  const isCenter = position === "C";

  let summaryStats = {};
  if (summaryData && summaryData.data && summaryData.data.length > 0){
  const stats = summaryData.data[0]; 
  if (isGoalie) {
    summaryStats = {
      seasonId: stats.seasonId,
      gamesPlayed: stats.gamesPlayed,
      gamesStarted: stats.gamesStarted,
      wins: stats.wins,
      losses: stats.losses,
      otLosses: stats.otLosses,
      savePct: stats.savePct,
      gaa: stats.goalsAgainstAverage,
      shutouts: stats.shutouts,
      saves: stats.saves,
      shotsAgainst: stats.shotsAgainst,
    };
  } else {
    summaryStats = {
      seasonId: stats.seasonId,
      gamesPlayed: stats.gamesPlayed,
      goals: stats.goals,
      assists: stats.assists,
      points: stats.points,
      plusMinus: stats.plusMinus,
      shots: stats.shots,
      shootingPct: stats.shootingPct,
      ppGoals: stats.ppGoals,
      ppPoints: stats.ppPoints,
      shGoals: stats.shGoals,
      shPoints: stats.shPoints,
      pointsPerGame: stats.pointsPerGame,
      gameWinningGoals: stats.gameWinningGoals,
      otGoals: stats.otGoals,
      faceoffWinPct: isCenter ? stats.faceoffWinPct : null,
      };
    }
  }


  const defaultColor = "#1d1d1d"; 
  const color = teamColors[currentTeamAbbrev]?.primary || defaultColor;
  const textColor = teamColors[currentTeamAbbrev]?.secondary || "#fff";
  console.log("Team:", currentTeamAbbrev, "Colors:", teamColors[currentTeamAbbrev]);

  return (
    <div className="min-h-screen bg-white relative">
      <BackButton
        transitionData={{
          name: playerData.fullTeamName.default,
          image: playerData.teamLogo,
          primaryColor: color,
          textColor: textColor
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
      className="w-full flex flex-col md:flex-row items-center md:items-start justify-center py-12 px-6 gap-8"
      style={{ backgroundColor: color }}
    >
  
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

    <div className="text-center md:text-left space-y-3" style={{ color: textColor }}>
      <h1 className="text-3xl md:text-4xl font-bold">
        {firstName.default} {lastName.default}
      </h1>
      <p className="text-lg md:text-xl">
        #{sweaterNumber} • {position} • {fullTeamName.default}
      </p>

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

    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Stats</h2>
        <StatsTabs featuredStats={featuredStats} isGoalie={isGoalie} color={color} />
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Summary Stats</h2>
        {summaryStats && (
          <SummaryStats summaryStats={summaryStats} isGoalie={isGoalie} />)}
      </section>

      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Season Totals</h2>
        <SeasonTotals seasonTotals={seasonTotals} color={color} isGoalie={isGoalie} textColor={textColor} />
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {isGoalie ? "Workload vs Efficiency" : "Points by NHL Season"}
        </h2>

        {isGoalie ? (
           <GoaliePerformanceChart seasonTotals={seasonTotals} color={color} textColor={textColor}/>
        ) : (
          <SkaterPerformanceChart seasonTotals={seasonTotals} color={color} textColor={textColor}/>
        )}
      </section>

      {!isGoalie && isCenter && faceoffData && (
        <section className="mt-12">
          <FaceoffRadarChart faceoffData={faceoffData} color={color} />
        </section>
      )}

      {!isGoalie && shotTypeData && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Shooting Type Analysis</h2>
          <GoalDistributionRadarChart radarData={shotTypeData} color={color} />
          <ShootingPercentageRadarChart radarData={shotTypeData} color={color} />
        </section>
      )}

       {!isGoalie &&
    specialTeams &&
    (specialTeams.pp || specialTeams.pk) && (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Special Teams Analysis</h2>
        <SpecialTeamsStats
          data={specialTeams}
          primaryColor={color}
          textColor={textColor}
        />
      </section>
    )}

    {!isGoalie && deploymentData && v5Data &&(
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <PuckPossessionStats data={deploymentData}  primaryColor={color} textColor={textColor}/>
          <ScoringRateStats data={v5Data}  primaryColor={color} textColor={textColor}/>
         <PossessionPercentages data={satData} primaryColor={color} textColor={textColor}/>
        </section>
      )}
    
    {isGoalie && svByStrength && daysRestData && startVsRelievedData && shootoutData &&(
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <SavesByStrength data={svByStrength}  primaryColor={color} textColor={textColor}/>
          <DaysRestStats data = {daysRestData} primaryColor={color} textColor={textColor}/>
          <StartedVsRelievedStats data = {startVsRelievedData} primaryColor={color} textColor={textColor}/>
          <ShootoutStats data = {shootoutData} primaryColor={color} textColor={textColor} />
        </section>

    ) }

    </div>
  </div>
  );
}


