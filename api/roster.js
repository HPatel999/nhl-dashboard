import axios from "axios";

export default async function handler(req, res) {
  const teamAbbr = req.query.teamAbbr || req.query.team || "NYR";

  try {
    const { data } = await axios.get(`https://api-web.nhle.com/v1/roster/${teamAbbr}/20252026`);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch roster" });
  }
}
