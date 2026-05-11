import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import teamColors from "../data/teamColors";
import { usePageTransition } from "../transitions/usePageTransition";


function TeamCard({
  team,
  isHovered,
  isOtherHovered,
  onHover,
  onLeave,
  onClick,
}) {
  const colors = teamColors[team.teamAbbrev.default] || {
    primary: "#222222",
    secondary: "#FFFFFF",
  };

  const clinchMap = {
    x: "Playoffs",
    y: "Division",
    z: "Conference",
    p: "Presidents",
    e: "Eliminated"
  };

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`
        relative cursor-pointer p-6 flex flex-col items-center justify-center rounded-3xl
        transition-all duration-300 ease-in-out text-white border border-white/10 backdrop-blur-md
        min-h-[260px]
        ${
          isHovered
            ? "z-30 scale-105 shadow-2xl"
            : isOtherHovered
            ? "opacity-60 scale-95"
            : ""
        }
      `}
      style={{
        color: isHovered ? colors.secondary : "white",
        background: isHovered
          ? `${colors.primary}cc`
          : "rgba(255,255,255,0.05)",
      }}
    >
       <div className="absolute bottom-3 left-3 text-xs">
        <p
          className={`font-semibold ${
            isHovered 
          }`}
        >
          #{team.leagueSequence}
        </p>
      </div>

      <div className="absolute top-3 left-3 text-xs">
        <p
          className={`font-semibold ${
            isHovered 
          }`}
        >
          {team.conferenceName} #{team.conferenceSequence}
        </p>
      </div>

      <div className="absolute top-3 right-3 text-xs">
        <p
          className={`font-semibold ${
            isHovered 
          }`}
        >
          {team.divisionName} #{team.divisionSequence}
        </p>
      </div>

      <div
        className={`w-24 h-24 mb-4 transition-transform duration-300 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      >
        <img
          src={team.teamLogo}
          alt={team.teamName.default}
          className="w-full h-full object-contain"
        />
      </div>

      <p className="font-semibold text-center text-lg">
        {team.teamName.default}
      </p>

      <p
        className={`mt-1 text-sm ${
          isHovered 
        }`}
      >
        {team.points} pts
      </p>

     {team.clinchIndicator && (
      <p
        className={`
          absolute bottom-3 text-[10px] uppercase tracking-[0.25em]
          ${
            isHovered
          }
        `}
      >
        {clinchMap[team.clinchIndicator]}
      </p>
    )}
    </div>
  );
}

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showTransition, hideTransition } = usePageTransition();
  const [hoveredTeam, setHoveredTeam] = useState(null);


  const handleTeamClick = (team) => {
      const colors = teamColors[team.teamAbbrev.default];

      showTransition({
        name: team.teamName.default,
        image: team.teamLogo,
        primaryColor: colors.primary,
        textColor: colors.secondary,
      });

        navigate(`/team/${team.teamAbbrev.default}`);
      
    };

  useEffect(() => {
    async function fetchStandings() {
      try {
        const res = await fetch("http://localhost:5000/api/standings");
        if (!res.ok) throw new Error("Failed to fetch standings");
        const data = await res.json();
        setTeams(data?.standings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        hideTransition();
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="animate-pulse">Loading Standings...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <p>Error: {error}</p>
      </div>
    );
  }
const hoveredColors =
  hoveredTeam &&
  teamColors[hoveredTeam.teamAbbrev.default];

const backgroundStyle = hoveredColors
  ? {
      background: `
     linear-gradient(${hoveredColors.primary} 0%, #090808  100%)
      `,
      transition: "background 600ms ease",
    }
  : {
      background:
        "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      transition: "background 600ms ease",
    };
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0)_100%)] animate-[shimmer_8s_infinite_linear] pointer-events-none"></div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <section className="max-w-5xl mx-auto mb-12 text-center pt-14 relative z-10">
        <h1 className="text-5xl font-extrabold mb-4 flex items-center justify-center gap-2">
          <span role="img" aria-label="hockey">🏒</span>
          <span>
            NHL <span className="text-500">Dashboard</span>
          </span>
        </h1>
        <p className="text-gray-300">
          Browse all NHL teams. Click to view team stats and then player stats.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-24 px-6 relative z-10">
        {teams.map((team, i) => (
          <TeamCard
            key={team.teamAbbrev.default}
            team={team}
            isHovered={hoveredIdx === i}
            isOtherHovered={hoveredIdx !== null && hoveredIdx !== i}
            onHover={() => {
              setHoveredIdx(i);
              setHoveredTeam(team);
            }}
            onLeave={() => {
              setHoveredIdx(null);
              setHoveredTeam(null);
            }}
            onClick={() =>  handleTeamClick(team)}
          />
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-16 relative z-10">
      <div className="border border-white/10 bg-white/5 rounded-2xl p-4 backdrop-blur-md">
        <h2 className="text-sm font-semibold text-white mb-3 tracking-wide uppercase">
          Standings Legend
        </h2>

        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <span className="font-semibold text-white">Playoff</span> — Clinched Playoff Berth
          </div>

          <div>
            <span className="font-semibold text-white">Division</span> — Clinched Division
            <p className="text-gray-400 mt-1 text-xs leading-relaxed">
              Guarantees a top-3 playoff seed within the conference and
              home-ice advantage in the first round.
            </p>
          </div>

          <div>
            <span className="font-semibold text-white">Conference</span> — Clinched Conference
            <p className="text-gray-400 mt-1 text-xs leading-relaxed">
              Secures the top conference seed and home-ice advantage
              through the conference playoffs.
            </p>
          </div>

          <div>
            <span className="font-semibold text-white">President's</span> — Presidents' Trophy
            <p className="text-gray-400 mt-1 text-xs leading-relaxed">
              Awarded to the NHL team with the best regular-season record.
              Guarantees league-wide home-ice advantage throughout the playoffs.
            </p>
          </div>
        </div>
      </div>
  </section>

  <footer className="relative z-10 border-t border-white/10 mt-8">
    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
      <p>
        © 2026 NHL Dashboard. Built for educational and portfolio purposes.
      </p>

      <p>
        NHL data provided by the NHL public API.
      </p>
    </div>
</footer>
    </div>
  );
}
