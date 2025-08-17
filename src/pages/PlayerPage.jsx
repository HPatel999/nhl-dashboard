import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold">Player Page: #{id}</h1>
    </div>
  );
}
