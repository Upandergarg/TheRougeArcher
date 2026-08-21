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

    ctx.fillStyle = "#c79b55";

    ctx.fillRect(
        hero.x,
        hero.y,
        hero.width,
        hero.height
    );
}


export function damageHero(amount) {

    hero.health -= amount;

    console.log("Hero health:", hero.health);

    if (hero.health <= 0) {

        hero.health = 0;
        gameState.gameOver = true;

        const gameOverMenu =
            document.getElementById("gameOverMenu");

        if (gameOverMenu) {
            gameOverMenu.style.display = "block";
        }

        console.log("PLAYER DEAD!");
    }
}
