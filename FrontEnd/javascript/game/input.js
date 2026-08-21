import { canvas } from "./canvas.js";
import { gameState } from "./gameState.js";
import { hero } from "./hero.js";
import { createArrow } from "./arrows.js";

// =========================
// MOUSE / AIMING
// =========================

canvas.addEventListener("mousemove", function(event) {

    const rect = canvas.getBoundingClientRect();

    gameState.mouseX =
        event.clientX - rect.left;

    gameState.mouseY =
        event.clientY - rect.top;
});


canvas.addEventListener("mousedown", function() {

    if (gameState.gameOver) {
        return;
    }

    gameState.isAiming = true;
});


canvas.addEventListener("mouseup", function() {

    if (
        gameState.isAiming &&
        !gameState.gameOver
    ) {
        createArrow();
    }

    gameState.isAiming = false;
});


export function updateAim() {

    if (!gameState.isAiming) {
        return;
    }

    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    hero.angle = Math.atan2(
        gameState.mouseY - heroCenterY,
        gameState.mouseX - heroCenterX
    );
}
