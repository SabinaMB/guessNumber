"use strict";

let secretNumber,
  score,
  highScore = 0;

const initGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(".number").textContent = "❓";
  displayScore(score);
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#162033";
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
    triggerConfetti();

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
  document.querySelector(".highscore").textContent = highScore;
});

document.querySelector(".highscore").textContent = highScore;

initGame();
