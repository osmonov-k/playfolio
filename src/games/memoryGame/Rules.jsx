import React from "react";
import styles from "./rules.module.css";

const Rules = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>How To Play</h2>
        <p>Match all pairs of emojis by flipping the cards.</p>
        <ul>
          <li>Click a card to reveal the emoji.</li>
          <li>Find its matching pair by clicking another card.</li>
          <li>Matching pairs stay open; non-matching pairs flip back.</li>
          <li>Match all pairs in as few moves as possible!</li>
        </ul>

        <h3>Examples</h3>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleRow}>
            <div className={`${styles.exampleCell} ${styles.matched}`}>🐱</div>
            <div className={styles.exampleCell}>❓</div>
          </div>
          <p>🐱 is matched! Cards stay open.</p>
        </div>

        <div className={styles.exampleGrid}>
          <div className={styles.exampleRow}>
            <div className={styles.exampleCell}>🐶</div>
            <div className={`${styles.exampleCell} ${styles.isOpen}`}>🐱</div>
          </div>
          <p>🐱 is revealed but not matched yet.</p>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Rules;
