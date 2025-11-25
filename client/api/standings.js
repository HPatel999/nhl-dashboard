import axios from "axios";

export default async function handler(req, res) {
  try {
    const nhlRes = await axios.get("https://api-web.nhle.com/v1/standings/now");
    return res.status(200).json(nhlRes.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch standings" });
  }
}
