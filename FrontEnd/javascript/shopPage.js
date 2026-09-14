const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", function () {
    window.location.href = "../index.html";
});


const coinsElement = document.getElementById("coins");

let coins = Number(localStorage.getItem("coins")) || 0;

coinsElement.textContent = coins;


// Royal Arrows
document.getElementById("buyArrowsBtn").addEventListener("click", function() {

    if (coins >= 100) {

        coins -= 100;

        localStorage.setItem("coins", coins);

        coinsElement.textContent = coins;

        alert("Royal Arrows purchased!");

    } else {

        alert("Not enough coins!");

    }

});


