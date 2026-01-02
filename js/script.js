// global
let isTyping = false;
let typingInterval = null;

// typewriter
function typeWriter(element, text, speed = 30) {
    isTyping = true;
    element.textContent = "";

    let index = 0;

    typingInterval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index >= text.length) {
            clearInterval(typingInterval);
            isTyping = false;
        }
    }, speed);
}

const bubbleText0 = document.getElementById("bubble-0");
const bubbleText1 = document.getElementById("bubble-1");

const text0 = bubbleText0.textContent;
const text1 = bubbleText1.textContent;

// game start and audio begin
const startOverlay = document.getElementById("start");
const bgMusic = document.getElementById("backsound");
const openSign = document.getElementById("open");

function startGame() {
    bgMusic.play().catch(() => {});
    openSign.classList.remove("hidden");
    openSign.classList.add("float");
    startOverlay.remove();
}

startOverlay.addEventListener("pointerdown", startGame, { once: true });

// sounds
const soundBtn = document.getElementById("sound");
const clickSound = new Audio("assets/sounds/click.mp3");
const steamHissing = new Audio("assets/sounds/steam.mp3");

let isMuted = false;

soundBtn.addEventListener("pointerdown", () => {
    isMuted = !isMuted;

    if (isMuted) {
        bgMusic.muted = true;
        soundBtn.src = "assets/images/sound-off.png";

        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    } else {
        bgMusic.muted = false;
        bgMusic.play().catch(() => {});
        soundBtn.src = "assets/images/sound-on.png";

        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});

cmachine.addEventListener("pointerdown", () => {
    steamHissing.currentTime = 0;
    steamHissing.play().catch(() => {});
});

// popup
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const tabletUi = document.getElementById("tabletui");

function openPopup(imageSrc) {
    popupImage.src = imageSrc;
    popup.classList.remove("hidden");

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

popup.addEventListener("pointerdown", (e) => {
    if (e.target === popup) {
        popup.classList.add("hidden");
        popupImage.src = "";

        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
});

document.getElementById("tab").addEventListener("click", () => {
    openPopup("");
    tabletUi.classList.remove("hidden");
});

// game start
const mC = document.getElementById("penguin");
const bubbleArea = document.getElementById("bubble");
const bellSound = new Audio("assets/sounds/bell.mp3");
const actionAlert = document.getElementById("action-alert");

openSign.addEventListener("pointerdown", () => {
    openSign.classList.add("hidden");
    mC.classList.remove("hidden");
    bubbleArea.classList.remove("hidden");

    bubbleText0.classList.remove("hidden");
    bubbleText1.classList.add("hidden");

    typeWriter(bubbleText0, text0);

    bellSound.currentTime = 0;
    bellSound.play().catch(() => {});
});

function continueGame() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (isTyping) {
        clearInterval(typingInterval);

        if (!bubbleText0.classList.contains("hidden")) {
            bubbleText0.textContent = text0;
        } else {
            bubbleText1.textContent = text1;
        }

        isTyping = false;
        return;
    }

    if (!bubbleText0.classList.contains("hidden")) {
        bubbleText0.classList.add("hidden");
        bubbleText1.classList.remove("hidden");
        typeWriter(bubbleText1, text1);
        return;
    }

    bubbleArea.classList.add("hidden");
    actionAlert.classList.remove("hidden");
}

mC.addEventListener("pointerdown", continueGame);
bubbleArea.addEventListener("pointerdown", continueGame);

// calculator
const menuData = {
  "coffee.png":   { name: "Coffee", price: 25000 },
  "frozen.png":   { name: "Frozen Drink", price: 30000 },
  "matcha.png":   { name: "Matcha", price: 28000 },
  "cheese.png":   { name: "Cheesecake", price: 35000 },
  "bread.png":    { name: "Bread", price: 15000 },
  "burger.png":   { name: "Burger", price: 40000 },
  "crepes.png":   { name: "Crepes", price: 27000 },
  "donut.png":    { name: "Donut", price: 18000 },
  "sbread.png":   { name: "Sweet Bread", price: 20000 }
};

const gridImages = document.querySelectorAll("#tablet-grid img");
const listContainer = document.getElementById("list-container");
const totalEl = document.querySelector(".total");
const submitBtn = document.getElementById("primary-b");

gridImages.forEach(img => {
  img.addEventListener("click", () => {
    const fileName = img.src.split("/").pop();
    const item = menuData[fileName];

    if (!item) return;

    addItem(item.name, item.price);
    updateTotal();
    updateSubmitState();
  });
});

function addItem(name, price) {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  listItem.innerHTML = `
    <div class="receipt">
      <p class="menuname">${name}</p>
      <button class="remove-btn">x</button>
    </div>
    <div>
      <p class="price">${formatPrice(price)}</p>
    </div>
  `;

  // remove item
  listItem.querySelector(".remove-btn").addEventListener("click", () => {
    listItem.remove();
    updateTotal();
    updateSubmitState();
  });

  listContainer.appendChild(listItem);
}

function updateTotal() {
  let total = 0;

  document.querySelectorAll(".list-item .price").forEach(priceEl => {
    const value = priceEl.textContent.replace(/\./g, "");
    total += Number(value);
  });

  totalEl.textContent = formatPrice(total);
}

function updateSubmitState() {
  submitBtn.disabled = listContainer.children.length === 0;
}

function formatPrice(number) {
  return number.toLocaleString("id-ID");
}

updateSubmitState();


// game logic
let hasOrdered = false;
let requiredOrder = {};

requiredOrder = {
  "Coffee": 1,
  "Cheesecake": 1
};

document.getElementById("primary-b").addEventListener("click", () => {
    const submittedOrder = {};

    document.querySelectorAll(".list-item .menuname").forEach(p => {
        const name = p.textContent;
        if (!submittedOrder[name]) submittedOrder[name] = 0;
        submittedOrder[name]++;
    });

    checkOrder(submittedOrder);
});

const bubbleMe = document.getElementById("bubble-me");

document.addEventListener("pointerdown", () => {
  bubbleMe.classList.add("hidden");
});

function checkOrder(submittedOrder) {
    if (!hasOrdered) {
        bubbleMe.classList.remove("hidden");
        popup.classList.add("hidden");
        bubbleMe.classList.add("shake");

        bubbleMe.addEventListener("animationend", () => {
        bubbleMe.classList.remove("shake");
        }, { once: true });
        return;
    }

    // Check if order matches exactly
    let correct = true;
    for (const item in requiredOrder) {
        if (submittedOrder[item] !== requiredOrder[item]) {
            correct = false;
            break;
        }
    }

    // Also check for extra items
    for (const item in submittedOrder) {
        if (!requiredOrder[item]) correct = false;
    }

    if (correct) {
        finishGame();
    } else {
        alert("MC repeats the order!");
        // Optional: clear the list
        listContainer.innerHTML = "";
        updateTotal();
    }
}

function finishGame() {
    alert("Order correct! Game finished.");
    // Hide tablet / show next scene
    popup.classList.add("hidden");
    tabletUi.classList.add("hidden");
    // Add any end-game logic here
}