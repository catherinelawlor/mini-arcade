
// Generate a random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Select elements from the page
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");

// Listen for the form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // stops the page refreshing

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

// Reset game button
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", function() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    feedback.textContent = "";
    attemptsDisplay.textContent = "";
    input.value = "";
});

// -----------------------------
// CLICK SPEED CHALLENGE
// -----------------------------

let clicks = 0;
let timeLeft = 5;
let timerInterval;

// Select elements
const clickBtn = document.getElementById("click-btn");
const startBtn = document.getElementById("start-btn");
const clickCountDisplay = document.getElementById("click-count");
const timerDisplay = document.getElementById("timer");

// Disable the click button until the game starts
clickBtn.disabled = true;

// Start game
startBtn.addEventListener("click", function() {
    clicks = 0;
    timeLeft = 5;

    clickCountDisplay.textContent = "Clicks: 0";
    timerDisplay.textContent = "Time left: 5";

    clickBtn.disabled = false;
    startBtn.disabled = true;

    // Start countdown
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

// Count clicks
clickBtn.addEventListener("click", function() {
    clicks++;
    clickCountDisplay.textContent = `Clicks: ${clicks}`;
});

// -----------------------------
// MEMORY FLIP GAME
// -----------------------------

const memoryGrid = document.getElementById("memory-grid");
const restartMemoryBtn = document.getElementById("restart-memory");

let cardValues = ["🍎", "🍎", "⭐", "⭐", "🎵", "🎵", "🐶", "🐶"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle the cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create the cards
function setupMemoryGame() {
    memoryGrid.innerHTML = "";
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

// Flip card logic
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

// Check if cards match
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
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

// Restart game
restartMemoryBtn.addEventListener("click", setupMemoryGame);

// Start the game immediately
setupMemoryGame();
