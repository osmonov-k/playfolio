import React from "react";
import styles from "./rules.module.css";

const Rules = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>How To Play</h2>
        <p>Guess the Wordle in 6 tries.</p>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>

        <h3>Examples</h3>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleRow}>
            <div className={`${styles.exampleCell} ${styles.correct}`}>W</div>
            <div className={styles.exampleCell}>O</div>
            <div className={styles.exampleCell}>R</div>
            <div className={styles.exampleCell}>D</div>
            <div className={styles.exampleCell}>Y</div>
          </div>
          <p>W is in the word and in the correct spot.</p>
        </div>

        <div className={styles.exampleGrid}>
          <div className={styles.exampleRow}>
            <div className={styles.exampleCell}>L</div>
            <div className={`${styles.exampleCell} ${styles.present}`}>I</div>
            <div className={styles.exampleCell}>G</div>
            <div className={styles.exampleCell}>H</div>
            <div className={styles.exampleCell}>T</div>
          </div>
          <p>I is in the word but in the wrong spot.</p>
        </div>

        <div className={styles.exampleGrid}>
          <div className={styles.exampleRow}>
            <div className={styles.exampleCell}>R</div>
            <div className={styles.exampleCell}>O</div>
            <div className={styles.exampleCell}>G</div>
            <div className={`${styles.exampleCell} ${styles.absent}`}>U</div>
            <div className={styles.exampleCell}>E</div>
          </div>
          <p>U is not in the word in any spot.</p>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Rules;
