import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import KazoeBeats from "./pages/KazoeBeats";
import Counters from "./pages/Counters";
import About from "./pages/About";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<KazoeBeats theme={theme} />} />
          <Route path="/counters" element={<Counters />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>Made with ❤️ for mastering Japanese Numbers</footer>
      </div>
    </Router>
  );
}
