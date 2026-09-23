import { canvas, ctx } from "./canvas.js";
import { gameState } from "./gameState.js";

// =========================
// HERO
// =========================

export const hero = {
    x: canvas.width * 0.15,
    y: canvas.height * 0.5 - 120 / 2,

    width: 80,
    height: 120,

    health: 100,
    arrows: 10,

    angle: 0
};

export function drawHero() {

    const x = hero.x;
    const y = hero.y;
    const centerX = hero.x + hero.width / 2;
const centerY = hero.y + hero.height / 2;

ctx.save();

ctx.translate(centerX, centerY);
ctx.scale(1.5, 1.5);
ctx.translate(-centerX, -centerY);

    

    // =========================
    // LEGS
    // =========================

    ctx.fillStyle = "#2b2522";

    ctx.fillRect(
        x + 20,
        y + 88,
        14,
        32
    );

    ctx.fillRect(
        x + 46,
        y + 88,
        14,
        32
    );


    // =========================
    // BOOTS
    // =========================

    ctx.fillStyle = "#171412";

    ctx.fillRect(
        x + 16,
        y + 114,
        20,
        6
    );

    ctx.fillRect(
        x + 44,
        y + 114,
        20,
        6
    );


    // =========================
    // BODY / LEATHER ARMOR
    // =========================

    ctx.fillStyle = "#4a3024";

    ctx.fillRect(
        x + 17,
        y + 43,
        46,
        50
    );


    // Armor belt

    ctx.fillStyle = "#b38a45";

    ctx.fillRect(
        x + 17,
        y + 72,
        46,
        6
    );


    // =========================
    // HEAD
    // =========================

    ctx.fillStyle = "#c98f68";

    ctx.beginPath();

    ctx.arc(
        x + 40,
        y + 34,
        17,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // =========================
    // HOOD
    // =========================

    ctx.fillStyle = "#211b19";

    ctx.beginPath();

    ctx.arc(
        x + 40,
        y + 31,
        21,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x + 19,
        y + 28,
        42,
        10
    );


    // =========================
    // FACE SHADOW
    // =========================

    ctx.fillStyle = "#30231f";

    ctx.fillRect(
        x + 25,
        y + 35,
        30,
        8
    );


    // =========================
    // EYES
    // =========================

    ctx.fillStyle = "#e0c27a";

    ctx.fillRect(
        x + 30,
        y + 37,
        5,
        2
    );

    ctx.fillRect(
        x + 45,
        y + 37,
        5,
        2
    );


    // =========================
    // LEFT ARM
    // =========================

    ctx.fillStyle = "#4a3024";

    ctx.fillRect(
        x + 7,
        y + 48,
        12,
        38
    );


    // =========================
    // RIGHT ARM
    // =========================

    ctx.fillRect(
        x + 61,
        y + 48,
        12,
        38
    );


    // =========================
    // BOW
    // =========================

    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.arc(
        x + 70,
        y + 65,
        28,
        -Math.PI / 2,
        Math.PI / 2
    );

    ctx.stroke();


    // Bow string

    ctx.strokeStyle = "#d6c29a";
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        x + 70,
        y + 37
    );

    ctx.lineTo(
        x + 70,
        y + 93
    );

    ctx.stroke();


    ctx.restore();
}


export function damageHero(amount) {

    hero.health -= amount;

    console.log("Hero health:", hero.health);

    if (hero.health <= 0) {

        hero.health = 0;
        gameState.gameOver = true;

        document.getElementById("finalScore").textContent =
    gameState.score;

document.getElementById("finalKills").textContent =
    gameState.kills;
document.getElementById("finalCoins").textContent =
    gameState.coins;

        const gameOverMenu =
            document.getElementById("gameOverMenu");

        if (gameOverMenu) {
            gameOverMenu.style.display = "block";
        }

        console.log("PLAYER DEAD!");
    }
}
