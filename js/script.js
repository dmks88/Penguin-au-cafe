// game start and audio begin
const startOverlay = document.getElementById("start");
const bgMusic = document.getElementById("backsound");

function startGame() {
    bgMusic.play().catch(() => {});
    startOverlay.remove();
}

startOverlay.addEventListener("pointerdown", startGame, { once: true });

// popup
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");

function openPopup(imageSrc) {
    popupImage.src = imageSrc;
    popup.classList.remove("hidden");
}

popup.addEventListener("click", () => {
    popup.classList.add("hidden");
    popupImage.src = "";
});

document.getElementById("tab").addEventListener("click", () => {
    openPopup("assets/images/tablet.png");
});

document.getElementById("info").addEventListener("click", () => {
    openPopup("assets/images/info-panel.png");
});