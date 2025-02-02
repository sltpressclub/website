// Create the HTML structure dynamically using JS
document.body.innerHTML = `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Play Tic-Tac-Toe and compete against a friend or the computer.">
    <meta name="keywords" content="Tic-Tac-Toe, Game, JS Game, Play, Multiplayer, Fun">
    <meta name="author" content="Aman Kauroo">
    <meta property="og:title" content="Tic-Tac-Toe Game">
    <meta property="og:description" content="Enjoy a fun game of Tic-Tac-Toe! Play against a friend or the computer.">
    <meta property="og:image" content="tictactoe.png"> <!-- Image for social media sharing -->
    <meta property="og:url" content="http://sltpressclub.vercel.app/tictactoe">
    
  </head>
  <div style="text-align: center; margin-top: 20px;">
    <h1>Tic-Tac-Toe</h1>
    <div style="font-size: 1.2rem; margin-bottom: 10px;">
      <p><strong>Player X:</strong> <span id="x-score">0</span></p>
      <p><strong>Player O:</strong> <span id="o-score">0</span></p>
    </div>
    <div id="game-status" style="font-size: 1.5rem; margin-bottom: 20px;">Player X's turn</div>
    <div id="board" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; justify-content: center;"></div>
    <button id="reset-btn" style="padding: 10px 20px; font-size: 1rem; background-color: #4CAF50; color: white; border: none; cursor: pointer; border-radius: 5px; margin-top: 20px;">
      Reset Game
    </button>
  </div>
`;

// Game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xScore = 0;
let oScore = 0;

// Create board cells dynamically
const boardElement = document.getElementById("board");

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = "100px";
  cell.style.height = "100px";
  cell.style.backgroundColor = "#ddd";
  cell.style.display = "flex";
  cell.style.justifyContent = "center";
  cell.style.alignItems = "center";
  cell.style.fontSize = "2rem";
  cell.style.fontWeight = "bold";
  cell.style.cursor = "pointer";
  cell.style.borderRadius = "5px";
  cell.addEventListener("click", () => handleCellClick(i));
  boardElement.appendChild(cell);
}

// Handle cell click event
function handleCellClick(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    switchPlayer();
  }
}

// Update the board UI
function updateBoard() {
  const cells = boardElement.children;
  for (let i = 0; i < 9; i++) {
    cells[i].textContent = board[i];
  }
}

// Check winner logic
function checkWinner() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      document.getElementById(
        "game-status"
      ).textContent = `${currentPlayer} wins!`;
      updateScore();
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    document.getElementById("game-status").textContent = "It's a draw!";
  }
}

// Update score based on winner
function updateScore() {
  if (currentPlayer === "X") {
    xScore++;
    document.getElementById("x-score").textContent = xScore;
  } else {
    oScore++;
    document.getElementById("o-score").textContent = oScore;
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById(
    "game-status"
  ).textContent = `Player ${currentPlayer}'s turn`;
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById(
    "game-status"
  ).textContent = `Player ${currentPlayer}'s turn`;
  updateBoard();
}

// Reset button functionality
document.getElementById("reset-btn").addEventListener("click", resetGame);

// Apply media query styling dynamically for responsiveness
const style = document.createElement("style");
style.innerHTML = `
  @media (max-width: 600px) {
    #board {
      grid-template-columns: repeat(3, 80px);
    }
    #reset-btn {
      padding: 8px 15px;
    }
    .cell {
      width: 80px;
      height: 80px;
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    #board {
      grid-template-columns: repeat(3, 100px);
    }
    .cell {
      width: 100px;
      height: 100px;
      font-size: 2rem;
    }
  }

  @media (min-width: 1200px) {
    #board {
      grid-template-columns: repeat(3, 120px);
    }
    .cell {
      width: 120px;
      height: 120px;
      font-size: 2.5rem;
    }
  }
`;
document.head.appendChild(style);
