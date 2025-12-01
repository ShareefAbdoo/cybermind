const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory "database"
let users = [
  // main test accounts you can log in with:
  { username: "admin", password: "admin", points: 1200 },
  { username: "guest", password: "guest", points: 300 },

  // extra demo users for leaderboard only:
  { username: "CyberFox", password: "demo", points: 1850 },
  { username: "NetRunner", password: "demo", points: 1620 },
  { username: "PacketNinja", password: "demo", points: 1430 },
  { username: "ShadowRoot", password: "demo", points: 980 },
  { username: "BlueShield", password: "demo", points: 860 },
  { username: "RedSpectre", password: "demo", points: 720 },
  { username: "CryptoCat", password: "demo", points: 640 },
  { username: "LogWatcher", password: "demo", points: 510 }
];

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      score: user.points
    });
  } else {
    res.json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

// Update score after scenario (can go up or down, including negative)
app.post("/updateScore", (req, res) => {
  const { username, amount } = req.body;

  const user = users.find((u) => u.username === username);

  if (user) {
    const numericAmount =
      typeof amount === "number" ? amount : Number(amount) || 0;

    user.points += numericAmount;

    res.json({ updated: true, score: user.points });
  } else {
    res.json({ updated: false });
  }
});

// Leaderboard
app.get("/leaderboard", (req, res) => {
  const sorted = [...users].sort((a, b) => b.points - a.points);
  // we only need username + points on frontend
  const publicBoard = sorted.map((u) => ({
    username: u.username,
    points: u.points
  }));
  res.json(publicBoard);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

