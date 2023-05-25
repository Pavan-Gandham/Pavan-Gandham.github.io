// Get the player buttons, gameboard, restart button, and undo button elements
const player1Btn = document.getElementById("player1Btn");
const player2Btn = document.getElementById("player2Btn");
const gameboard = document.getElementById("gameboard");
const restartBtn = document.getElementById("restartBtn");
const undoBtn = document.getElementById("undoBtn");

// Flag to track the game mode
let isHumanVsComputer = true;

// Game state
let currentPlayer = "X";
let gameEnded = false;
let boardState = Array(9).fill("");

// Function to handle the player button click
function handlePlayerBtnClick() {
  isHumanVsComputer = !isHumanVsComputer; // Toggle the game mode

  // // Update the button text
  // if (isHumanVsComputer) {
  //   player1Btn.innerText = "Player 2";
  //   player2Btn.innerText = "Player 1 (Multiplayer)";
  // } else {
  //   player1Btn.innerText = "Player 2 (Human vs Computer)";
  //   player2Btn.innerText = "Player 1";
  // }

  restartGame();
}

// Function to handle a box click
function handleBoxClick(index) {
  if (gameEnded) return;

  // Check if the box is already filled
  if (boardState[index] !== "") return;

  // Update the board state
  boardState[index] = currentPlayer;

  // Update the box display
  const box = gameboard.children[index];
  box.innerText = currentPlayer;

  // Check if the current player wins
  if (checkWin(currentPlayer)) {
    announceWinner(currentPlayer);
    gameEnded = true;
    return;
  }

  // Check if it's a draw
  if (isDraw()) {
    announceDraw();
    gameEnded = true;
    return;
  }

  // Switch the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // If it's the computer's turn in human vs computer mode
  if (isHumanVsComputer && currentPlayer === "O") {
    makeComputerMove();
  }
}

// Function to make the computer's move
function makeComputerMove() {
  // Simulating a random move by the computer
  let emptyBoxes = boardState.reduce(
    (acc, value, index) => (value === "" ? acc.concat(index) : acc),
    []
  );
  let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  let boxIndex = emptyBoxes[randomIndex];
  handleBoxClick(boxIndex);
}

// Function to check if the current player wins
function checkWin(player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    if (
      boardState[combo[0]] === player &&
      boardState[combo[1]] === player &&
      boardState[combo[2]] === player
    ) {
      return true;
    }
  }

  return false;
}

// Function to check if it's a draw
function isDraw() {
  return !boardState.includes("");
}

// Function to announce the winner
function announceWinner(player) {
  alert(`Player ${player} wins!`);
}

// Function to announce a draw
function announceDraw() {
  alert("It's a draw!");
}

// Function to restart the game
function restartGame() {
  currentPlayer = "X";
  gameEnded = false;
  boardState = Array(9).fill("");
  clearBoard();
}

// Function to clear the board
function clearBoard() {
  for (let box of gameboard.children) {
    box.innerText = "";
  }
}

// Function to handle the restart button click
function handleRestartBtnClick() {
  restartGame();
}

// Function to handle the undo button click
function handleUndoBtnClick() {
  if (gameEnded) return;

  // Find the last played box
  const lastMoveIndex = boardState.lastIndexOf(currentPlayer);

  // Clear the last move
  boardState[lastMoveIndex] = "";
  gameboard.children[lastMoveIndex].innerText = "";

  // Switch the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Add event listeners
player1Btn.addEventListener("click", handlePlayerBtnClick);
player2Btn.addEventListener("click", handlePlayerBtnClick);
restartBtn.addEventListener("click", handleRestartBtnClick);
undoBtn.addEventListener("click", handleUndoBtnClick);

// Add event listeners to the gameboard boxes
for (let i = 0; i < 9; i++) {
  gameboard.children[i].addEventListener("click", () => handleBoxClick(i));
}
