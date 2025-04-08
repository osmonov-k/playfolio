import { Link } from "react-router-dom";
import styles from "./gameCard.module.css";

const GameCard = ({ game }) => {
  return (
    <div className={styles.card} style={{ "--accent": game.color }}>
      <div className={styles.content}>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <Link to={game.path} className={styles.playBtn}>
          Play Now →
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
