import { useState } from "react";

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value ?? "—"}</p>
    </div>
  );
}

function formatSeason(season) {
  if (!season) return "";
  const str = season.toString(); 
  const start = str.slice(0, 4); 
  const end = str.slice(4);      
  return `${start}-${end}`;
}

export default function StatsTabs({ featuredStats, isGoalie, color }) {
  const season = featuredStats?.season;
  const formattedSeason = formatSeason(season);

    const allTabs = [
    {
      key: "regularSeason-subSeason",
      label: `${formattedSeason} Season`,
      exists: !!featuredStats?.regularSeason?.subSeason,
    },
    {
      key: "regularSeason-career",
      label: "Career",
      exists: !!featuredStats?.regularSeason?.career,
    },
    {
      key: "playoffs-subSeason",
      label: `${formattedSeason} Playoffs`,
      exists: !!featuredStats?.playoffs?.subSeason,
    },
    {
      key: "playoffs-career",
      label: "Career Playoffs",
      exists: !!featuredStats?.playoffs?.career,
    },
  ];

  const tabs = allTabs.filter((t) => t.exists);
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  const [section, type] = activeTab.split("-");
  const data = featuredStats?.[section]?.[type];
  return (
    <div>
     <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => {
            const isActive = activeTab === tab.key; 
            console.log(color);
            return (
            <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="pb-2 px-4 font-medium border-b-2"
                style={{
                borderColor: isActive ? color : "transparent",
                color: isActive ? color : "#6b7280", 
                }}
            >
                {tab.label}
            </button>
            );
        })}
        </div>


      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {isGoalie ? (
          <>
            <StatCard label="Games" value={data?.gamesPlayed} />
            <StatCard label="Wins" value={data?.wins} />
            <StatCard label="Save %" value={data?.savePctg} />
            <StatCard label="GAA" value={data?.goalsAgainstAvg} />
            <StatCard label="SO" value={data?.shutouts} />

          </>
        ) : (
          <>
            <StatCard label="Games" value={data?.gamesPlayed} />
            <StatCard label="Goals" value={data?.goals} />
            <StatCard label="Assists" value={data?.assists} />
            <StatCard label="Points" value={data?.points} />
            <StatCard label="+/-" value={data?.plusMinus} />

          </>
        )}
      </div>



    </div>
  );
}
