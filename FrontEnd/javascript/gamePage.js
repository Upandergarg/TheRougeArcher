// =========================
// GAME PAGE CONTROLLER
// =========================

import { canvas, ctx } from "./game/canvas.js";
import { gameState } from "./game/gameState.js";

import { hero, drawHero } from "./game/hero.js";

import {
    enemy,
    spawnEnemy,
    drawEnemy
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
    drawHitboxes
} from "./game/collision.js";


// =========================
// SETTINGS / GAME OVER BUTTONS
// =========================

const restartBtn =
    document.getElementById("restartBtn");

const exitBtn =
    document.getElementById("exitBtn");


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

    if (gameState.gameOver) {
        return;
    }

    // Aim
    updateAim();

    // Player arrow
    updatePlayerArrow();
    checkPlayerArrowCollision();

    // Enemy shooting timer
    gameState.enemyShootTimer++;

    if (
        gameState.enemyShootTimer >= 120 &&
        gameState.enemyArrow === null &&
        enemy.health > 0
    ) {

        createEnemyArrow();

        gameState.enemyShootTimer = 0;
    }

    // Enemy arrow
    updateEnemyArrow();
    checkEnemyArrowCollision();
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

    drawHero();

    drawEnemy();

    // Temporary debugging hitboxes
    drawHitboxes();

    drawAimLine();

    drawArrow();

    drawEnemyArrow();
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

    gameState.gameOver = false;

    spawnEnemy();

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


// =========================
// START GAME
// =========================

spawnEnemy();

gameLoop();
