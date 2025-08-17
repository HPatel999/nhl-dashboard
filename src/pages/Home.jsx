import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import teamColors from "../data/teamColors";

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
        relative cursor-pointer p-6 flex flex-col items-center rounded-3xl
        transition-all duration-300 ease-in-out text-white
        border border-white/10 backdrop-blur-md
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
        className={`w-28 h-28 mb-4 transition-transform duration-300 ${
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
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <h1 className="animate-pulse">Loading Standings...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">🏒 NHL Dashboard</h1>
        <p className="text-gray-300">
          Browse all NHL teams. Click to view team stats and then player stats.
        </p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 overflow-hidden px-3 py-5">
        {teams.map((team, i) => (
          <TeamCard
            key={team.teamAbbrev.default}
            team={team}
            isHovered={hoveredIdx === i}
            isOtherHovered={hoveredIdx !== null && hoveredIdx !== i}
            onHover={() => setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => navigate(`/team/${team.teamAbbrev.default}`)}
          />
        ))}
      </section>
    </div>
  );
}
