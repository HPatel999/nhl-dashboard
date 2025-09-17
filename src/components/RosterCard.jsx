import { Link } from "react-router-dom";
export default function RosterCard({ player }) {
  return (
    <Link to={`/player/${player.player_id}`}>
    <div className="border p-2 rounded hover:shadow-lg transition text-center bg-white">
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
    </Link>
  );
}
