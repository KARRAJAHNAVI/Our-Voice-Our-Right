const express = require("express");
const fetch = require("node-fetch");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Create database
const db = new sqlite3.Database("data.db");
db.run("CREATE TABLE IF NOT EXISTS mgnrega (district TEXT, data TEXT, updated_at TEXT)");

async function fetchData(district) {
  const apiKey = "579b464db66ec23bdd000001b15aa72e38414d81743426c19a5bfbaf";
  const resourceId = "9ef84268-d588-465a-a308-a864a43d0070";
  const apiUrl = `https://api.data.gov.in/resource/${resourceId}?format=json&limit=5&api-key=${apiKey}`;

  console.log("Fetching from:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err);
    return { error: "Unable to fetch data" };
  }
}



// Endpoint to get district data
app.get("/api/district/:name", async (req, res) => {
  const district = req.params.name.toLowerCase();
  db.get("SELECT data FROM mgnrega WHERE district = ?", [district], async (err, row) => {
    if (row) {
      res.json(JSON.parse(row.data));
    } else {
      const data = await fetchData(district);
      db.run("INSERT INTO mgnrega (district, data, updated_at) VALUES (?, ?, datetime('now'))", [
        district,
        JSON.stringify(data)
      ]);
      res.json(data);
    }
  });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
