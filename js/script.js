const bgMusic = document.getElementById("backsound");

function startAudio() {
    bgMusic.play();
    document.removeEventListener("click", startAudio);
}

document.addEventListener("pointerdown", startAudio, { once: true });