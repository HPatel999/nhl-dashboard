import axios from "axios";

export default async function handler(req, res) {
  const { type, endpoint, id, seasonId } = req.query;
  if (!type || !endpoint || !id || !seasonId) {
    return res.status(400).json({ error: "type, endpoint, id and seasonId required as query params" });
  }

  try {
    const cayenneExpr = encodeURIComponent(`playerId=${id} and seasonId=${seasonId}`);
    const url = `https://api.nhle.com/stats/rest/en/${type}/${endpoint}?cayenneExp=${cayenneExpr}`;
    const { data } = await axios.get(url);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching player stats:", err.message);
    return res.status(500).json({ error: "Failed to fetch NHL API" });
  }
}
