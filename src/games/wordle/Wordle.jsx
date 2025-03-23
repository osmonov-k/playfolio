import React, { useState, useEffect } from "react";
import styles from "./wordle.module.css";
import VirtualKeyboard from "./Keyboard";
import WORDS from "./wordsList";
import Rules from "./Rules";

const Wordle = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false); // State for rules modal

  // Set a random target word from the predefined list
  useEffect(() => {
    const randomWord =
      WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setTargetWord(randomWord);
  }, []);

  // Validate word using DictionaryAPI
  const validateWord = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      // check for 404 status
      if (response.status === 404) {
        return false; // Word is not valid
      }

      //  other errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return true; // Word is valid
    } catch (error) {
      console.error("Error validating word:", error);
      return false; // Word is not valid
    }
  };

  // Handle key press from physical keyboard
  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (isGameOver) return;

      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      } else if (key === "BACKSPACE" && currentGuess.length > 0) {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "ENTER" && currentGuess.length === 5) {
        await handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, isGameOver]);

  // Handle submit logic
  const handleSubmit = async () => {
    const isValidWord = await validateWord(currentGuess);
    if (!isValidWord) {
      setPopupMessage("Word is not valid!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return; // Exit early if the word is invalid
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);

    if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
      setPopupMessage("You win! 🎉");
      setIsGameOver(true);
      setShowPopup(true);
    } else if (currentRow === 5) {
      setPopupMessage(`You lose! The word was ${targetWord}.`);
      setIsGameOver(true);
      setShowPopup(true);
    } else {
      updateKeyboardStatus(currentGuess);
      setCurrentRow(currentRow + 1);
      setCurrentGuess("");
    }
  };

  // Update keyboard status based on the current guess
  const updateKeyboardStatus = (word) => {
    const newStatus = { ...keyboardStatus };
    const targetLetters = targetWord.toUpperCase().split("");

    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toUpperCase();

      if (targetWord[i].toUpperCase() === letter) {
        newStatus[letter] = "correct";
      } else if (targetLetters.includes(letter)) {
        if (newStatus[letter] !== "correct") {
          newStatus[letter] = "present";
        }
      } else {
        newStatus[letter] = "absent";
      }
    }

    setKeyboardStatus(newStatus);
  };

  // Handle virtual keyboard clicks
  const handleVirtualKeyboardClick = async (key) => {
    if (isGameOver) return;

    if (key === "ENTER") {
      if (currentGuess.length === 5) {
        await handleSubmit();
      }
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  // Reset the game
  const resetGame = () => {
    const randomWord =
      WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setTargetWord(randomWord);
    setGuesses(Array(6).fill(""));
    setCurrentRow(0);
    setCurrentGuess("");
    setKeyboardStatus({});
    setIsGameOver(false);
    setPopupMessage("");
    setShowPopup(false);
  };

  // Render a cell in the grid
  const renderCell = (letter, index, rowIndex) => {
    let className = styles.cell;
    if (rowIndex < currentRow || (rowIndex === currentRow && isGameOver)) {
      if (letter.toUpperCase() === targetWord[index].toUpperCase()) {
        className += ` ${styles.cellCorrect}`;
      } else if (targetWord.toUpperCase().includes(letter.toUpperCase())) {
        className += ` ${styles.cellPresent}`;
      } else {
        className += ` ${styles.cellAbsent}`;
      }
    } else if (rowIndex === currentRow) {
      letter = currentGuess[index] || "";
    }
    return (
      <div key={index} className={className}>
        {letter}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wordle Game</h1>
      <div className={styles.grid}>
        {guesses.map((word, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {Array(5)
              .fill("")
              .map((_, index) =>
                renderCell(word[index] || "", index, rowIndex)
              )}
          </div>
        ))}
      </div>
      <VirtualKeyboard
        keyboardStatus={keyboardStatus}
        onKeyClick={handleVirtualKeyboardClick}
      />
      {showPopup && (
        <div className={styles.popup}>
          <p>{popupMessage}</p>
        </div>
      )}
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

export default Wordle;
