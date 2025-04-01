import React, { useEffect, useState } from "react";
import styles from "./memory.module.css";
import emojis from "./emojis";
import Rules from "./Rules";

// Shuffle and generate the emojis grid
const getRandomEmojis = () => {
  const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
  const selectedEmojis = shuffledEmojis.slice(0, 8);
  const pairedEmojis = [...selectedEmojis, ...selectedEmojis].sort(
    () => Math.random() - 0.5
  );

  return pairedEmojis.map((emoji, index) => ({
    id: index,
    emoji,
    isOpen: false,
    isMatched: false,
  }));
};

const EmojiCard = ({ emojiItem, handleClick }) => {
  const { emoji, isOpen, isMatched } = emojiItem;
  return (
    <div
      className={`${styles.emojiCard} ${isMatched ? styles.matched : ""} ${
        isOpen ? styles.isOpen : ""
      }`}
      onClick={handleClick}
    >
      <span>{isOpen || isMatched ? emoji : "❓"}</span>
    </div>
  );
};

const Memory = () => {
  const [grid, setGrid] = useState(getRandomEmojis());
  const [currentlyOpen, setCurrentlyOpen] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [showRules, setShowRules] = useState(false);

  // Check if all cards are matched
  useEffect(() => {
    if (grid.every((card) => card.isMatched)) {
      setIsWinner(true);
    }
  }, [grid]);

  // Handle card click
  const handleClick = (index) => {
    if (isChecking || grid[index].isOpen || grid[index].isMatched) return;

    const newGrid = grid.map((card, i) =>
      i === index ? { ...card, isOpen: true } : card
    );

    setGrid(newGrid);
    setCurrentlyOpen([...currentlyOpen, index]);

    if (currentlyOpen.length === 1) {
      setIsChecking(true);
      setMoveCount((prev) => prev + 1); // Increment move count
      setTimeout(() => checkMatch(newGrid, currentlyOpen[0], index), 800);
    }
  };

  // Check if the two open cards match
  const checkMatch = (newGrid, firstIndex, secondIndex) => {
    if (newGrid[firstIndex].emoji === newGrid[secondIndex].emoji) {
      newGrid[firstIndex].isMatched = true;
      newGrid[secondIndex].isMatched = true;
    } else {
      newGrid[firstIndex].isOpen = false;
      newGrid[secondIndex].isOpen = false;
    }

    setGrid([...newGrid]);
    setCurrentlyOpen([]);
    setIsChecking(false);
  };

  // Reset the game
  const resetGame = () => {
    setGrid(getRandomEmojis());
    setCurrentlyOpen([]);
    setIsChecking(false);
    setIsWinner(false);
    setMoveCount(0);
  };

  return (
    <div className={styles.memoryGameContainer}>
      <h1>Memory Game</h1>

      {isWinner && (
        <div className={styles.winnerMessage}>
          🎉 You Won in {moveCount} moves! 🎉
          <button className={styles.resetButton} onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

      <div className={styles.gridContainer}>
        {grid.map((emojiItem, index) => (
          <EmojiCard
            key={emojiItem.id}
            emojiItem={emojiItem}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>

      <div className={styles.gameInfo}>
        <p>Moves: {moveCount}</p>
        <button className={styles.resetButton} onClick={resetGame}>
          Reset Game
        </button>

        <button
          className={styles.rulesButton}
          onClick={() => setShowRules(true)}
        >
          Rules
        </button>

        {showRules && <Rules onClose={() => setShowRules(false)} />}
      </div>
    </div>
  );
};

export default Memory;
