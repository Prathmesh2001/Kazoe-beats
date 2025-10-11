import { useState, useEffect, useRef } from "react";
import { speakJapaneseNumber, initJapaneseVoice } from "../utils/speechUtilsJP";

// Configurable constants for select options
const DIFFICULTY_OPTIONS = [
  { value: 10, label: "0–10" },
  { value: 100, label: "0–100" },
  { value: 1000, label: "0–1000" },
  { value: 10000, label: "0–10000" },
];
const DURATION_OPTIONS = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 20, label: "20 min" },
];
const INTERVAL_OPTIONS = Array.from({ length: 8 }, (_, i) => {
  const sec = i + 3;
  return { value: sec, label: `${sec} sec` };
});

export default function ListeningMode() {
  const [range, setRange] = useState(DIFFICULTY_OPTIONS[1].value);
  const [duration, setDuration] = useState(DURATION_OPTIONS[1].value); // minutes
  const [intervalSec, setIntervalSec] = useState(5); // interval in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    initJapaneseVoice();
  }, []);

  // Generate a list of unique numbers
  const generateNumbers = (limit) => {
    const list = [];
    const count = 500;
    while (list.length < count) {
      const n = Math.floor(Math.random() * (limit + 1));
      if (!list.includes(n)) list.push(n);
    }
    setNumbers(list);
    setIndex(0);
  };

  // Start passive listening
  const startListening = () => {
    let activeNumbers = numbers;
    if (!activeNumbers.length) {
      const list = [];
      const count = 500;
      while (list.length < count) {
        const n = Math.floor(Math.random() * (range + 1));
        if (!list.includes(n)) list.push(n);
      }
      activeNumbers = list;
      setNumbers(list);
    }
    if (!activeNumbers.length) return;
    setIsPlaying(true);
    let currentIndex = 0;
    const delay = intervalSec * 1000;
    const speakNext = () => {
      const currentNum = activeNumbers[currentIndex];
      if (typeof currentNum === "number") {
        speakJapaneseNumber(currentNum);
      }
    };
    speakNext();
    intervalRef.current = setInterval(() => {
      currentIndex++;
      if (currentIndex >= activeNumbers.length) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
      } else {
        speakNext();
      }
    }, delay);
  };

  // Stop listening
  const stopListening = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  return (
    <div className="quiz-card">
      <h1>🎧 Listening Mode</h1>
      <div className="menu">
        <h2>🔊 Passive Listening</h2>
        <div className="form-group">
          <label>Difficulty</label>
          <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Duration</label>
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Interval (seconds)</label>
          <select value={intervalSec} onChange={(e) => setIntervalSec(Number(e.target.value))}>
            {INTERVAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* You can add more config or input fields here as needed */}
        {!isPlaying ? (
          <button className="btn start" onClick={startListening}>▶️ Start</button>
        ) : (
          <button className="btn stop" onClick={stopListening}>⏹ Stop</button>
        )}
      </div>
    </div>
  );
}
