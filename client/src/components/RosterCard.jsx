import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../transitions/usePageTransition";
import teamColors from "../data/teamColors";

export default function RosterCard({ player }) {
  const navigate = useNavigate();
  const { showTransition } = usePageTransition();

  const handleClick = () => {
    const colors = teamColors[player.team_abbr] || {
      primary: "#1d1d1d",
      secondary: "#ffffff",
    };

    showTransition({
      name: player.player,
      image: player.headshot,
      primaryColor: colors.primary,
      textColor: colors.secondary,
    });

    setTimeout(() => {
      navigate(`/player/${player.player_id}`);
    }, 550); 
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border p-2 rounded hover:shadow-lg transition text-center bg-white"
    >
      {player.headshot ? (
        <img
          src={player.headshot}
          alt={player.player}
          className="w-20 h-20 mx-auto rounded-full mb-2"
        />
      ) : (
        <div className="w-20 h-20 mx-auto rounded-full mb-2 bg-gray-200 flex items-center justify-center">
          N/A
        </div>
      )}

      <p className="font-semibold">{player.player}</p>
      <p>#{player.sweaterNumber || "—"}</p>
      <p>{player.positionCode || "—"}</p>
    </div>
  );
}
