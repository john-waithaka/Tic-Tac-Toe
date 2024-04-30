const board = document.getElementById("board");
const message = document.getElementById("message");
const startGameButton = document.getElementById("start-game");
const gridSizeInput = document.getElementById("grid-size");

let gameBoard = [];
let currentPlayer = "X";

function createBoard(size) {
    // Clear the current board
    board.innerHTML = "";

    // Set grid template based on size
    board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    board.style.gridTemplateRows = `repeat(${size}, 100px)`;

    gameBoard = Array(size)
        .fill(null)
        .map(() => Array(size).fill(""));

    // Create cells for the board
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }
    }

    message.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row, 8);
    const col = parseInt(cell.dataset.col, 8);

    if (gameBoard[row][col] !== "") {
        // Cell is already occupied, ignore
        return;
    }

    // Update game board and display player's mark
    gameBoard[row][col] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Apply class to color marker

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        removeListeners(); // Game over
        return;
    }

    if (checkDraw()) {
        message.textContent = "It's a draw!";
        removeListeners(); // Game over
        return;
    }

    // Switch players
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const size = gameBoard.length;

    // Check rows
    for (let row = 0; row < size; row++) {
        if (gameBoard[row].every(cell => cell === currentPlayer)) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
        if (gameBoard.every(row => row[col] === currentPlayer)) {
            return true;
        }
    }

    // Check diagonals
    let diagonal1 = true;
    let diagonal2 = true;
    for (let i = 0; i < size; i++) {
        if (gameBoard[i][i] !== currentPlayer) {
            diagonal1 = false;
        }
        if (gameBoard[i][size - 1 - i] !== currentPlayer) {
            diagonal2 = false;
        }
    }

    if (diagonal1 || diagonal2) {
        return true;
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== ""));
}

function removeListeners() {
    const cells = board.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
    });
}

function startGame() {
    const size = parseInt(gridSizeInput.value, 8);
    createBoard(size);
    currentPlayer = "X"; // Reset to initial player
}

startGameButton.addEventListener("click", startGame);