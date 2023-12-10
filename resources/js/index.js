// DOM elements
const hangmanCanvas = document.getElementById('hangman-canvas');
const wordDisplay = document.querySelector('.word-display');
const guessedLettersDisplay = document.querySelector('.guessed-letters');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');
const hangmanTitle = document.querySelector('h1');
const difficultySelect = document.getElementById('difficulty-select');
const startButton = document.getElementById('start-button');
// Hangman drawing context
const ctx = hangmanCanvas.getContext('2d');

// Game variables
let word = ''; // Replace with your fetched word
let guessedLetters = []; // Example guessed letters
// let guessedLetters = [];
let attempts = 0;
const maxAttempts = 6;
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6; // Maximum allowed incorrect guesses

// API URL
const apiUrl = 'https://it3049c-hangman.fly.dev/';

// Fetch a random word from the API based on difficulty
function fetchRandomWord(difficulty) {
    fetch(`${apiUrl}?difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
            word = data.word.toUpperCase();
            updateWordDisplay();
        })
        .catch(error => console.error('Error fetching word:', error));
}


// DOM elements


// Event listener for the "Start Game" button
startButton.addEventListener('click', () => {
    // Get the selected difficulty level from the dropdown
    const selectedDifficulty = difficultySelect.value;

    // Define difficulty level ranges
    let minWordLength, maxWordLength;
    if (selectedDifficulty === 'easy') {
        minWordLength = 3;
        maxWordLength = 5;
    } else if (selectedDifficulty === 'medium') {
        minWordLength = 6;
        maxWordLength = 9;
    } else if (selectedDifficulty === 'hard') {
        minWordLength = 10;
        maxWordLength = 15;
    }

    // Construct the API URL with the selected difficulty range
    const apiUrl = `https://it3049c-hangman.fly.dev/?min=${minWordLength}&max=${maxWordLength}`;

    // Make an HTTP GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the response data here
            word = data.word.toUpperCase();
            updateWordDisplay();
            // For example, you can access the word using data.word
            console.log('Fetched word:', data.word);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error fetching word:', error);
        });
});
// DOM elements


// Initialize the game word (replace this with your fetched word)
// let word = 'EXAMPLE';

// Create an array to store the guessed letters
// let guessedLetters = [];

// Function to update the word display
// Initialize the game variables



// Function to update the word display
function updateWordDisplay() {
    let displayText = '';

    // Loop through each character in the word
    for (const char of word) {
        // Check if the character is in the guessed letters array
        if (guessedLetters.includes(char)) {
            // If guessed, show the character
            displayText += char;
        } else {
            // If not guessed, show an underscore
            displayText += '_';
        }
    }

    // Set the updated word display
    wordDisplay.textContent = displayText;
}

// Call the updateWordDisplay function to initially display underscores
updateWordDisplay();

// Function to update the guessed letters display
function updateGuessedLettersDisplay() {
    guessedLettersDisplay.textContent = guessedLetters.join(', ');
}


// Initialize the game
function initGame() {
    guessedLetters = [];
    attempts = 0;
    drawHangman();
    updateWordDisplay();
    guessedLettersDisplay.textContent = 'Previously Guessed: ';
    guessInput.value = '';
    guessInput.removeAttribute('disabled');
    guessButton.removeAttribute('disabled');
}



// Function to draw the hangman
function drawHangman() {
    // Clear the canvas
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);

    // Draw the hangman based on the number of incorrect guesses
    if (incorrectGuesses >= 1) {
        // Draw the head
        ctx.beginPath();
        ctx.arc(100, 40, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (incorrectGuesses >= 2) {
        // Draw the body
        ctx.moveTo(100, 60);
        ctx.lineTo(100, 100);
        ctx.stroke();
    }
    if (incorrectGuesses >= 3) {
        // Draw the left arm
        ctx.moveTo(100, 70);
        ctx.lineTo(80, 85);
        ctx.stroke();
    }
    if (incorrectGuesses >= 4) {
        // Draw the right arm
        ctx.moveTo(100, 70);
        ctx.lineTo(120, 85);
        ctx.stroke();
    }
    if (incorrectGuesses >= 5) {
        // Draw the left leg
        ctx.moveTo(100, 100);
        ctx.lineTo(80, 130);
        ctx.stroke();
    }
    if (incorrectGuesses >= 6) {
        // Draw the right leg and indicate game over
        ctx.moveTo(100, 100);
        ctx.lineTo(120, 130);
        ctx.stroke();
        // alert('Game over. You lost.');
    }
}

// Function to check if the word has been completely guessed
function checkForWin() {
    if (word === wordDisplay.textContent) {
        alert('Congratulations! You won!');
    }
}

// Function to check if all body parts have been drawn
function checkForLoss() {
    if (incorrectGuesses >= maxIncorrectGuesses) {
        alert('Game over. You lost.');
    }
}

// Check if the game is won or lost
function checkGameStatus() {
    if (word === wordDisplay.textContent) {
        announceResult(true);
    } else if (attempts >= maxAttempts) {
        announceResult(false);
    }
}

// Announce the game result and offer a reset option
function announceResult(isWinner) {
    guessInput.setAttribute('disabled', 'true');
    guessButton.setAttribute('disabled', 'true');
    resetButton.style.display = 'block';
    if (isWinner) {
        alert('Congratulations! You won!');
    } else {
        alert('Game over. You lost. The word was: ' + word);
    }
}

// Function to handle user guesses
function handleGuess() {
    const guess = guessInput.value.toUpperCase();

    // Validate the guess
    if (!guess.match(/^[A-Z]$/)) {
        alert('Please enter a valid uppercase letter.');
        return;
    }

    // Check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
        alert('You have already guessed this letter.');
        return;
    }

    // Add the guess to the guessedLetters array
    guessedLetters.push(guess);


    // Update the word display and guessed letters display
    updateWordDisplay();
    updateGuessedLettersDisplay();

   // Check if the guessed letter is correct
    if (!word.includes(guess)) {
        // Incorrect guess: Add a 'failed' class to apply the failed animation
        wordDisplay.classList.add('failed');
        setTimeout(() => {
            wordDisplay.classList.remove('failed'); // Remove the class after the animation
        }, 500); // Adjust the time to match your CSS animation duration
      
        // If incorrect, draw the next body part on the hangman
       
        incorrectGuesses++;
         drawHangman();
        // Check for a loss
        checkForLoss();
    }
    else{
        // Correct guess: Add a 'success' class to apply the success animation
        wordDisplay.classList.add('success');
        setTimeout(() => {
            wordDisplay.classList.remove('success'); // Remove the class after the animation
        }, 300); // Adjust the time to match your CSS transition duration
    }


    // Draw the hangman
   checkForWin();
    // Clear the guess input field
    guessInput.value = '';
   

    // Check for game over conditions
    if (incorrectGuesses >= maxIncorrectGuesses) {
        guessInput.setAttribute('disabled', 'true');
        guessButton.setAttribute('disabled', 'true');
        alert('Game over. You lost.');
    }
}

// Function to clear the canvas
function clearCanvas() {
    // Get the canvas context
    const ctx = hangmanCanvas.getContext('2d');

    // Clear the entire canvas
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
}


// Event listener for the reset button
resetButton.addEventListener('click', () => {
    // Reset game variables
    word = ''; // Replace with your fetched word
    guessedLetters = [];
    incorrectGuesses = 0;

    // Clear the canvas (you may need to implement this function)
    clearCanvas();

    // Update displays
    updateWordDisplay();
    updateGuessedLettersDisplay();

    // Disable the reset button
    resetButton.disabled = true;
});
// Call the initial update of guessed letters display
updateGuessedLettersDisplay();

// Event listeners
guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initGame);

// Initial setup
initGame();