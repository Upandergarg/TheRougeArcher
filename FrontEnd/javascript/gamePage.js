// =========================
// CANVAS SETUP
// =========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameArea = document.querySelector(".game-area");

canvas.width = gameArea.clientWidth;
canvas.height = gameArea.clientHeight;


// =========================
// GAME VARIABLES
// =========================

let mouseX = 0;
let mouseY = 0;

let arrow = null;
let enemyArrow = null;

let isAiming = false;

let enemyShootTimer = 0;
let gameOver = false;
const restartBtn = document.getElementById("restartBtn");
const exitBtn = document.getElementById("exitBtn");
exitBtn.addEventListener("click", function() {

    window.location.href = "../html/index.html";

});
// =========================
// HERO
// =========================

const hero = {
    x: canvas.width * 0.15,
    y: canvas.height * 0.5 - 120 / 2,

    width: 80,
    height: 120,

    health: 100,
    arrows: 10,

    angle: 0
};


function drawHero() {

    ctx.fillStyle = "#c79b55";

    ctx.fillRect(
        hero.x,
        hero.y,
        hero.width,
        hero.height
    );
}


// =========================
// ENEMY
// =========================

const enemy = {
    x: canvas.width * 0.80,
    y: 0,

    width: 80,
    height: 120,

    health: 100
};


function spawnEnemy() {

    enemy.health = 100;

    const enemyPosition =
        Math.random() < 0.5 ? "top" : "bottom";

    if (enemyPosition === "top") {

        enemy.y = canvas.height * 0.20;

    } else {

        enemy.y =
            canvas.height * 0.80 - enemy.height;
    }

    enemy.x = canvas.width * 0.80;
}


function drawEnemy() {

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


// Set initial enemy position
spawnEnemy();


// =========================
// MOUSE / AIMING
// =========================

canvas.addEventListener("mousemove", function(event) {

    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

});


canvas.addEventListener("mousedown", function() {

    isAiming = true;

});


canvas.addEventListener("mouseup", function() {

    if (isAiming) {

        createArrow();

    }

    isAiming = false;

});


// =========================
// UPDATE
// =========================

function update() {

    if (gameOver) {
        return;
    }
    // -------------------------
    // AIMING
    // -------------------------

    if (isAiming) {

        const heroCenterX =
            hero.x + hero.width / 2;

        const heroCenterY =
            hero.y + hero.height / 2;

        hero.angle = Math.atan2(
            mouseY - heroCenterY,
            mouseX - heroCenterX
        );
    }


    // -------------------------
    // PLAYER ARROW
    // -------------------------

    if (arrow !== null) {

        arrow.x += arrow.velocityX;

        arrow.y += arrow.velocityY;

        // Gravity
        arrow.velocityY += 0.1;

        checkCollision();
    }


    // -------------------------
    // ENEMY SHOOTING
    // -------------------------

enemyShootTimer++;

if (enemyShootTimer >= 120 && enemyArrow === null && enemy.health > 0) {

    createEnemyArrow();

    enemyShootTimer = 0;
}

    // -------------------------
    // ENEMY ARROW
    // -------------------------

if (enemyArrow !== null) {

    enemyArrow.x += enemyArrow.velocityX;
    enemyArrow.y += enemyArrow.velocityY;

    checkEnemyArrowCollision();

    if (
        enemyArrow !== null &&
        (
            enemyArrow.x < 0 ||
            enemyArrow.x > canvas.width ||
            enemyArrow.y < 0 ||
            enemyArrow.y > canvas.height
        )
    ) {
        enemyArrow = null;
    }
}
}


// =========================
// DRAW
// =========================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawHero();

    drawEnemy();

    drawHitboxes();

    drawAimLine();

    drawArrow();

    drawEnemyArrow();

}


// =========================
// AIM LINE
// =========================

function drawAimLine() {

    if (!isAiming) {
        return;
    }

    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    const length = 120;

    const endX =
        heroCenterX +
        Math.cos(hero.angle) * length;

    const endY =
        heroCenterY +
        Math.sin(hero.angle) * length;

    ctx.beginPath();

    ctx.moveTo(
        heroCenterX,
        heroCenterY
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.strokeStyle = "#d0ae70";

    ctx.lineWidth = 3;

    ctx.stroke();

}


// =========================
// PLAYER ARROW
// =========================

function createArrow() {

    const heroCenterX =
        hero.x + hero.width / 2;

    const heroCenterY =
        hero.y + hero.height / 2;

    arrow = {

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


function drawArrow() {

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

function createEnemyArrow() {

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

    enemyArrow = {

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


function drawEnemyArrow() {

    if (enemyArrow === null) {
        return;
    }

    ctx.save();

    ctx.translate(
        enemyArrow.x,
        enemyArrow.y
    );

    ctx.rotate(enemyArrow.angle);

    ctx.fillStyle = "#8f3025";

    ctx.fillRect(
        0,
        -2,
        enemyArrow.width,
        enemyArrow.height
    );

    ctx.restore();

}


// =========================
// ENEMY HITBOXES
// =========================

function getEnemyHitboxes() {

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
        head: head,
        body: body
    };

}


// =========================
// DRAW HITBOXES
// =========================

function drawHitboxes() {

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
// COLLISION HELPER
// =========================

function isColliding(a, b) {

    return (

        a.x < b.x + b.width &&

        a.x + a.width > b.x &&

        a.y < b.y + b.height &&

        a.y + a.height > b.y

    );

}


// =========================
// PLAYER → ENEMY COLLISION
// =========================

function checkCollision() {

    if (arrow === null) {
        return;
    }

    const hitboxes =
        getEnemyHitboxes();


    // HEADSHOT

    if (isColliding(
        arrow,
        hitboxes.head
    )) {

        console.log("HEADSHOT!");

        enemy.health = 0;

        arrow = null;

    }


    // BODY HIT

    else if (isColliding(
        arrow,
        hitboxes.body
    )) {

        enemy.health -= 25;

        console.log(
            "BODY HIT! Enemy health:",
            enemy.health
        );

        arrow = null;

    }


    // ENEMY DEAD

    if (enemy.health <= 0) {

        console.log("ENEMY DEAD!");

        spawnEnemy();

    }

}


// =========================
// HERO DAMAGE
// =========================

function damageHero(amount) {

    hero.health -= amount;

    console.log(
        "Hero health:",
        hero.health
    );


    if (hero.health <= 0) {

        hero.health = 0;

        console.log("PLAYER DEAD!");

    }

}


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}
function checkEnemyArrowCollision() {

    if (enemyArrow === null) {
        return;
    }

    if (isColliding(enemyArrow, hero)) {

        damageHero(20);

        enemyArrow = null;
    }
}
function damageHero(amount) {

    hero.health -= amount;

    console.log("Hero health:", hero.health);

    if (hero.health <= 0) {

        hero.health = 0;

        gameOver = true;

        document.getElementById("gameOverMenu").style.display = "block";

        console.log("PLAYER DEAD!");
    }
}
if (gameOver) {

    ctx.fillStyle = "#d7b56b";

    ctx.font = "40px MedievalSharp";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2
    );
}
function restartGame() {

    hero.health = 100;
    hero.arrows = 10;

    enemy.health = 100;

    arrow = null;
    enemyArrow = null;

    enemyShootTimer = 0;

    gameOver = false;

    spawnEnemy();

    document.getElementById("gameOverMenu").style.display = "none";
}
restartBtn.addEventListener("click", function() {

    restartGame();

});
gameLoop();