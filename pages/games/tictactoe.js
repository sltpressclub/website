import React, { useState } from "react";
import Head from "next/head"; // Import for setting meta tags and title

const TicTacToe = () => {
  // Game variables
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Player X's turn");

  // Handle cell click event
  const handleCellClick = (index) => {
    if (board[index] === "" && gameActive) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      switchPlayer();
    }
  };

  // Check winner logic
  const checkWinner = (newBoard) => {
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
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setGameActive(false);
        setGameStatus(`${currentPlayer} wins!`);
        updateScore();
        return;
      }
    }

    if (!newBoard.includes("")) {
      setGameActive(false);
      setGameStatus("It's a draw!");
    }
  };

  // Update score based on winner
  const updateScore = () => {
    if (currentPlayer === "X") {
      setXScore(xScore + 1);
    } else {
      setOScore(oScore + 1);
    }
  };

  // Switch player
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setGameStatus(`Player ${currentPlayer === "X" ? "O" : "X"}'s turn`);
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameActive(true);
    setGameStatus("Player X's turn");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Head>
        <title>Tic-Tac-Toe - SLT Pressclub</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Play Tic-Tac-Toe and compete against a friend or the computer."
        />
        <meta
          name="keywords"
          content="Tic-Tac-Toe, Game, JS Game, Play, Multiplayer, Fun"
        />
        <meta name="author" content="Aman Kauroo" />
        <meta property="og:title" content="Tic-Tac-Toe Game" />
        <meta
          property="og:description"
          content="Enjoy a fun game of Tic-Tac-Toe! Play against a friend or the computer."
        />
        <meta property="og:image" content="tictactoe.png" />
        <meta
          property="og:url"
          content="http://sltpressclub.vercel.app/tictactoe"
        />
      </Head>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Tic-Tac-Toe</h2>
          <p className="text-lg text-white mt-4">
            Enjoy a game of Tic-Tac-Toe with a friend or against the computer.
          </p>
        </div>

        {/* Game Section */}
        <div className="text-center text-white mb-8">
          <p>
            <strong>Player X:</strong> {xScore}
          </p>
          <p>
            <strong>Player O:</strong> {oScore}
          </p>
          <div className="text-2xl my-4">{gameStatus}</div>
        </div>

        <div
          id="board"
          className="grid grid-cols-3 gap-4 mx-auto mb-8"
          style={{ maxWidth: "350px" }}
        >
          {board.map((cell, index) => (
            <div
              key={index}
              className="w-20 h-20 flex justify-center items-center bg-gray-600 text-4xl font-bold text-white cursor-pointer rounded"
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="px-6 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600 transition duration-300"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
