const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", function () {
    window.location.href = "../index.html";
});
// =========================
// LOAD STATS
// =========================

const highestScore =
    Number(localStorage.getItem("highestScore")) || 0;

const totalPlayed =
    Number(localStorage.getItem("totalPlayed")) || 0;

const coins =
    Number(localStorage.getItem("coins")) || 0;

const totalKills =
    Number(localStorage.getItem("kills")) || 0;

const shots =
    Number(localStorage.getItem("shots")) || 0;

const hits =
    Number(localStorage.getItem("hits")) || 0;


// =========================
// CALCULATE ACCURACY
// =========================

const accuracy =
    shots === 0
        ? 0
        : (hits / shots) * 100;


// =========================
// DISPLAY STATS
// =========================

document.getElementById("highestScore").textContent =
    highestScore;

document.getElementById("totalPlayed").textContent =
    totalPlayed;

document.getElementById("coins").textContent =
    coins;

document.getElementById("totalKills").textContent =
    totalKills;

document.getElementById("accuracy").textContent =
    accuracy.toFixed(2) + "%";


// =========================
// BACK BUTTON
// =========================
