import { gameState } from "./gameState.js";

export function saveGameData() {
    localStorage.setItem("score", gameState.score);
    localStorage.setItem("kills", gameState.kills);
    localStorage.setItem("coins", gameState.coins);
}

export function loadGameData() {
    gameState.score =
        Number(localStorage.getItem("score")) || 0;

    gameState.kills =
        Number(localStorage.getItem("kills")) || 0;

    gameState.coins =
        Number(localStorage.getItem("coins")) || 0;
}