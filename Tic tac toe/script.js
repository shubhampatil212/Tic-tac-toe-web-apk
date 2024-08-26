const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');

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

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => boardState[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = Array(9).fill('');
    cells.forEach(cell => (cell.textContent = ''));
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

message.textContent = `Player ${currentPlayer}'s turn`;