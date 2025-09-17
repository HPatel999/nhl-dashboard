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

 app.get("/api/schedule/:teamAbbr", async (req, res) => {
  const { teamAbbr } = req.params;
  try {
    const response = await axios.get(
      `https://api-web.nhle.com/v1/club-schedule-season/${teamAbbr.toLowerCase()}/20252026`
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});



app.get("/api/stats/:teamAbbr/:endpoint", async (req, res) => {
  const { teamAbbr, endpoint } = req.params;
  const seasonId = 20242025;

  const cayenneExpr = encodeURIComponent(
    `teamAbbrev='${teamAbbr}' and seasonId=${seasonId}`
  );
  const url = `https://api.nhle.com/stats/rest/en/team/${endpoint}?cayenneExp=${cayenneExpr}`;

  try {
    const response = await fetch(url); // wait for fetch
    const data = await response.json(); // wait for JSON parsing
    res.json(data);
  } catch (err) {
    console.error("Error fetching NHL API:", err);
    res.status(500).json({ error: "Failed to fetch NHL API" });
  }
});

app.get("/api/player/:id/landing", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api-web.nhle.com/v1/player/${id}/landing`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player landing:", error.message);
    res.status(500).json({ error: "Failed to fetch player landing data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
