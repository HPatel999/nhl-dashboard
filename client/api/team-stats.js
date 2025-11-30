import axios from "axios";

export default async function handler(req, res) {
  const { teamAbbr, endpoint } = req.query;
  const seasonId = 20252025;

  if (!teamAbbr || !endpoint) {
    return res.status(400).json({ error: "teamAbbr and endpoint required" });
  }

  try {
    const cayenneExpr = encodeURIComponent(`teamAbbrev='${teamAbbr}' and seasonId=${seasonId}`);
    const url = `https://api.nhle.com/stats/rest/en/team/${endpoint}?cayenneExp=${cayenneExpr}`;
    const { data } = await axios.get(url);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching NHL API:", err);
    return res.status(500).json({ error: "Failed to fetch NHL API" });
  }
}
