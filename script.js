// Select the game board element
const gameBoard = document.getElementById('gameBoard');

// Initialize game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Game logic
const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if the cell has already been clicked, or the game is paused
    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    // Update the board and the UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a winner
    if (checkForWinner()) {
        return;
    }

    // Switch the player
    switchPlayer();
};


const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? 'X Wins!' : 'O Wins!');
        isGameActive = false;
        return true;
    }

    // Check for a draw
    if (!board.includes('')) {
        announce('Draw!');
        isGameActive = false;
        return true;
    }

    return false;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    announce(`Player ${currentPlayer}'s turn`);
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    isGameActive = true; // Set the game as active
    currentPlayer = 'X'; // Reset the current player to 'X'

    // Reset the UI for each cell
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });

    announce('Player X\'s turn');
};

const announce = (message) => {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
};

// Event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restartButton').addEventListener('click', restartGame);

// Start the game
restartGame();
