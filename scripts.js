// selecting dom elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const playButton = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButton = player.querySelectorAll("[data-skip]");
const progressFilled = player.querySelector(".progress__filled");
const progress = player.querySelector(".progress");

// adding logic functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  updatePlayButton();
}

function updatePlayButton() {
  playButton.textContent = video.paused ? "►" : "❚ ❚";
}

console.log(video.currentTime);

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeRange(e) {
  video[this.name] = this.value;
}

function progressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// adding event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", progressBar);
playButton.addEventListener("click", togglePlay);
ranges.forEach((range) => range.addEventListener("change", changeRange));
ranges.forEach((range) => range.addEventListener("mousemove", changeRange));
skipButton.forEach((button) => button.addEventListener("click", skip));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
