import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/standings", async (req, res) => {
  try {
    const nhlRes = await axios.get("https://api-web.nhle.com/v1/standings/now");
    res.json(nhlRes.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

app.get("/api/roster/:teamAbbr", async (req, res) => {
  const { teamAbbr } = req.params;
  try {
    const response = await fetch(`https://api-web.nhle.com/v1/roster/${teamAbbr}/20252026`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch roster" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
