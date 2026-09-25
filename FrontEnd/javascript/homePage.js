
        const playBtn = document.getElementById("playBtn");
        const guideBtn = document.getElementById("guideBtn");
        const shopBtn = document.getElementById("shopBtn");
        const statsBtn = document.getElementById("statsBtn");

        playBtn.addEventListener("click", () => {
          window.location.href= "../html/GamePage.html"
        });

        guideBtn.addEventListener("click", () => {
            window.location.href="../html/HomePageFeatures/GuidePage.html";
        });

        shopBtn.addEventListener("click", () => {
             window.location.href= "../html/HomePageFeatures/ShopPage.html";
        });

        statsBtn.addEventListener("click", () => {
             window.location.href= "../html/HomePageFeatures/StatsPage.html";
        });

        // =========================
// PLAYER INFORMATION
// =========================

const coins = localStorage.getItem("coins") || 0;
const highScore = localStorage.getItem("highScore") || 0;

document.getElementById("homeCoins").textContent = coins;
document.getElementById("homeHighScore").textContent = highScore;