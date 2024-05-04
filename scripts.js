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
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

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
    const size = parseInt(gridSizeInput.value);
    createBoard(size);
    currentPlayer = "X"; // Reset to initial player
}

startGameButton.addEventListener("click", startGame);





//commented code for ease of presentation/understanding
// // Get references to HTML elements
// const board = document.getElementById("board");
// const message = document.getElementById("message");
// const startGameButton = document.getElementById("start-game");
// const gridSizeInput = document.getElementById("grid-size");

// // Initialize game variables
// let gameBoard = []; // This will hold the current state of the game board
// let currentPlayer = "X"; // This variable keeps track of the current player (either "X" or "O")

// // Function to create the game board based on the specified size
// function createBoard(size) {
//     // Clear the current board
//     board.innerHTML = "";

//     // Set the CSS grid template based on the size
//     board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
//     board.style.gridTemplateRows = `repeat(${size}, 100px)`;

//     // Create a new game board as a two-dimensional array filled with empty strings
//     gameBoard = Array(size)
//         .fill(null)
//         .map(() => Array(size).fill(""));

//     // Create cells for the board
//     for (let row = 0; row < size; row++) {
//         for (let col = 0; col < size; col++) {
//             const cell = document.createElement("div");
//             cell.className = "cell";
//             cell.dataset.row = row.toString();
//             cell.dataset.col = col.toString();
//             cell.addEventListener("click", handleClick);
//             board.appendChild(cell);
//         }
//     }

//     // Display the current player's turn
//     message.textContent = `Player ${currentPlayer}'s turn`;
// }

// // Event handler for cell clicks
// function handleClick(event) {
//     const cell = event.target;
//     const row = parseInt(cell.dataset.row, 8); // Convert the row index from string to integer
//     const col = parseInt(cell.dataset.col, 8); // Convert the column index from string to integer

//     // Check if the clicked cell is already occupied
//     if (gameBoard[row][col] !== "") {
//         // Cell is already occupied, ignore the click
//         return;
//     }

//     // Update the game board and display the player's mark
//     gameBoard[row][col] = currentPlayer;
//     cell.textContent = currentPlayer;
//     cell.classList.add(currentPlayer); // Apply a CSS class to color the marker

//     // Check for a winner
//     if (checkWinner()) {
//         message.textContent = `Player ${currentPlayer} wins!`;
//         removeListeners(); // Remove click event listeners from cells
//         return;
//     }

//     // Check for a draw
//     if (checkDraw()) {
//         message.textContent = "It's a draw!";
//         removeListeners(); // Remove click event listeners from cells
//         return;
//     }

//     // Switch players
//     currentPlayer = (currentPlayer === "X") ? "O" : "X";
//     message.textContent = `Player ${currentPlayer}'s turn`;
// }

// // Function to check for a winner
// function checkWinner() {
//     const size = gameBoard.length;

//     // Check rows
//     for (let row = 0; row < size; row++) {
//         if (gameBoard[row].every(cell => cell === currentPlayer)) {
//             return true; // The current player has filled the entire row
//         }
//     }

//     // Check columns
//     for (let col = 0; col < size; col++) {
//         if (gameBoard.every(row => row[col] === currentPlayer)) {
//             return true; // The current player has filled the entire column
//         }
//     }

//     // Check diagonals
//     let diagonal1 = true;
//     let diagonal2 = true;
//     for (let i = 0; i < size; i++) {
//         if (gameBoard[i][i] !== currentPlayer) {
//             diagonal1 = false;
//         }
//         if (gameBoard[i][size - 1 - i] !== currentPlayer) {
//             diagonal2 = false;
//         }
//     }

//     if (diagonal1 || diagonal2) {
//         return true; // The current player has filled one of the diagonals
//     }

//     return false; // No winner found
// }

// // Function to check for a draw
// function checkDraw() {
//     // Check if all cells are filled
//     return gameBoard.every(row => row.every(cell => cell !== ""));
// }

// // Function to remove click event listeners from cells
// function removeListeners() {
//     const cells = board.querySelectorAll(".cell");
//     cells.forEach(cell => {
//         cell.removeEventListener("click", handleClick);
//     });
// }

// // Function to start a new game
// function startGame() {
//     const size = parseInt(gridSizeInput.value, 8); // Get the grid size from the input field
//     createBoard(size); // Create the game board
//     currentPlayer = "X"; // Reset to initial player
// }

// // Add event listener to the start game button
// startGameButton.addEventListener("click", startGame);
