import React, { useState, useEffect } from "react";
import styles from "./wordle.module.css";

const Wordle = () => {
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [targetWord] = useState("REACT"); // The word to guess
  const [keyboardStatus, setKeyboardStatus] = useState({}); // Tracks keyboard key states
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // Popup message
  const [isGameOver, setIsGameOver] = useState(false); // Tracks if the game is over

  // Function to validate word using DictionaryAPI
  const validateWord = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.ok; // Word is valid if the response is OK
    } catch (error) {
      console.error("Error validating word:", error);
      return false;
    }
  };

  // Handle key press from physical keyboard
  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (isGameOver) return;

      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key);
      } else if (key === "BACKSPACE" && currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (key === "ENTER" && currentGuess.length === 5) {
        const isValidWord = await validateWord(currentGuess);
        if (!isValidWord) {
          setPopupMessage("Word is not valid!");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000);
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuess === targetWord) {
          setPopupMessage("You win! 🎉");
          setIsGameOver(true);
        } else if (currentRow === 5) {
          setPopupMessage(`You lose! The word was ${targetWord}.`);
          setIsGameOver(true);
        }

        updateKeyboardStatus(currentGuess);
        setCurrentRow(currentRow + 1);
        setCurrentGuess("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, currentRow, guesses, isGameOver, targetWord]);

  // Update keyboard status based on the current guess
  const updateKeyboardStatus = (word) => {
    const newStatus = { ...keyboardStatus };
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (targetWord[i] === letter) {
        newStatus[letter] = "correct";
      } else if (targetWord.includes(letter)) {
        newStatus[letter] = "present";
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
        const isValidWord = await validateWord(currentGuess);
        if (!isValidWord) {
          setPopupMessage("Word is not valid!");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000);
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuess === targetWord) {
          setPopupMessage("You win! 🎉");
          setIsGameOver(true);
        } else if (currentRow === 5) {
          setPopupMessage(`You lose! The word was ${targetWord}.`);
          setIsGameOver(true);
        }

        updateKeyboardStatus(currentGuess);
        setCurrentRow(currentRow + 1);
        setCurrentGuess("");
      }
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  // Reset the game
  const resetGame = () => {
    setGuesses(Array(6).fill(""));
    setCurrentRow(0);
    setCurrentGuess("");
    setKeyboardStatus({});
    setIsGameOver(false);
    setPopupMessage("");
  };

  // Render a cell in the grid
  const renderCell = (letter, index, rowIndex) => {
    let className = styles.cell;
    if (rowIndex < currentRow) {
      if (letter === targetWord[index]) {
        className += ` ${styles.cellCorrect}`;
      } else if (targetWord.includes(letter)) {
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

  // Render the virtual keyboard
  const renderVirtualKeyboard = () => {
    const rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
    ];

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.keyboardRow}>
        {row.map((key) => (
          <button
            key={key}
            className={`${styles.keyboardKey} ${
              keyboardStatus[key] ? styles[keyboardStatus[key]] : ""
            }`}
            onClick={() => handleVirtualKeyboardClick(key)}
          >
            {key === "BACKSPACE" ? "⌫" : key}
          </button>
        ))}
      </div>
    ));
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
      <div className={styles.keyboard}>{renderVirtualKeyboard()}</div>
      {showPopup && (
        <div className={styles.popup}>
          <p>{popupMessage}</p>
        </div>
      )}
      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Wordle;
