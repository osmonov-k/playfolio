import React, { useEffect, useState } from "react";
import styles from "./ConnectFour.module.css";
import Rules from "./Rules";

const P1 = "player1";
const P2 = "player2";
const P1_COLOR = "#d9313d"; // Red
const P2_COLOR = "#fdc601"; // Yellow

const ConnectFour = () => {
  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(initializeBoard(6, 7));
  const [showRules, setShowRules] = useState(false);

  // Initialize the board
  function initializeBoard(rows, cols) {
    return Array(rows * cols).fill(null);
  }

  // Check for winning combinations
  const checkForWinner = () => {
    if (winner) return;

    const checkLine = (a, b, c, d) => {
      return a && a === b && a === c && a === d;
    };

    // Horizontal check
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const index = row * 7 + col;
        if (
          checkLine(
            board[index],
            board[index + 1],
            board[index + 2],
            board[index + 3]
          )
        ) {
          setWinner(board[index]);
          return;
        }
      }
    }

    // Vertical check
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        const index = row * 7 + col;
        if (
          checkLine(
            board[index],
            board[index + 7],
            board[index + 14],
            board[index + 21]
          )
        ) {
          setWinner(board[index]);
          return;
        }
      }
    }

    // Diagonal (top-left to bottom-right) check
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const index = row * 7 + col;
        if (
          checkLine(
            board[index],
            board[index + 8],
            board[index + 16],
            board[index + 24]
          )
        ) {
          setWinner(board[index]);
          return;
        }
      }
    }

    // Diagonal (top-right to bottom-left) check
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        const index = row * 7 + col;
        if (
          checkLine(
            board[index],
            board[index + 6],
            board[index + 12],
            board[index + 18]
          )
        ) {
          setWinner(board[index]);
          return;
        }
      }
    }
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (winner) return;

    const column = index % 7;
    const newBoard = [...board];

    // Find the lowest empty cell in the column
    for (let row = 5; row >= 0; row--) {
      const cellIndex = row * 7 + column;
      if (!newBoard[cellIndex]) {
        newBoard[cellIndex] = currentPlayer;
        break;
      }
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === P1 ? P2 : P1);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(initializeBoard(6, 7));
    setWinner("");
    setCurrentPlayer(P1);
  };

  // Check for a winner after every move
  useEffect(() => {
    checkForWinner();
  }, [board]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          {winner
            ? `Winner is ${winner === P1 ? "🔴" : "🟡"}`
            : currentPlayer === P1
            ? `${P1} 🔴`
            : `${P2} 🟡`}
        </h1>
      </div>

      <div className={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={styles.cell}
            onClick={() => handleCellClick(index)}
            style={{
              backgroundColor:
                cell === P1 ? P1_COLOR : cell === P2 ? P2_COLOR : "beige",
            }}
            disabled={winner}
          />
        ))}
      </div>

      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
      <button className={styles.rulesButton} onClick={() => setShowRules(true)}>
        Rules
      </button>

      {showRules && <Rules onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default ConnectFour;
