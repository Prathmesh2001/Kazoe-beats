import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">🎧 Kazoe Beats</div>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Beats</Link>
        </li>
        <li className={location.pathname === "/counters" ? "active" : ""}>
          <Link to="/counters">Counters</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
      </ul>
       <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
}
