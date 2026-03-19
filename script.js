// -----------------------------
// GAME 1 — GUESS THE NUMBER
// -----------------------------

const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const resetBtn = document.getElementById("reset-btn");

if (form && input && feedback && attemptsDisplay && resetBtn) {

    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const guess = Number(input.value);
        attempts++;

        if (guess < secretNumber) {
            feedback.textContent = "Too low!";
            feedback.style.color = "#00eaff";
        } else if (guess > secretNumber) {
            feedback.textContent = "Too high!";
            feedback.style.color = "#ff00ff";
        } else {
            feedback.textContent = "Correct! You win!";
            feedback.style.color = "#00ff88";
        }

        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        input.value = "";
    });

    resetBtn.addEventListener("click", function() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        feedback.textContent = "";
        attemptsDisplay.textContent = "";
        input.value = "";
    });
}



// -----------------------------
// GAME 2 — CLICK SPEED CHALLENGE
// -----------------------------

const clickBtn = document.getElementById("click-btn");
const startBtn = document.getElementById("start-btn");
const clickCountDisplay = document.getElementById("click-count");
const timerDisplay = document.getElementById("timer");

if (clickBtn && startBtn && clickCountDisplay && timerDisplay) {

    let clicks = 0;
    let timeLeft = 5;
    let timerInterval;

    clickBtn.disabled = true;

    startBtn.addEventListener("click", function() {
        clicks = 0;
        timeLeft = 5;

        clickCountDisplay.textContent = "Clicks: 0";
        timerDisplay.textContent = "Time left: 5";

        clickBtn.disabled = false;
        startBtn.disabled = true;

        timerInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}`;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                clickBtn.disabled = true;
                startBtn.disabled = false;
            }
        }, 1000);
    });

    clickBtn.addEventListener("click", function() {
        clicks++;
        clickCountDisplay.textContent = `Clicks: ${clicks}`;
    });
}



// -----------------------------
// GAME 3 — MEMORY FLIP GAME
// -----------------------------

const memoryGrid = document.getElementById("memory-grid");
const restartMemoryBtn = document.getElementById("restart-memory");
const memoryMessage = document.getElementById("memory-message");

if (memoryGrid && restartMemoryBtn && memoryMessage) {

    let cardValues = ["🍎", "🍎", "⭐", "⭐", "🎵", "🎵", "🐶", "🐶"];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function setupMemoryGame() {
        memoryGrid.innerHTML = "";
        memoryMessage.textContent = "";
        shuffle(cardValues);

        cardValues.forEach(value => {
            const card = document.createElement("div");
            card.classList.add("memory-card");
            card.dataset.value = value;
            card.textContent = "?";

            card.addEventListener("click", flipCard);
            memoryGrid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.textContent = this.dataset.value;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    function checkMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard = null;
            secondCard = null;

            const allCards = document.querySelectorAll(".memory-card");
            const allRevealed = [...allCards].every(card => card.textContent !== "?");

            if (allRevealed) {
                memoryMessage.textContent = "🎉 You matched all the pairs!";
            }

        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.textContent = "?";
                secondCard.textContent = "?";
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 800);
        }
    }

    restartMemoryBtn.addEventListener("click", setupMemoryGame);

    setupMemoryGame();
}

// -----------------------------
// GAME 4 — ROCK PAPER SCISSORS
// -----------------------------

const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");

if (rpsButtons.length > 0 && rpsResult) {

    function computerMove() {
        const moves = ["rock", "paper", "scissors"];
        return moves[Math.floor(Math.random() * moves.length)];
    }

    function determineWinner(player, computer) {
        if (player === computer) return "It's a draw!";

        if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            return "You win!";
        }

        return "You lose!";
    }

    rpsButtons.forEach(button => {
        button.addEventListener("click", () => {
            const playerChoice = button.dataset.move;
            const computerChoice = computerMove();
            const result = determineWinner(playerChoice, computerChoice);

            rpsResult.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
        });
    });
}

// -----------------------------
// THEME TOGGLE
// -----------------------------

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeToggle.textContent = "Dark Mode";
        } else {
            themeToggle.textContent = "Light Mode";
        }
    });
}