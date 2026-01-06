// Copyright © 2026 Della M. K.
// All rights reserved. See LICENSE file.

// global
let isTyping = false;
let typingInterval = null;

// typewriter
function typeWriter(element, text) {
    if (!element || !text) return;

    clearInterval(typingInterval);
    element.textContent = "";
    let index = 0;
    isTyping = true;

    typingInterval = setInterval(() => {
        if (index >= text.length) {
            clearInterval(typingInterval);
            isTyping = false;
            return;
        }

        element.textContent += text[index];
        index++;
    }, 18);
}

const bubbleText0 = document.getElementById("bubble-0");
const bubbleText1 = document.getElementById("bubble-1");
const bubbleConfirm = document.getElementById("bubble-confirm");

const text0 = bubbleText0.textContent;
const text1 = bubbleText1.textContent;
const textconfirm = bubbleConfirm.textContent;

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

const soundBtn = document.getElementById("sound");

startOverlay.addEventListener("click", startGame, { once: true });

// sounds
const clickSound = new Audio("assets/sounds/click.mp3");
const steamHissing = new Audio("assets/sounds/steam.mp3");
const kaching = new Audio("assets/sounds/money.mp3");
const wrong = new Audio("assets/sounds/wrong.mp3");
const click2 = new Audio("assets/sounds/click2.mp3");
const deleteSound = new Audio("assets/sounds/delete.mp3");
const clickpop = new Audio("assets/sounds/clickpop.mp3");

let isMuted = false;

soundBtn.addEventListener("pointerdown", () => {
    isMuted = !isMuted;

    if (isMuted) {
        bgMusic.volume = 0;
        soundBtn.src = "assets/images/sound-off.png";
    } else {
        bgMusic.volume = 1;
        bgMusic.play().catch(() => {});
        soundBtn.src = "assets/images/sound-on.png";
    }

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
});

cmachine.addEventListener("pointerdown", () => {
    steamHissing.currentTime = 0;
    steamHissing.play().catch(() => {});
});

// popup
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");

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
    }
});

document.getElementById("tab").addEventListener("click", () => {
    openPopup("");
});

// credit popup
const creditpopup = document.getElementById("credit");
const infobtn = document.getElementById("info");

infobtn.addEventListener("pointerdown", (e) => {
    creditpopup.classList.remove("hidden");

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
});

creditpopup.addEventListener("pointerdown", (e) => {
    if (e.target === creditpopup) {
        creditpopup.classList.add("hidden");
    }
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
    bubbleConfirm.classList.add("hidden");
    actionAlert.classList.add("hidden");

    listContainer.innerHTML = "";
    updateTotal();

    delete mC.dataset.readyForConfirm;

    typeWriter(bubbleText0, text0);

    bellSound.currentTime = 0;
    bellSound.play().catch(() => {});
});

function finishTypingInstantly() {
    clearInterval(typingInterval);
    isTyping = false;

    if (!bubbleText0.classList.contains("hidden")) {
        bubbleText0.textContent = text0;
    } else if (!bubbleText1.classList.contains("hidden")) {
        bubbleText1.textContent = text1;
    } else if (!bubbleConfirm.classList.contains("hidden")) {
        bubbleConfirm.textContent = textconfirm;
    }
}

function continueGame() {
    const bubbleWrong = document.getElementById("bubble-wrong");
    if (!bubbleWrong.classList.contains("hidden")) {
        bubbleWrong.classList.add("hidden");
        bubbleArea.classList.add("hidden");
    }

    clickpop.currentTime = 0;
    clickpop.play().catch(() => {});

    if (isTyping) {
        finishTypingInstantly();
        return;
    }

    if (!bubbleText0.classList.contains("hidden")) {
        bubbleText0.classList.add("hidden");
        bubbleText1.classList.remove("hidden");
        typeWriter(bubbleText1, text1);

        hasOrdered = true;
        return;
    }

    if (!bubbleText1.classList.contains("hidden")) {
        bubbleText1.classList.add("hidden");
        bubbleArea.classList.add("hidden");
        actionAlert.classList.remove("hidden");

        mC.dataset.readyForConfirm = "true";
        return;
    }

    if (!bubbleConfirm.classList.contains("hidden")) {
        bubbleConfirm.classList.add("hidden");
        bubbleArea.classList.add("hidden");
        actionAlert.classList.remove("hidden");
        return;
    }
}

bubbleArea.addEventListener("pointerdown", continueGame);

mC.addEventListener("pointerdown", () => {
    const bubbleWrong = document.getElementById("bubble-wrong");
    if (!bubbleWrong.classList.contains("hidden")) {
        bubbleWrong.classList.add("hidden");
        bubbleArea.classList.add("hidden");
        return;
    }

    clickpop.currentTime = 0;
    clickpop.play().catch(() => {});

    if (isTyping) {
        finishTypingInstantly();
        return;
    }

    if (!bubbleConfirm.classList.contains("hidden")) {
        bubbleConfirm.classList.add("hidden");
        bubbleArea.classList.add("hidden");
        actionAlert.classList.remove("hidden");
        return;
    }

    if (!bubbleText0.classList.contains("hidden")) {
        bubbleText0.classList.add("hidden");
        bubbleText1.classList.remove("hidden");
        typeWriter(bubbleText1, text1);

        hasOrdered = true;
        return;
    }

    if (!bubbleText1.classList.contains("hidden")) {
        bubbleText1.classList.add("hidden");
        bubbleArea.classList.add("hidden");
        actionAlert.classList.remove("hidden");

        mC.dataset.readyForConfirm = "true";
        return;
    }

    if (
        bubbleArea.classList.contains("hidden") &&
        mC.dataset.readyForConfirm === "true"
    ) {
        bubbleArea.classList.remove("hidden");
        bubbleConfirm.classList.remove("hidden");
        typeWriter(bubbleConfirm, textconfirm);

        mC.classList.add("shake");
        mC.addEventListener("animationend", () => {
            mC.classList.remove("shake");
        }, { once: true });
        return;
    }
});

// calculator
const menuData = {
  "coffee.png":   { name: "Sweet Japanese Iced Coffee", price: 55000 },
  "frozen.png":   { name: "-86° Coffee Latte", price: 30000 },
  "matcha.png":   { name: "Matcha Cream Latte", price: 60000 },
  "cheese.png":   { name: "Truffle Cheesecake", price: 58000 },
  "bread.png":    { name: "Garlic Salt Bread", price: 37000 },
  "burger.png":   { name: "Classic Cheese Burger", price: 75000 },
  "crepes.png":   { name: "Tiramisu Chessetart", price: 55000 },
  "donut.png":    { name: "Double Matcha Donut", price: 35000 },
  "sbread.png":   { name: "Salt Bread Truffle Egg", price: 37000 }
};

const gridImages = document.querySelectorAll("#tablet-grid img");
const listContainer = document.getElementById("list-container");
const totalEl = document.querySelector(".total");
const submitBtn = document.getElementById("primary-b");

gridImages.forEach(img => {
  img.addEventListener("click", () => {
    const fileName = img.src.split("/").pop();
    const item = menuData[fileName];

    click2.currentTime = 0;
    click2.play().catch(() => {});

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

    deleteSound.currentTime = 0;
    deleteSound.play().catch(() => {});
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
  "Sweet Japanese Iced Coffee": 1,
  "Truffle Cheesecake": 1
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

function checkOrder(submittedOrder) {
    if (!hasOrdered) {
        bubbleMe.classList.remove("hidden");
        popup.classList.add("hidden");
        bubbleMe.classList.add("shake");
        bubbleMe.addEventListener("animationend", () => {
            bubbleMe.classList.remove("shake");
        }, { once: true });

        wrong.currentTime = 0;
        wrong.play().catch(() => {});
        return;
    }

    let correct = true;
    for (const item in requiredOrder) {
        if (submittedOrder[item] !== requiredOrder[item]) correct = false;
    }
    for (const item in submittedOrder) {
        if (!requiredOrder[item]) correct = false;
    }

    if (correct) {
        finishGame();
    } else {
        const bubbleWrong = document.getElementById("bubble-wrong");
        popup.classList.add("hidden");
        bubbleArea.classList.remove("hidden");
        bubbleWrong.classList.remove("hidden");

        bubbleText1.classList.add("hidden");
        bubbleConfirm.classList.add("hidden");

        bubbleWrong.classList.add("shake");
        bubbleWrong.addEventListener("animationend", () => {
            bubbleWrong.classList.remove("shake");
        }, { once: true });

        wrong.currentTime = 0;
        wrong.play().catch(() => {});

        listContainer.innerHTML = "";
        updateTotal();
    }
}

document.addEventListener("pointerdown", () => {
  bubbleMe.classList.add("hidden");
});

const orderShown = document.getElementById("order");
const bubbleEnd = document.getElementById("bubble-end");

function finishGame() {
    bubbleArea.classList.remove("hidden");
    bubbleText1.classList.add("hidden");
    bubbleEnd.classList.remove("hidden");
    bubbleConfirm.classList.add("hidden");
    orderShown.classList.remove("hidden");
    actionAlert.classList.add("hidden");
    const bubbleWrong = document.getElementById("bubble-wrong");
    bubbleWrong.classList.add("hidden");
    popup.classList.add("hidden");

    kaching.currentTime = 0;
    kaching.play().catch(() => {});

    const resetHandler = () => {
        bubbleText0.classList.add("hidden");
        bubbleText1.classList.add("hidden");
        bubbleConfirm.classList.add("hidden");
        bubbleEnd.classList.add("hidden");
        bubbleMe.classList.add("hidden");
        orderShown.classList.add("hidden");
        const bubbleWrong = document.getElementById("bubble-wrong");
        bubbleWrong.classList.add("hidden");

        mC.classList.add("hidden");
        delete mC.dataset.readyForConfirm;

        hasOrdered = false;

        listContainer.innerHTML = "";
        totalEl.textContent = "0";

        bubbleArea.classList.add("hidden");
        openSign.classList.remove("hidden");

        document.removeEventListener("pointerdown", resetHandler);
    };

    document.addEventListener("pointerdown", resetHandler, { once: true });
  }