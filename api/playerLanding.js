import axios from "axios";

export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "player id required as ?id=" });

  try {
    const { data } = await axios.get(`https://api-web.nhle.com/v1/player/${id}/landing`);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching player landing:", err.message);
    return res.status(500).json({ error: "Failed to fetch player landing data" });
  }
}
