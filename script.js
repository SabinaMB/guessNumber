"use strict";

let secretNumber, score, highScore;

const initGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  highScore = 0;
  document.querySelector(".number").textContent = "❓";
  displayScore(score);
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#0d1b2a";
  displayMessage("");
  const guessField = document.querySelector(".guess");
  guessField.value = "";
  guessField.placeholder = "Type a number";
};

document.querySelector(".guess").addEventListener("focus", function () {
  this.placeholder = "";
});

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⚠️ Add a number between 1 and 20!");
    return;
  }

  if (guess === secretNumber) {
    displayMessage("🥳 Correct number!");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#2ecc71";
    document.querySelector(".number").style.width = "30rem";

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
    }
  }
});

document.querySelector(".again").addEventListener("click", initGame);

initGame();
