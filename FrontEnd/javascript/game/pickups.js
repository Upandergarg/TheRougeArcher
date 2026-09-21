import { canvas, ctx } from "./canvas.js";
import { hero } from "./hero.js";
import { enemy } from "./enemy.js";
export const pickups = {
    health: null,
    arrows: null
};


// =========================
// PICKUP SAFE AREA
// =========================

const pickupArea = {
    minX: canvas.width * 0.35,
    maxX: canvas.width * 0.65,

    minY: canvas.height * 0.20,
    maxY: canvas.height * 0.80
};


// =========================
// RANDOM POSITION
// =========================

function getRandomPosition() {

    let position;

    let safe = false;

    while (!safe) {

        position = {
            x:
                pickupArea.minX +
                Math.random() *
                (pickupArea.maxX - pickupArea.minX),

            y:
                pickupArea.minY +
                Math.random() *
                (pickupArea.maxY - pickupArea.minY)
        };


        const pickup = {
            x: position.x,
            y: position.y,
            width: 30,
            height: 30
        };


        const overlapsHero =
            pickup.x < hero.x + hero.width &&
            pickup.x + pickup.width > hero.x &&
            pickup.y < hero.y + hero.height &&
            pickup.y + pickup.height > hero.y;


        const overlapsEnemy =
            pickup.x < enemy.x + enemy.width &&
            pickup.x + pickup.width > enemy.x &&
            pickup.y < enemy.y + enemy.height &&
            pickup.y + pickup.height > enemy.y;


        if (!overlapsHero && !overlapsEnemy) {
            safe = true;
        }
    }

    return position;
}


// =========================
// HEALTH PICKUP
// =========================

export function spawnHealthPickup() {

    const position = getRandomPosition();

    pickups.health = {

        x: position.x,
        y: position.y,

        width: 30,
        height: 30

    };

}


// =========================
// ARROW PICKUP
// =========================

export function spawnArrowPickup() {

    const position = getRandomPosition();

    pickups.arrows = {

        x: position.x,
        y: position.y,

        width: 30,
        height: 30

    };

}


// =========================
// DRAW PICKUPS
// =========================

export function drawPickups() {

    // =========================
    // HEALTH PICKUP
    // =========================

    if (pickups.health) {

        const x = pickups.health.x;
        const y = pickups.health.y;

        // Glow
        ctx.shadowColor = "red";
        ctx.shadowBlur = 15;

        // Apple body
        ctx.fillStyle = "#c0392b";

        ctx.beginPath();
        ctx.arc(x + 15, y + 17, 12, 0, Math.PI * 2);
        ctx.fill();

        // Apple stem
        ctx.shadowBlur = 0;

        ctx.strokeStyle = "#4a281b";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(x + 15, y + 6);
        ctx.lineTo(x + 17, y);
        ctx.stroke();

        // Leaf
        ctx.fillStyle = "#4caf50";

        ctx.beginPath();
        ctx.ellipse(
            x + 21,
            y + 5,
            6,
            3,
            -0.5,
            0,
            Math.PI * 2
        );
        ctx.fill();

    }


    // =========================
    // ARROW PICKUP
    // =========================

    if (pickups.arrows) {

        const x = pickups.arrows.x;
        const y = pickups.arrows.y;

        // Glow
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 15;

        // Arrow shaft
        ctx.strokeStyle = "#d7b56b";
        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(x + 5, y + 25);
        ctx.lineTo(x + 25, y + 5);

        ctx.stroke();

        // Arrow head
        ctx.fillStyle = "#f0d38d";

        ctx.beginPath();

        ctx.moveTo(x + 25, y + 5);
        ctx.lineTo(x + 16, y + 7);
        ctx.lineTo(x + 23, y + 14);

        ctx.closePath();
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
    }
}