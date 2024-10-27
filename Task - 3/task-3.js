const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('#status');
const restartButton = document.querySelector('#restartButton');
const multiplayerButton = document.querySelector('#multiplayerButton');
const aiButton = document.querySelector('#aiButton');

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isAiMode = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Functions
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();

    // If game is still active, switch turns
    if (isGameActive) {
        if (isAiMode && currentPlayer === 'X') {
            // If it's AI mode and it's player X's turn, switch to AI
            currentPlayer = 'O'; // Temporarily switch to AI
            setTimeout(aiMove, 500); // Delay AI move slightly for realism
        } else {
            // If it's multiplayer or after AI move, switch player normally
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function aiMove() {
    let emptyCells = gameState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    
    checkForWinner();

    // After AI move, switch back to player X
    if (isGameActive) {
        currentPlayer = 'X';
    }
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
        return;
    }
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    cells.forEach(cell => (cell.textContent = ''));
}

function enableMultiplayerMode() {
    isAiMode = false;
    restartGame();
}

function enableAiMode() {
    isAiMode = true;
    restartGame();
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
multiplayerButton.addEventListener('click', enableMultiplayerMode);
aiButton.addEventListener('click', enableAiMode);
