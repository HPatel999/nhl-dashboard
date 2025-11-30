import axios from "axios";

export default async function handler(req, res) {
  const teamAbbr = req.query.teamAbbr;
  if (!teamAbbr) return res.status(400).json({ error: "teamAbbr is required as query param" });

  try {
    const { data } = await axios.get(
      `https://api-web.nhle.com/v1/club-schedule-season/${teamAbbr.toLowerCase()}/20252026`
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch schedule" });
  }
}
