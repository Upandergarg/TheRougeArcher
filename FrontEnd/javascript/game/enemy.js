import { canvas, ctx } from "./canvas.js";

// =========================
// ENEMY
// =========================

export const enemy = {
    x: canvas.width * 0.80,
    y: 0,

    width: 80,
    height: 120,

    health: 100,
    accuracy: 0.3
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

    const x = enemy.x;
    const y = enemy.y;

    // =========================
    // 2X VISUAL SCALE
    // =========================

    const centerX = x + enemy.width / 2;
    const centerY = y + enemy.height / 2;

    ctx.save();

    ctx.translate(centerX, centerY);
    ctx.scale(2, 2);
    ctx.translate(-centerX, -centerY);


    // =========================
    // LEGS
    // =========================

    ctx.fillStyle = "#29151a";

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

    ctx.fillStyle = "#100d10";

    ctx.fillRect(
        x + 14,
        y + 114,
        23,
        7
    );

    ctx.fillRect(
        x + 43,
        y + 114,
        23,
        7
    );


    // =========================
    // BODY ARMOR
    // =========================

    ctx.fillStyle = "#b52f35";

    ctx.fillRect(
        x + 17,
        y + 43,
        46,
        50
    );


    // Bright armor center

    ctx.fillStyle = "#d43b3f";

    ctx.fillRect(
        x + 25,
        y + 45,
        30,
        27
    );


    // Dark chest plate

    ctx.fillStyle = "#721d2b";

    ctx.fillRect(
        x + 31,
        y + 47,
        18,
        24
    );


    // =========================
    // ARMOR HIGHLIGHT
    // =========================

    ctx.fillStyle = "#ef5b45";

    ctx.fillRect(
        x + 27,
        y + 47,
        4,
        20
    );


    // =========================
    // GOLD BELT
    // =========================

    ctx.fillStyle = "#d99b2b";

    ctx.fillRect(
        x + 17,
        y + 72,
        46,
        6
    );


    // Belt buckle

    ctx.fillStyle = "#ffd45a";

    ctx.fillRect(
        x + 35,
        y + 71,
        10,
        8
    );


    // =========================
    // HEAD
    // =========================

    ctx.fillStyle = "#c98562";

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
    // RED HOOD
    // =========================

    ctx.fillStyle = "#641522";

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


    // Hood highlight

    ctx.fillStyle = "#a92532";

    ctx.fillRect(
        x + 22,
        y + 28,
        36,
        4
    );


    // =========================
    // FACE SHADOW
    // =========================

    ctx.fillStyle = "#32151b";

    ctx.fillRect(
        x + 25,
        y + 35,
        30,
        8
    );


    // =========================
    // GLOWING EYES
    // =========================

    ctx.fillStyle = "#ffcf3f";

    ctx.fillRect(
        x + 29,
        y + 37,
        6,
        3
    );

    ctx.fillRect(
        x + 45,
        y + 37,
        6,
        3
    );


    // =========================
    // LEFT ARM
    // =========================

    ctx.fillStyle = "#8f2430";

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
    // SHOULDER ARMOR
    // =========================

    ctx.fillStyle = "#d13a3f";

    ctx.fillRect(
        x + 5,
        y + 47,
        15,
        10
    );

    ctx.fillRect(
        x + 60,
        y + 47,
        15,
        10
    );


    // Gold shoulder detail

    ctx.fillStyle = "#e9ad32";

    ctx.fillRect(
        x + 7,
        y + 48,
        11,
        3
    );

    ctx.fillRect(
        x + 62,
        y + 48,
        11,
        3
    );


    // =========================
    // BOW
    // =========================

    ctx.strokeStyle = "#e09a2d";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.arc(
        x + 10,
        y + 65,
        25,
        Math.PI / 2,
        Math.PI * 1.5
    );

    ctx.stroke();


    // Bow highlight

    ctx.strokeStyle = "#ffd45a";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        x + 10,
        y + 65,
        25,
        Math.PI / 2,
        Math.PI * 1.5
    );

    ctx.stroke();


    // =========================
    // BOW STRING
    // =========================

    ctx.strokeStyle = "#f0d99a";
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        x + 10,
        y + 40
    );

    ctx.lineTo(
        x + 10,
        y + 90
    );

    ctx.stroke();


    ctx.restore();
}

// =========================
// ENEMY HEALTH BAR
// =========================

export function drawEnemyHealthBar() {

    if (enemy.health <= 0) return;

    const barWidth = 120;
    const barHeight = 10;

    const barX = enemy.x + enemy.width / 2 - barWidth / 2;
    const barY = enemy.y - 55;

    // BACKGROUND
    ctx.fillStyle = "#1a0d0d";
    ctx.fillRect(
        barX,
        barY,
        barWidth,
        barHeight
    );

    // HEALTH
    const healthWidth = (enemy.health / 100) * barWidth;

    ctx.fillStyle = "#b52f35";
    ctx.fillRect(
        barX,
        barY,
        healthWidth,
        barHeight
    );

    // BORDER
    ctx.strokeStyle = "#d99b32";
    ctx.lineWidth = 1;
    ctx.strokeRect(
        barX,
        barY,
        barWidth,
        barHeight
    );
}

export function moveEnemy() {
    const topY = 80;
    const bottomY = canvas.height - enemy.height - 80;

    if (enemy.y === topY) {
        enemy.y = bottomY;
    } else {
        enemy.y = topY;
    }
}
