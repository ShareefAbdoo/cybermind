// src/components/leaderboard.js
//??
export function showLeaderboard() {
  const container = document.getElementById("leaderboardContainer");
  if (!container) return;

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://cybermind-backend-qomw.onrender.com";

  fetch(`${BASE_URL}/leaderboard`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>No leaderboard data yet.</p>";
        return;
      }

      const top3 = data.slice(0, 3);
      const rest = data.slice(3);

      container.innerHTML = `
        <div class="leaderboard">
          <h2>Top Cyberminds</h2>
          <div class="leaderboard-top3">
            ${top3
              .map(
                (entry, index) => `
              <div class="leader-card rank-${index + 1}">
                <div class="rank-badge">#${index + 1}</div>
                <div class="leader-info">
                  <h3>${entry.username}</h3>
                  <p>${entry.points} pts</p>
                  <span class="tier-tag">${getTier(entry.points)}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>

          ${
            rest.length > 0
              ? `
            <h3 class="leaderboard-subtitle">Others climbing the ranks</h3>
            <ul class="leaderboard-list">
              ${rest
                .map(
                  (entry, index) => `
                <li>
                  <span class="rank">#${index + 4}</span>
                  <span class="user">${entry.username}</span>
                  <span class="points">${entry.points} pts</span>
                  <span class="tag">${getHexTag(index + 4)}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          `
              : ""
          }
        </div>
      `;
    })
    .catch((err) => {
      console.error("Error loading leaderboard:", err);
      container.innerHTML =
        "<p>Could not load leaderboard. Try again later.</p>";
    });
}

function getTier(points) {
  if (points >= 1700) return "LEGEND";
  if (points >= 1300) return "VISIONARY";
  if (points >= 900) return "VOYAGER";
  if (points >= 600) return "ADEPT";
  if (points >= 300) return "APPRENTICE";
  return "NEWBIE";
}

function getHexTag(rank) {
  // just for the vibe: [0x5], [0x4], ...
  const base = 5 - rank;
  const n = base > 0 ? base : 1;
  return `[0x${n.toString(16).toUpperCase()}]`;
}
