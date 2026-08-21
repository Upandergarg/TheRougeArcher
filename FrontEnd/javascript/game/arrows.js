import { canvas, ctx } from "./canvas.js";
import { gameState } from "./gameState.js";
import { hero } from "./hero.js";
import { enemy } from "./enemy.js";

// =========================
// PLAYER ARROW
// =========================

export function createArrow() {

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
    arrow.velocityY += 0.1;
}


export function drawArrow() {

    const arrow = gameState.arrow;

    if (arrow === null) {
        return;
    }

    ctx.save();

    ctx.translate(
        arrow.x,
        arrow.y
    );

    ctx.rotate(arrow.angle);

    ctx.fillStyle = "#d7b56b";

    ctx.fillRect(
        0,
        -2,
        arrow.width,
        arrow.height
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

    const angle = Math.atan2(
        heroCenterY - enemyCenterY,
        heroCenterX - enemyCenterX
    );

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

    ctx.translate(
        arrow.x,
        arrow.y
    );

    ctx.rotate(arrow.angle);

    ctx.fillStyle = "#8f3025";

    ctx.fillRect(
        0,
        -2,
        arrow.width,
        arrow.height
    );

    ctx.restore();
}
