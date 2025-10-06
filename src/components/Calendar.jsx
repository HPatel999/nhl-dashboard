import React, { useState } from "react";

export default function Calendar({ games, abbr, color, textColor }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Format games
  const formattedGames = games.map((g) => {
    const isHome = g.homeTeam.abbrev === abbr;
    return {
      id: g.id,
      date: g.gameDate,
      startTimeUTC: g.startTimeUTC,
      isHome,
      homeTeam: g.homeTeam,
      awayTeam: g.awayTeam,
      state: g.gameState,
      score:
        g.homeTeam.score !== undefined
          ? { home: g.homeTeam.score, away: g.awayTeam.score }
          : null,
      outcome: g.gameOutcome?.lastPeriodType,
      gameCenterLink: g.gameCenterLink,
    };
  });


  const getGamesForDay = (day) =>
    formattedGames.filter((g) => {
      if (!g.date) return false;
      const [gy, gm, gd] = g.date.split("-").map(Number);
      return gy === currentYear && gm - 1 === currentMonth && gd === day;
    });


  const goPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Build calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goPrev}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <h2 className="text-xl font-bold">{monthName}</h2>
        <button
          onClick={goNext}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold min-w-[500px]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-xs sm:text-sm">
            {d}
          </div>
        ))}
      </div>

    <div className="grid grid-cols-7 gap-2 min-w-[500px]">
       {calendarDays.map((day, idx) => {
        
            if (!day) return <div key={idx} className="h-28 border rounded bg-gray-50" />;

            const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

            const gamesToday = getGamesForDay(day);

            return (
                <div
                key={`${currentYear}-${currentMonth}-${day}`}
                className={`h-28 border rounded flex flex-col items-center p-1 text-center min-w-[70px] ${
                    isToday ? "bg-opacity-30" : ""
                }`}
                style={
                    isToday
                    ? { backgroundColor: color, color: textColor } // apply team colors
                    : {}
                }
                >
                <span className="text-xs font-medium">{day}</span>

                {gamesToday.map((g) => {
                    const teamLogo = g.isHome ? g.homeTeam.logo : g.awayTeam.logo;
                    const opponentLogo = g.isHome ? g.awayTeam.logo : g.homeTeam.logo;
                    const opponentAbbrev = g.isHome ? g.awayTeam.abbrev : g.homeTeam.abbrev;
                    const teamScore = g.isHome ? g.homeTeam.score : g.awayTeam.score;
                    const opponentScore = g.isHome ? g.awayTeam.score : g.homeTeam.score;
                    const vsOrAt = g.isHome ? "vs" : "@";

                    const displayTime =
                        g.state === "LIVE"
                          ? `${teamScore}-${opponentScore} LIVE`
                          : g.score
                          ? `${teamScore}-${opponentScore} ${g.outcome !== "REG" ? g.outcome : ""}`
                          : g.state !== "FINAL" && g.state !== "POSTPONED"
                          ? new Date(g.startTimeUTC).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                              timeZoneName: "short",
                            })
                          : g.state;

                    return (
                    <div
                        key={g.id}
                        className="flex flex-col items-center mt-1 cursor-pointer"
                        onClick={() => window.open(`https://www.nhl.com${g.gameCenterLink}`, "_blank")}
                    >
                        <div className="flex items-center space-x-1">
                        <img src={teamLogo} alt={abbr} className="w-5 h-5  md:w-7 md:h-7 lg:w-10 lg:h-10" />
                        <span className="text-[10px]">{vsOrAt}</span>
                        <img src={opponentLogo} alt={opponentAbbrev} className="w-5 h-5  md:w-7 md:h-7 lg:w-10 lg:h-10" />
                        </div>

                        <span className="text-[10px] mt-1">{displayTime}</span>
                    </div>
                    );
                })}
                </div>
            );
            })}
        </div>
    </div>
    </div>
  );
}
