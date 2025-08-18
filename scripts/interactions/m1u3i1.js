window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("settings") !== "") {
    loadSettings();
  } else {
    resetSettings();
  }
  init();
});

// RESET
function resetSettings() {
  sessionStorage.clear();
  sessionStorage.setItem("lang", "de");
}

// LOAD SETTINGS
function loadSettings() {
  const paramList = sessionStorage.getItem("settings").split("&");
  if (paramList.length === 5) {
    canvasPadding = parseInt(paramList[0].split("=")[1]);
    verticalSpacing = parseInt(paramList[1].split("=")[1]);
    borderWidth = parseInt(paramList[2].split("=")[1]);
    mode = parseInt(paramList[3].split("=")[1]);
    figure = parseInt(paramList[4].split("=")[1]);
  } else {
    resetSettings();
  }
}

// INITIALIZE
function init() {
  initElements();
  initEventListeners();
  loadImages();
  const lang = sessionStorage.getItem("lang") || "de";
  updateTranslations(lang);
}

function initElements() {
  TLButton = document.getElementById("TLButton");
  RotationButton = document.getElementById("RotationButton");
  ResetButton = document.getElementById("ResetButton");
  canvas = document.getElementById("interaction");
  canvContext = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = canvas.width / 2;
}

function initEventListeners() {
  TLButton.addEventListener("click", handleTLButtonClick);
  RotationButton.addEventListener("click", handleRotationButtonClick);
  ResetButton.addEventListener("click", handleResetButtonClick);
  canvas.addEventListener("click", handleCanvasClick);
}

function handleCanvasClick(event) {
  const currentLang = localStorage.getItem("lang") || "de";
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const feedbackMessageElement = document.getElementById("feedbackMessage");
  if (x < canvas.width / 2 - canvas.width * 0.17) {
    feedbackMessageElement.textContent = languages[currentLang].feedbackIncorrect;
  } else {
    feedbackMessageElement.textContent = languages[currentLang].feedbackCorrect;
  }
}

let rotationCounter = 0;
let tlCounter = 0;

function handleTLButtonClick() {
  tlCounter = (tlCounter + 1) % 17;
  loadImages();
  drawImages();
}

function handleRotationButtonClick() {
  rotationCounter = (rotationCounter + 1) % 7;
  loadImages();
  drawImages();
}

function handleResetButtonClick() {
  tlCounter = 0;
  rotationCounter = 0;
  loadImages();
  drawImages();
  const lang = sessionStorage.getItem("lang") || "de";
  document.getElementById("feedbackMessage").textContent = languages[lang].instructions;
}

const leftImages = [
  "../resources/interactions/m1u3i1/DefaultT.png",
  "../resources/interactions/m1u3i1/1L.png",
  "../resources/interactions/m1u3i1/2L.png",
  "../resources/interactions/m1u3i1/3L.png",
  "../resources/interactions/m1u3i1/4L.png",
  "../resources/interactions/m1u3i1/5L.png",
  "../resources/interactions/m1u3i1/6L.png",
  "../resources/interactions/m1u3i1/7L.png",
  "../resources/interactions/m1u3i1/8L.png",
  "../resources/interactions/m1u3i1/9L.png",
  "../resources/interactions/m1u3i1/10L.png",
  "../resources/interactions/m1u3i1/11L.png",
  "../resources/interactions/m1u3i1/12L.png",
  "../resources/interactions/m1u3i1/13L.png",
  "../resources/interactions/m1u3i1/14L.png",
  "../resources/interactions/m1u3i1/15L.png",
  "../resources/interactions/m1u3i1/AllLs.png",
];

const rightImages = [
  "../resources/interactions/m1u3i1/DefaultT.png",
  "../resources/interactions/m1u3i1/Rot1.png",
  "../resources/interactions/m1u3i1/Rot2.png",
  "../resources/interactions/m1u3i1/Rot3.png",
  "../resources/interactions/m1u3i1/Rot4.png",
  "../resources/interactions/m1u3i1/Rot5.png",
  "../resources/interactions/m1u3i1/Rot6.png",
  "../resources/interactions/m1u3i1/Rot1.png", // <-- Check this path
];

const leftImage = new Image();
const rightImage = new Image();

function loadImages() {
  leftImage.src = leftImages[tlCounter];
  rightImage.src = rightImages[rotationCounter];
  leftImage.onload = drawImages;
  rightImage.onload = drawImages;
}

function drawImages() {
  const padding = 20;
  const imageWidth = canvas.width / 2 - padding;
  const imageHeight = canvas.height - 2 * padding;
  canvContext.clearRect(0, 0, canvas.width, canvas.height);
  canvContext.drawImage(leftImage, padding, padding, imageWidth, imageHeight);
  canvContext.drawImage(rightImage, canvas.width / 2 + padding, padding, imageWidth, imageHeight);
}
init()
console.log("<m1u3i1> v1.0.1");
