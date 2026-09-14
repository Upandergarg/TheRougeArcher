import { canvas, ctx } from "./canvas.js";

export const pickups = {
    health: null,
    arrows: null
};


export function spawnHealthPickup() {

    pickups.health = {
        x: Math.random() * (canvas.width - 40),
        y: Math.random() * (canvas.height - 40),
        width: 30,
        height: 30
    };

}


export function spawnArrowPickup() {

    pickups.arrows = {
        x: Math.random() * (canvas.width - 40),
        y: Math.random() * (canvas.height - 40),
        width: 30,
        height: 30
    };

}


export function drawPickups() {

    if (pickups.health) {

        ctx.fillStyle = "red";

        ctx.fillRect(
            pickups.health.x,
            pickups.health.y,
            pickups.health.width,
            pickups.health.height
        );

    }


    if (pickups.arrows) {

        ctx.fillStyle = "yellow";

        ctx.fillRect(
            pickups.arrows.x,
            pickups.arrows.y,
            pickups.arrows.width,
            pickups.arrows.height
        );

    }

}