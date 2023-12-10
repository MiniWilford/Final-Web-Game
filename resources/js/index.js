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

    // Set the updated word display
    wordDisplay.textContent = displayText;

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



// Event listeners
guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initGame);

// Initial setup
initGame();