import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>PLAY</span>FOLIO
        </Link>

        <div className={styles.menu}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Games ▼</button>
            <div className={styles.dropdownContent}>
              <NavLink
                to="/connectfour"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Connect Four
              </NavLink>
              <NavLink
                to="/wordle"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Wordle
              </NavLink>
            </div>
          </div>
          <NavLink to="/about" className={styles.navItem}>
            About
          </NavLink>
          <NavLink to="/leaderboards" className={styles.navItem}>
            Leaderboards
          </NavLink>
        </div>

        <div className={styles.auth}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
