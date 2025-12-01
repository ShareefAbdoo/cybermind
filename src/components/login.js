// src/components/login.js

export function loginHandler() {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  const msgEl = document.getElementById("loginMsg");

  if (!usernameEl || !passwordEl || !msgEl) return;

  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  if (!username || !password) {
    msgEl.textContent = "Username and password are required.";
    msgEl.style.color = "red";
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const score = data.score ?? 0;

        // save user info
        localStorage.setItem("cybermind_user", username);
        localStorage.setItem("cybermind_score", score);

        // init history if missing
        const existing = localStorage.getItem("cybermind_score_history");
        if (!existing) {
          localStorage.setItem(
            "cybermind_score_history",
            JSON.stringify([score])
          );
        }

        // redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        msgEl.textContent = data.message || "Login failed.";
        msgEl.style.color = "red";
      }
    })
    .catch((err) => {
      console.error(err);
      msgEl.textContent = "Error connecting to server.";
      msgEl.style.color = "red";
    });
}
