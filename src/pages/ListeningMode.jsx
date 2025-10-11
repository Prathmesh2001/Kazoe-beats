import { useState, useEffect, useRef } from "react";
import { speakJapaneseNumber, initJapaneseVoice } from "../utils/speechUtilsJP";

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
  const [itemsSpoken, setItemsSpoken] = useState(0);
  const totalIterationsRef = useRef(0);

  useEffect(() => {
    initJapaneseVoice();
  }, []);

  const generateNumbers = (limit) => {
    const list = [];
    const maxCount = 500;
    const targetCount = Math.min(maxCount, limit + 1);
    while (list.length < targetCount) {
      const n = Math.floor(Math.random() * (limit + 1));
      if (!list.includes(n)) {
        list.push(n);
      }
    }
    setNumbers(list);
    setIndex(0);
    return list;
  };

  const startListening = () => {
    let activeNumbers = numbers;
    if (!activeNumbers.length) {
      activeNumbers = generateNumbers(range);
    }
    if (!activeNumbers.length) {
      alert("Could not generate numbers to speak.");
      return;
    }
    const totalDuration = duration * 60 * 1000;
    const delay = intervalSec * 1000;
    const maxIterationsFromTime = Math.floor(totalDuration / delay);
    totalIterationsRef.current = Math.min(activeNumbers.length, maxIterationsFromTime);
    if (totalIterationsRef.current === 0) {
      alert("Duration is too short for the selected interval.");
      return;
    }
    setIsPlaying(true);
    setItemsSpoken(0);
    let count = 0;
    const speakNext = () => {
      if (count >= totalIterationsRef.current) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      const currentNum = activeNumbers[count];
      speakJapaneseNumber(currentNum);
      setItemsSpoken(count + 1);
      count++;
    };
    speakNext();
    intervalRef.current = setInterval(speakNext, delay);
  };

  const stopListening = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    window.speechSynthesis.cancel();
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
        {isPlaying && (
          <p className="progress-display">
            Current: {itemsSpoken} / {totalIterationsRef.current}
          </p>
        )}
        {!isPlaying ? (
          <button className="btn start" onClick={startListening}>▶️ Start</button>
        ) : (
          <button className="btn stop" onClick={stopListening}>⏹ Stop</button>
        )}
      </div>
    </div>
  );
}