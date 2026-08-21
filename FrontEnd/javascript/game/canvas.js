// =========================
// CANVAS SETUP
// =========================

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

const gameArea = document.querySelector(".game-area");

canvas.width = gameArea.clientWidth;
canvas.height = gameArea.clientHeight;
