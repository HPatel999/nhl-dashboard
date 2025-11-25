export function transformShotTypeData(rawData) {
  if (!rawData) return [];

  const shotTypes = [
    "WrapAround",
    "Slap",
    "Snap",
    "Backhand",
    "Deflected",
    "Wrist",
    "TipIn",
    "BetweenLegs",
    "Cradle",
    "Poke",
    "Bat",
  ];

  const shotTypeStats = shotTypes.map((type) => ({
    key: type.replace(/([A-Z])/g, " $1").trim(),
    goals: rawData[`goals${type}`] || 0,
    shots: rawData[`shotsOnNet${type}`] || 0,  
    pct: rawData[`shootingPct${type}`] || 0,
  }));

  const totalGoals = shotTypeStats.reduce((sum, s) => sum + s.goals, 0);

  return shotTypeStats.map((s) => ({
    name: s.key,
    goals: totalGoals > 0 ? (s.goals / totalGoals) * 100 : 0,
    rawGoals: s.goals,   
    shots: s.shots,         
    pct: s.pct * 100,
  }));
}

export function transformSpecialTeamsData(ppData, pkData) {
  const pp = ppData && ppData.ppTimeOnIcePerGame > 0 ? {
    goals: ppData.ppGoals || 0,
    assists: ppData.ppAssists || 0,
    points: ppData.ppPoints || 0,
    shootingPct: (ppData.ppShootingPct || 0) * 100,
    shots: ppData.ppShots || 0,
    toi: (ppData.ppTimeOnIcePerGame / 60).toFixed(1), 
    toiPct: ((ppData.ppTimeOnIcePctPerGame || 0) * 100).toFixed(1),
    pointsPer60: ppData.ppPointsPer60 || 0,
    goalsPer60: ppData.ppGoalsPer60 || 0,
    primaryAssistsPer60: ppData.ppPrimaryAssistsPer60 || 0,
    shotsPer60: ppData.ppShotsPer60 || 0,
  } : null;

  const pk = pkData && pkData.shTimeOnIcePerGame > 0 ? {
    goals: pkData.shGoals || 0,
    assists: pkData.shAssists || 0,
    points: pkData.shPoints || 0,
    shootingPct: (pkData.shShootingPct || 0) * 100,
    shots: pkData.shShots || 0,
    toi: (pkData.shTimeOnIcePerGame / 60).toFixed(1),
    toiPct: ((pkData.shTimeOnIcePctPerGame || 0) * 100).toFixed(1),
    pointsPer60: pkData.shPointsPer60 || 0,
    goalsAgainstPer60: pkData.ppGoalsAgainstPer60 || 0,
    shotsPer60: pkData.shShotsPer60 || 0,
  } : null;

  return { pp, pk };
}

