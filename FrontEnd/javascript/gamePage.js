const enemyTop = document.querySelector(".enemy-top");
const enemyBottom = document.querySelector(".enemy-bottom");

const randomPosition = Math.random();

if (randomPosition < 0.5) {
    enemyTop.style.display = "flex";
    enemyBottom.style.display = "none";
} else {
    enemyTop.style.display = "none";
    enemyBottom.style.display = "flex";
}