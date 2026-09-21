const coinsElement = document.getElementById("coins");

const buyArrowsBtn = document.getElementById("buyArrowsBtn");
const buyBadgeBtn = document.getElementById("buyBadgeBtn");
const buyAvatarBtn = document.getElementById("buyAvatarBtn");

let coins = Number(localStorage.getItem("coins")) || 0;

coinsElement.textContent = coins;


// =========================
// BUY FUNCTION
// =========================

function buyItem(price, button, itemName) {

    if (coins < price) {
        alert("Not enough coins!");
        return false;
    }

    coins -= price;

    localStorage.setItem("coins", coins);

    coinsElement.textContent = coins;

    button.textContent = "BOUGHT";
    button.disabled = true;

    localStorage.setItem(itemName, "true");

    return true;
}

// =========================
// BUY ARROWS
// =========================

buyArrowsBtn.addEventListener("click", function() {

    const bought = buyItem(
        100,
        buyArrowsBtn,
        "royalArrows"
    );

    if (bought) {
        localStorage.setItem("startingArrows", 20);
    }

});

// =========================
// BUY BADGE
// =========================

buyBadgeBtn.addEventListener("click", function() {

    buyItem(
        300,
        buyBadgeBtn,
        "rogueBadge"
    );

});


// =========================
// BUY AVATAR
// =========================

buyAvatarBtn.addEventListener("click", function() {

    buyItem(
        200,
        buyAvatarBtn,
        "rogueAvatar"
    );

});


// =========================
// LOAD PURCHASES
// =========================

if (localStorage.getItem("royalArrows") === "true") {

    buyArrowsBtn.textContent = "BOUGHT";
    buyArrowsBtn.disabled = true;

}

if (localStorage.getItem("rogueBadge") === "true") {

    buyBadgeBtn.textContent = "BOUGHT";
    buyBadgeBtn.disabled = true;

}

if (localStorage.getItem("rogueAvatar") === "true") {

    buyAvatarBtn.textContent = "BOUGHT";
    buyAvatarBtn.disabled = true;

}


// =========================
// BACK BUTTON
// =========================

document.getElementById("backBtn").addEventListener("click", function() {

    window.location.href = "../index.html";

});