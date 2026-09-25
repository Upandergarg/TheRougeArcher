import { canvas, ctx } from "./canvas.js";
import { gameState } from "./gameState.js";
import { hero, damageHero } from "./hero.js";
import { enemy, spawnEnemy } from "./enemy.js";
import { saveGameData } from "./storage.js";
import { pickups } from "./pickups.js";
// =========================
// COLLISION HELPER
// =========================

export function isColliding(a, b) {

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}


// =========================
// ENEMY HITBOXES
// =========================

export function getEnemyHitboxes() {

    const head = {
        x: enemy.x + 15,
        y: enemy.y,

        width: 50,
        height: 30
    };

    const body = {
        x: enemy.x,
        y: enemy.y + 30,

        width: enemy.width,
        height: enemy.height - 30
    };

    return {
        head,
        body
    };
}


// =========================
// DEBUG HITBOXES
// =========================

export function drawHitboxes() {

    const hitboxes = getEnemyHitboxes();

    // Head
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        hitboxes.head.x,
        hitboxes.head.y,
        hitboxes.head.width,
        hitboxes.head.height
    );

    // Body
    ctx.strokeStyle = "orange";

    ctx.strokeRect(
        hitboxes.body.x,
        hitboxes.body.y,
        hitboxes.body.width,
        hitboxes.body.height
    );
}


// =========================
// PLAYER ARROW → ENEMY
// =========================

export function checkPlayerArrowCollision() {

    const arrow = gameState.arrow;

    if (arrow === null) {
        return;
    }

    const hitboxes = getEnemyHitboxes();

    // Headshot
    if (isColliding(arrow, hitboxes.head)) {

        console.log("HEADSHOT!");
gameState.hits++;
        enemy.health = 0;
        gameState.arrow = null;

    }

    // Body hit
    else if (isColliding(arrow, hitboxes.body)) {
gameState.hits++;
        enemy.health -= 25;

        console.log(
            "BODY HIT! Enemy health:",
            enemy.health
        );

        gameState.arrow = null;
    }

if (enemy.health <= 0) {

    gameState.score += 100;
    gameState.kills += 1;

    gameState.coins += 10;

    localStorage.setItem("coins", gameState.coins);

    saveGameData();

    setTimeout(() => {
        spawnEnemy();
    }, 50);
}
}



// =========================
// ENEMY ARROW → HERO
// =========================

export function checkEnemyArrowCollision() {

    const arrow = gameState.enemyArrow;

    if (arrow === null) {
        return;
    }

    if (isColliding(arrow, hero)) {

        damageHero(10);

        gameState.enemyArrow = null;
    }
}

export function checkPickupCollision() {

    // No player arrow → nothing to check
    if (!gameState.arrow) {
        return;
    }


    // -------------------------
    // HEALTH PICKUP
    // -------------------------

    if (
        pickups.health &&
        isColliding(gameState.arrow, pickups.health)
    ) {

        hero.health = 100 ;

        if (hero.health > 100) {
            hero.health = 100;
        }

        pickups.health = null;

        gameState.arrow = null;

        console.log("Health pickup collected!");

        return;
    }


    // -------------------------
    // ARROW PICKUP
    // -------------------------

    if (
        pickups.arrows &&
        isColliding(gameState.arrow, pickups.arrows)
    ) {

        hero.arrows += 20;

        pickups.arrows = null;

        gameState.arrow = null;

        console.log("Arrow pickup collected!");

    }

}