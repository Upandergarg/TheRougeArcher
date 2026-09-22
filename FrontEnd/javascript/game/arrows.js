import { canvas, ctx } from "./canvas.js";
import { gameState } from "./gameState.js";
import { hero } from "./hero.js";
import { enemy } from "./enemy.js";

// =========================
// PLAYER ARROW
// =========================

export function createArrow() {
if (hero.arrows <= 0) {
    return;
}
hero.arrows--;
gameState.shots++;
    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    gameState.arrow = {

        x: heroCenterX,
        y: heroCenterY,

        width: 30,
        height: 5,

        speed: 8,

        angle: hero.angle,

        velocityX:
            Math.cos(hero.angle) * 8,

        velocityY:
            Math.sin(hero.angle) * 8
    };
}


export function updatePlayerArrow() {

    const arrow = gameState.arrow;

    if (arrow === null) {
        return;
    }

    arrow.x += arrow.velocityX;
    arrow.y += arrow.velocityY;

    // Gravity
    arrow.velocityY += 0.035;
}


export function drawArrow() {

    const arrow = gameState.arrow;

    if (!arrow) {
        return;
    }

    ctx.save();

    // Move to arrow position
    ctx.translate(arrow.x, arrow.y);

    // Rotate according to arrow direction
    ctx.rotate(arrow.angle);

    // Shaft
    ctx.fillStyle = "#8B5A2B";
 ctx.fillRect(
    -30,
    -2,
    60,
    4
);

    // Arrow head
    ctx.beginPath();

    ctx.moveTo(30, 0);
ctx.lineTo(20, -7);
ctx.lineTo(20, 7);

    ctx.closePath();

    ctx.fillStyle = "#C0C0C0";
    ctx.fill();

    // Small feathers
    ctx.fillStyle = "#D8D8D8";

 ctx.fillRect(
    -30,
    -5,
    10,
    3
);

ctx.fillRect(
    -30,
    2,
    10,
    3
);

    ctx.restore();
}
// =========================
// ENEMY ARROW
// =========================

export function createEnemyArrow() {

    const enemyCenterX =
        enemy.x + enemy.width / 2;

    const enemyCenterY =
        enemy.y + enemy.height / 2;

    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    const perfectAngle = Math.atan2(
    heroCenterY - enemyCenterY,
    heroCenterX - enemyCenterX
);

// 0.8  → enemy misses less
// 1.5  → enemy misses more
// 2.0  → enemy misses a lot
// 3.0  → enemy is very inaccurate
const maxError = (1 - enemy.accuracy) * 1.5;

const aimError =
    (Math.random() - 0.5) * maxError;

const angle = perfectAngle + aimError;

    gameState.enemyArrow = {

        x: enemyCenterX,
        y: enemyCenterY,

        width: 30,
        height: 5,

        angle: angle,

        speed: 4,

        velocityX:
            Math.cos(angle) * 4,

        velocityY:
            Math.sin(angle) * 4
    };
}


export function updateEnemyArrow() {

    const arrow = gameState.enemyArrow;

    if (arrow === null) {
        return;
    }

    arrow.x += arrow.velocityX;
    arrow.y += arrow.velocityY;

    // Remove arrow outside canvas
    if (
        arrow.x < 0 ||
        arrow.x > canvas.width ||
        arrow.y < 0 ||
        arrow.y > canvas.height
    ) {
        gameState.enemyArrow = null;
    }
}

export function drawEnemyArrow() {

    const arrow = gameState.enemyArrow;

    if (arrow === null) {
        return;
    }

    ctx.save();

    // Move to arrow position
    ctx.translate(
        arrow.x,
        arrow.y
    );

    // Rotate according to direction
    ctx.rotate(arrow.angle);

    // =========================
    // SHAFT
    // =========================

    ctx.fillStyle = "#8B5A2B";

    ctx.fillRect(
        -30,
        -2,
        60,
        4
    );


    // =========================
    // ARROW HEAD
    // =========================

    ctx.beginPath();

    ctx.moveTo(30, 0);
    ctx.lineTo(20, -7);
    ctx.lineTo(20, 7);

    ctx.closePath();

    ctx.fillStyle = "#C0C0C0";
    ctx.fill();


    // =========================
    // FEATHERS
    // =========================

    ctx.fillStyle = "#D8D8D8";

    ctx.fillRect(
        -30,
        -5,
        10,
        3
    );

    ctx.fillRect(
        -30,
        2,
        10,
        3
    );


    ctx.restore();
}