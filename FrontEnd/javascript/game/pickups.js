import { canvas, ctx } from "./canvas.js";
import { hero } from "./hero.js";
import { enemy } from "./enemy.js";
export const pickups = {
    health: null,
    arrows: null
};

let pickupPulse = 0;
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

  // =========================
// HEALTH PICKUP ❤️
// =========================

if (pickups.health) {

    const x = pickups.health.x;
    const y = pickups.health.y;

    ctx.save();
    // PULSING ANIMATION
pickupPulse += 0.08;

const pulse = 1 + Math.sin(pickupPulse) * 0.12;
ctx.translate(x + 15, y + 15);
ctx.scale(pulse, pulse);
ctx.translate(-(x + 15), -(y + 15));

    ctx.fillStyle = "#d93636";

    ctx.beginPath();

    ctx.moveTo(x + 15, y + 26);

    ctx.bezierCurveTo(
        x + 5, y + 18,
        x, y + 12,
        x + 4, y + 7
    );

    ctx.bezierCurveTo(
        x + 7, y + 3,
        x + 13, y + 5,
        x + 15, y + 9
    );

    ctx.bezierCurveTo(
        x + 17, y + 5,
        x + 23, y + 3,
        x + 26, y + 7
    );

    ctx.bezierCurveTo(
        x + 30, y + 12,
        x + 25, y + 18,
        x + 15, y + 26
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();
}

    // =========================
    // ARROW PICKUP
    // =========================

   // =========================
// ARROW PICKUP 💛
// =========================

if (pickups.arrows) {

    const x = pickups.arrows.x;
    const y = pickups.arrows.y;

    ctx.save();

pickupPulse += 0.08;

const pulse = 1 + Math.sin(pickupPulse) * 0.12;
ctx.translate(x + 15, y + 15);
ctx.scale(pulse, pulse);
ctx.translate(-(x + 15), -(y + 15));

    // Golden / yellow color
    ctx.fillStyle = "#f4c542";

    ctx.beginPath();

    ctx.moveTo(x + 15, y + 26);

    ctx.bezierCurveTo(
        x + 5, y + 18,
        x, y + 12,
        x + 4, y + 7
    );

    ctx.bezierCurveTo(
        x + 7, y + 3,
        x + 13, y + 5,
        x + 15, y + 9
    );

    ctx.bezierCurveTo(
        x + 17, y + 5,
        x + 23, y + 3,
        x + 26, y + 7
    );

    ctx.bezierCurveTo(
        x + 30, y + 12,
        x + 25, y + 18,
        x + 15, y + 26
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();
}
}