import { gameState } from "./gameState.js";

export function saveGameData() {

    localStorage.setItem(
        "score",
        gameState.score
    );

    localStorage.setItem(
        "kills",
        gameState.kills
    );

    
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

    let totalPlayed =
        Number(localStorage.getItem("totalPlayed")) || 0;

    localStorage.setItem(
        "totalPlayed",
        totalPlayed
    );
}


export function loadGameData() {

    gameState.score =
        Number(localStorage.getItem("score")) || 0;

    gameState.kills =
        Number(localStorage.getItem("kills")) || 0;

    gameState.coins =
        Number(localStorage.getItem("coins")) || 0;

    gameState.shots =
        Number(localStorage.getItem("shots")) || 0;

    gameState.hits =
        Number(localStorage.getItem("hits")) || 0;
}