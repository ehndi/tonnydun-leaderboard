const names = [
  "Alex", "Sam", "Jordan", "Chris", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery",
  "Blake", "Cameron", "Dakota", "Ellis", "Finley", "Gray", "Hunter", "Indigo", "Jaden", "Kai"
];

const prizes = [1000, 500, 300, 100, 50, 25, 15, 10, 0, 0];

const players = [];

for (let i = 0; i < 10; i++) {
  const name = names[Math.floor(Math.random() * names.length)];
  const wagered = Math.floor(Math.random() * 900000) + 100000; // 100k to 1M
  players.push({ name, wagered });
}

// sort highest → lowest
players.sort((a, b) => b.wagered - a.wagered);

const board = document.getElementById("leaderboard");

// Top 3 podium
const top3 = document.createElement("div");
top3.classList.add("top3-podium");
board.appendChild(top3);

players.slice(0, 3).forEach((player, index) => {
  const div = document.createElement("div");
  div.classList.add("podium-card", `podium-${index + 1}`);

  const prize = prizes[index];
  const wageredFormatted = player.wagered.toLocaleString();
  const displayName = player.name.substring(0, 2) + '***';

  div.innerHTML = `
    <div class="rank">#${index + 1}</div>
    <div class="name">${displayName}</div>
    <div class="wagered">Wagered: ${wageredFormatted}</div>
    <div class="prize">Prize: $${prize}</div>
  `;

  top3.appendChild(div);
});

// Rest of the leaderboard
players.slice(3).forEach((player, index) => {
  const div = document.createElement("div");
  div.classList.add("card");

  const prize = prizes[index + 3];
  const wageredFormatted = player.wagered.toLocaleString();
  const displayName = player.name.substring(0, 2) + '***';

  div.innerHTML = `
    <div class="rank">#${index + 4} ${displayName}</div>
    <div class="details">
      <span>Wagered: ${wageredFormatted}</span>
      <span>Prize: $${prize}</span>
    </div>
  `;

  board.appendChild(div);
});

// Countdown to next tournament (fixed date: May 20, 2026)
const targetDate = new Date('2026-05-20');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('timer').innerText = 'Tournament Started!';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById('timer').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);