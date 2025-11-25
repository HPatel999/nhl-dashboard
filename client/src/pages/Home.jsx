import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import teamColors from "../data/teamColors";
import { usePageTransition } from "../transitions/usePageTransition";



function TeamCard({ team, isHovered, isOtherHovered, onHover, onLeave, onClick }) {
  const colors = teamColors[team.teamAbbrev.default] || {
    primary: "#222222",
    secondary: "#FFFFFF",
  };

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`
        relative cursor-pointer p-6 flex flex-col items-center justify-center rounded-3xl
        transition-all duration-300 ease-in-out text-white border border-white/10 backdrop-blur-md
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
          isHovered ? "text-white" : "text-gray-400"
        }`}
      >
        {team.points} pts
      </p>
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
        const res = await fetch("/api/standings");
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

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        backgroundAttachment: "fixed",
      }}
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

      <section className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-24 px-6 relative z-10">
        {teams.map((team, i) => (
          <TeamCard
            key={team.teamAbbrev.default}
            team={team}
            isHovered={hoveredIdx === i}
            isOtherHovered={hoveredIdx !== null && hoveredIdx !== i}
            onHover={() => setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() =>  handleTeamClick(team)}
          />
        ))}
      </section>
    </div>
  );
}
