import React from "react";
import styles from "./rules.module.css";

const Rules = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>How To Play Connect Four</h2>
        <p>Be the first to connect four of your pieces in a row.</p>
        <ul>
          <li>Players take turns dropping pieces into columns</li>
          <li>
            First to connect 4 horizontally, vertically, or diagonally wins
          </li>
          <li>Red goes first, then yellow alternates</li>
        </ul>

        <h3>Winning Examples</h3>
        <div className={styles.example}>
          <div className={styles.exampleRow}>
            {[0, 1, 2, 3].map((i) => (
              <div key={`h-${i}`} className={`${styles.cell} ${styles.red}`} />
            ))}
          </div>
          <p>Horizontal win</p>
        </div>

        <div className={styles.example}>
          <div className={styles.exampleCol}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={`v-${i}`}
                className={`${styles.cell} ${styles.yellow}`}
              />
            ))}
          </div>
          <p>Vertical win</p>
        </div>

        <div className={styles.example}>
          <div className={styles.exampleDiagonal}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={`d-${i}`}
                className={`${styles.cell} ${styles.red}`}
                style={{
                  position: "absolute",
                  left: `${i * 30}px`,
                  top: `${i * 30}px`,
                }}
              />
            ))}
          </div>
          <p>Diagonal win</p>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Rules;
