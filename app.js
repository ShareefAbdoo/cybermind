import { loginHandler } from "./src/components/login.js";
import { loadScenario } from "./src/components/scenario.js";
import { showLeaderboard } from "./src/components/leaderboard.js";
import { openTerminal } from "./src/components/terminal.js";
import { renderScoreChart } from "./src/components/scoreChart.js";

/* ===== LOGIN PAGE ===== */
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

if (loginBtn) {
  loginBtn.addEventListener("click", loginHandler);
}

if (usernameInput && passwordInput) {
  [usernameInput, passwordInput].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") loginHandler();
    })
  );
}

/* ===== DASHBOARD ===== */
const userLabel = document.getElementById("userLabel");
const userScore = document.getElementById("userScore");

if (userLabel && userScore) {
  const user = localStorage.getItem("cybermind_user");
  const score = localStorage.getItem("cybermind_score");

  if (!user) {
    window.location.href = "index.html";
  } else {
    userLabel.textContent = user;
    userScore.textContent = score ?? 0;

    renderScoreChart();
  }
}

/* ===== TRAINING PAGE ===== */
const startScenarioBtn = document.getElementById("startScenario");
if (startScenarioBtn) {
  startScenarioBtn.addEventListener("click", loadScenario);
}

/* ===== LEADERBOARD ===== */
const leaderboardContainer = document.getElementById("leaderboardContainer");
if (leaderboardContainer) {
  showLeaderboard();
}

/* ===== TERMINAL ===== */
const terminalContainer = document.getElementById("terminalContainer");
if (terminalContainer) {
  openTerminal();
}
