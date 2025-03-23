import React from "react";
import styles from "./wordle.module.css";

const VirtualKeyboard = ({ keyboardStatus, onKeyClick }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  return (
    <div className={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboardRow}>
          {row.map((key) => (
            <button
              key={key}
              className={`${styles.keyboardKey} ${
                keyboardStatus[key] ? styles[keyboardStatus[key]] : ""
              }`}
              onClick={() => onKeyClick(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
