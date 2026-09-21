import { gameState } from "./gameState.js";

export function saveGameData() {

    // Persistent stats
    localStorage.setItem(
        "shots",
        gameState.shots
    );

    localStorage.setItem(
        "hits",
        gameState.hits
    );


    // Highest score
    const oldHighestScore =
        Number(localStorage.getItem("highestScore")) || 0;

    if (gameState.score > oldHighestScore) {

        localStorage.setItem(
            "highestScore",
            gameState.score
        );

    }


    // Total games played
    const totalPlayed =
        Number(localStorage.getItem("totalPlayed")) || 0;

    localStorage.setItem(
        "totalPlayed",
        totalPlayed
    );
}


export function loadGameData() {

    // Coins are permanent
    gameState.coins =
        Number(localStorage.getItem("coins")) || 0;

    // Shots and hits are permanent
    gameState.shots =
        Number(localStorage.getItem("shots")) || 0;

    gameState.hits =
        Number(localStorage.getItem("hits")) || 0;

}