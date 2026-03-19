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

            // -----------------------------
            // NEW HIGH SCORE CHECK
            // -----------------------------
            let score = 100 - attempts; // fewer attempts = higher score
            checkHighScore("Guess the Number", score);
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

                // -----------------------------
                // NEW HIGH SCORE CHECK GOES HERE
                // -----------------------------
                let score = clicks; // number of clicks in 5 seconds
                checkHighScore("Click Speed Challenge", score);
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
    let attempts = 0; // NEW

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function setupMemoryGame() {
        memoryGrid.innerHTML = "";
        memoryMessage.textContent = "";
        shuffle(cardValues);
        attempts = 0; // NEW

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
        attempts++; // NEW

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

                // -----------------------------
                // NEW HIGH SCORE CHECK
                // -----------------------------
                let score = 100 - attempts; // fewer flips = better score
                checkHighScore("Memory Flip", score);
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

// -----------------------------
// CONTACT FORM — DOM INTERACTION
// -----------------------------

const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactMessage = document.getElementById("contact-message");
const contactFeedback = document.getElementById("contact-feedback");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Reset feedback
        contactFeedback.textContent = "";
        contactFeedback.style.color = "";

        // Validation
        if (contactName.value.trim() === "") {
            contactFeedback.textContent = "Please enter your name.";
            contactFeedback.style.color = "#ff00ff";
            return;
        }

        if (contactEmail.value.trim() === "" || !contactEmail.value.includes("@")) {
            contactFeedback.textContent = "Please enter a valid email.";
            contactFeedback.style.color = "#ff00ff";
            return;
        }

        if (contactMessage.value.trim() === "") {
            contactFeedback.textContent = "Please enter a message.";
            contactFeedback.style.color = "#ff00ff";
            return;
        }

        // Success message
        contactFeedback.textContent = "🎉 Message sent successfully!";
        contactFeedback.style.color = "#00ff88";

        // Clear form
        contactName.value = "";
        contactEmail.value = "";
        contactMessage.value = "";
    });
}


// -----------------------------
// HIGH SCORES — FULL SYSTEM
// -----------------------------

const scoreForm = document.getElementById("score-form");
const scoreName = document.getElementById("score-name");
const scoreComment = document.getElementById("score-comment");
const scoreGame = document.getElementById("score-game");
const scoreList = document.getElementById("score-list");
const topFiveToggle = document.getElementById("top-five-toggle");

let scores = JSON.parse(localStorage.getItem("scores")) || [];

function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function renderScores() {
    scoreList.innerHTML = "";

    let displayScores = [...scores];

    if (topFiveToggle.checked) {
        displayScores = displayScores.slice(0, 5);
    }

    displayScores.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${entry.name}</strong> (${entry.game})<br>
                ${entry.comment}
            </div>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
        scoreList.appendChild(li);
    });
}

if (scoreForm) {

    renderScores();

    scoreForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = scoreName.value.trim();
        const comment = scoreComment.value.trim();
        const game = scoreGame.value;

        if (name === "" || comment === "") {
            alert("Please fill in all fields!");
            return;
        }

        const newEntry = { name, comment, game };

        scores.unshift(newEntry); // newest at top
        saveScores();
        renderScores();

        scoreName.value = "";
        scoreComment.value = "";
    });

    scoreList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            scores.splice(index, 1);
            saveScores();
            renderScores();
        }
    });

    topFiveToggle.addEventListener("change", renderScores);
}

// -----------------------------
// GLOBAL HIGH SCORE STORAGE
// -----------------------------

function getHighScore(gameName) {
    return JSON.parse(localStorage.getItem(`highscore_${gameName}`)) || null;
}

function setHighScore(gameName, scoreData) {
    localStorage.setItem(`highscore_${gameName}`, JSON.stringify(scoreData));
}

function checkHighScore(gameName, newScore) {
    const current = getHighScore(gameName);

    if (!current || newScore > current.score) {
        // Show popup
        document.getElementById("highscore-popup").style.display = "block";

        document.getElementById("hs-save").onclick = function() {
            const name = document.getElementById("hs-name").value.trim();
            const comment = document.getElementById("hs-comment").value.trim();

            if (name === "") {
                alert("Please enter your name!");
                return;
            }

            // Save high score
            setHighScore(gameName, { name, score: newScore });

            // Also add to leaderboard
            const scores = JSON.parse(localStorage.getItem("scores")) || [];
            scores.unshift({
                name,
                comment,
                game: gameName
            });
            localStorage.setItem("scores", JSON.stringify(scores));

            // Hide popup
            document.getElementById("highscore-popup").style.display = "none";

            alert("High score saved!");
        };
    }
}

