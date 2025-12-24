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

popup.addEventListener("pointerdown", () => {
    popup.classList.add("hidden");
    popupImage.src = "";

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
});

document.getElementById("tab").addEventListener("click", () => {
    openPopup("");
    tabletUi.classList.remove("hidden");
});

document.getElementById("info").addEventListener("click", () => {
    openPopup("assets/images/info-panel.png");
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
