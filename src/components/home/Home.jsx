import GameCard from "../gameCard/GameCard";
import styles from "./home.module.css";

const Home = () => {
  const featuredGames = [
    {
      id: 1,
      title: "Connect Four",
      path: "/connectfour",
      description: "Classic strategy game",
      color: "#6c5ce7",
    },
    {
      id: 2,
      title: "Wordle",
      path: "/wordle",
      description: "Daily word puzzle",
      color: "#00b894",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Play Classic Games <span>Reimagined</span>
          </h1>
          <p>
            Experience your favorite games with modern twists and competitive
            leaderboards
          </p>
          <button className={styles.cta}>Start Playing →</button>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Games</h2>
        <div className={styles.gamesGrid}>
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className={styles.newsletter}>
        <h3>Get Game Updates</h3>
        <div className={styles.subscribe}>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
