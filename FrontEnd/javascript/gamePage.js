// =========================
// GAME PAGE CONTROLLER
// =========================

import { canvas, ctx } from "./game/canvas.js";
import { gameState } from "./game/gameState.js";

import { hero, drawHero } from "./game/hero.js";

import {
    enemy,
    spawnEnemy,
    drawEnemy,
    moveEnemy 
} from "./game/enemy.js";

import {
    createEnemyArrow,
    updatePlayerArrow,
    updateEnemyArrow,
    drawArrow,
    drawEnemyArrow
} from "./game/arrows.js";

import { updateAim } from "./game/input.js";

import {
    checkPlayerArrowCollision,
    checkEnemyArrowCollision,
      checkPickupCollision,
    drawHitboxes,
    
} from "./game/collision.js";
import {
    saveGameData,
    loadGameData
} from "./game/storage.js";
import {
    pickups,
    spawnHealthPickup,
    spawnArrowPickup,
    drawPickups
} from "./game/pickups.js";

// =========================
// SETTINGS / GAME OVER BUTTONS
// =========================

const restartBtn =
    document.getElementById("restartBtn");

const exitBtn =
    document.getElementById("exitBtn");

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsMenu =
    document.getElementById("settingsMenu");
const resumeBtn =
    document.getElementById("resumeBtn");
const settingsRestartBtn =
    document.getElementById("settingsRestartBtn");
const settingsExitBtn =
    document.getElementById("settingsExitBtn");
if (settingsBtn) {

   settingsBtn.addEventListener("click", function() {

    gameState.isPaused = true;

    settingsMenu.classList.add("show");

});

resumeBtn.addEventListener("click", function() {

    gameState.isPaused = false;

    settingsMenu.classList.remove("show");

});
settingsRestartBtn.addEventListener("click", function() {

    settingsMenu.classList.remove("show");

    restartGame();

});

settingsExitBtn.addEventListener("click", function() {

    window.location.href =
        "../html/index.html";

});
}

if (exitBtn) {

    exitBtn.addEventListener("click", function() {

        window.location.href =
            "../html/index.html";

    });
}


if (restartBtn) {

    restartBtn.addEventListener("click", restartGame);
}


// =========================
// AIM LINE
// =========================

function drawAimLine() {

    if (!gameState.isAiming) {
        return;
    }

    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    const length = 120;

    const endX =
        heroCenterX +
        Math.cos(hero.angle) * length;

    const endY =
        heroCenterY +
        Math.sin(hero.angle) * length;

    ctx.beginPath();

    ctx.moveTo(
        heroCenterX,
        heroCenterY
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.strokeStyle = "#d0ae70";
    ctx.lineWidth = 3;

    ctx.stroke();
}


// =========================
// GAME UPDATE
// =========================

function update() {

     if (gameState.gameOver || gameState.isPaused) {
        return;
    }


    // Aim
    updateAim();
gameState.enemyMoveTimer++;

if (gameState.enemyMoveTimer >= 300) {
    moveEnemy();
    gameState.enemyMoveTimer = 0;
}
    // Player arrow
    updatePlayerArrow();
    checkPlayerArrowCollision();

    // Enemy shooting timer
    gameState.enemyShootTimer++;

if (
    gameState.enemyShootTimer >= gameState.enemyShootCooldown &&
    gameState.enemyArrow === null &&
    enemy.health > 0
) {
    createEnemyArrow();

    gameState.enemyShootTimer = 0;
//1.5 - 3 ssec
    gameState.enemyShootCooldown =
        90 + Math.floor(Math.random() * 90);
}

    // Enemy arrow
    updateEnemyArrow();
    checkEnemyArrowCollision();
    checkPickupCollision();
    // Spawn health pickup when health is low
if (hero.health < 25 && pickups.health === null) {
    spawnHealthPickup();
}


// Spawn arrow pickup when arrows are low
if (hero.arrows < 2 && pickups.arrows === null) {
    spawnArrowPickup();
}
}


// =========================
// GAME DRAW
// =========================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //updating the states during game adn at the end of the game
    document.getElementById("score").textContent =
    gameState.score;
document.getElementById("kills").textContent = gameState.kills;
  document.getElementById("coins").textContent = gameState.coins;
   
    document.getElementById("arrowCount").textContent = hero.arrows;
document.getElementById("health").textContent = hero.health;
document.getElementById("healthFill").style.width =
    hero.health + "%";

    drawHero();

    drawEnemy();
 
    // Temporary debugging hitboxes
    drawHitboxes();
drawPickups();
    drawAimLine();

    drawArrow();

    drawEnemyArrow();
    
  const accuracy =
    gameState.shots === 0
        ? 0
        : (gameState.hits / gameState.shots) * 100;
    document.getElementById("accuracy").textContent = accuracy.toFixed(2) + "%";

    gameState.arrowTimer++;

if (gameState.arrowTimer >= 600) {
    hero.arrows += 1;

    if (hero.arrows > 10) {
        hero.arrows = 10;
    }

    gameState.arrowTimer = 0;
}
}

// =========================
// TOTAL GAMES PLAYED
// =========================

function increaseGamesPlayed() {

    let totalPlayed =
        Number(localStorage.getItem("totalPlayed")) || 0;

    totalPlayed++;

    localStorage.setItem(
        "totalPlayed",
        totalPlayed
    );
}
// =========================
// RESTART
// =========================

function restartGame() {

    hero.health = 100;
    hero.arrows = 10;

    enemy.health = 100;

    gameState.arrow = null;
    gameState.enemyArrow = null;

  gameState.enemyShootTimer = 0;
gameState.enemyShootCooldown = 120;
gameState.isPaused = false;

gameState.score = 0;
gameState.kills = 0;
gameState.coins = 0;
gameState.shots = 0;
gameState.hits = 0;
    gameState.gameOver = false;
    

    spawnEnemy();
increaseGamesPlayed();
    const gameOverMenu =
        document.getElementById("gameOverMenu");

    if (gameOverMenu) {
        gameOverMenu.style.display = "none";
    }
}


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);
}

increaseGamesPlayed();

// =========================
// START GAME
// =========================

spawnEnemy();


gameLoop();
