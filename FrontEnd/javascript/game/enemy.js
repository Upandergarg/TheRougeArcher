import { canvas, ctx } from "./canvas.js";

// =========================
// ENEMY
// =========================

export const enemy = {
    x: canvas.width * 0.80,
    y: 0,

    width: 80,
    height: 120,

    health: 100
};


export function spawnEnemy() {

    enemy.health = 100;

    const position =
        Math.random() < 0.5
            ? "top"
            : "bottom";

    if (position === "top") {

        enemy.y = canvas.height * 0.20;

    } else {

        enemy.y =
            canvas.height * 0.80 - enemy.height;
    }

    enemy.x = canvas.width * 0.80;
}


export function drawEnemy() {

    if (enemy.health <= 0) {
        return;
    }

    ctx.fillStyle = "#8f3025";

    ctx.fillRect(
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
    );
}
