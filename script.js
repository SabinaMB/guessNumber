"use strict";

let secretNumber,
  score,
  highScore = 0;

const numberElement = document.querySelector(".number");
const messageElement = document.querySelector(".message");
const guessField = document.querySelector(".guess");
const highScoreElement = document.querySelector(".highscore");

const initGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  numberElement.textContent = "❓";
  displayScore(score);
  guessField.value = "";
  guessField.placeholder = "Type a number";
  document.querySelector("body").style.backgroundColor = "#301934";
  displayMessage("");
};

document.querySelector(".guess").addEventListener("focus", function () {
  this.placeholder = "";
});

const displayMessage = function (message) {
  messageElement.textContent = message;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3"],
  });
}

function loseGame() {
  const card = document.querySelector(".card");
  const message = document.querySelector(".message");

  card.classList.add("lost");
  message.classList.add("lost");

  setTimeout(() => {
    card.classList.remove("lost");
    message.classList.remove("lost");
  }, 1500);
}

function flashEffect(element, duration = 3000) {
  element.classList.add("flash");
  setTimeout(() => element.classList.remove("flash"), duration);
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(guessField.value);

  if (!guess) {
    displayMessage("⚠️ Add a number!");
    return;
  }

  if (guess === secretNumber) {
    displayMessage("🥳 Correct number!");
    numberElement.textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#a8e063";
    triggerConfetti();

    flashEffect(numberElement);
    flashEffect(messageElement);

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "⬆️ Too high!" : "⬇️ Too low!");
      score--;
      displayScore(score);
    } else {
      displayMessage("💥 You lost the game!");
      displayScore(0);
      loseGame();
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  initGame();
  highScoreElement.textContent = highScore;
});

highScoreElement.textContent = highScore;

initGame();
