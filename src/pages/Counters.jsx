import React, { useState, useEffect, useRef } from "react";
import { speakJapaneseNumber } from "../utils/speechUtilsJP";
import { JLPT_COUNTER_GROUPS, COUNTER_INFO, ALL_COUNTER_GROUPS } from "../utils/counterData";

// --- 🎧 Component ---
export default function CountersListeningMode() {
  const [selectedCounters, setSelectedCounters] = useState([]);
  const [duration, setDuration] = useState(10); // minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState('N5');
  const [practiceQueue, setPracticeQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0); 
  const intervalRef = useRef(null);

  const currentLevelCounters = JLPT_COUNTER_GROUPS[level] || {};

  useEffect(() => {
    // When the level changes, clear the selection, but ensure the queue is stopped/cleared
    setSelectedCounters([]);
    if (isPlaying) {
        stopListening(); // Stop any active session when context changes
    }
  }, [level]); // Added isPlaying to the dependency array to ensure a clean stop when changing levels

  const handleCounterSelect = (counter) => {
    setSelectedCounters((prev) =>
      prev.includes(counter) ? prev.filter((c) => c !== counter) : [...prev, counter]
    );
  };

  const generateRandomEntry = (activeCounters) => {
    const counter = activeCounters[Math.floor(Math.random() * activeCounters.length)];
    const number = Math.floor(Math.random() * 10) + 1;
    const objects = ALL_COUNTER_GROUPS[counter];
    
    let object = "";
    if (objects && objects.length > 0) {
        object = objects[Math.floor(Math.random() * objects.length)];
    }
    
    return { counter, number, object };
  };
  
  const generatePracticeQueue = (activeCounters, totalIterations) => {
      const queue = [];
      for (let i = 0; i < totalIterations; i++) {
          queue.push(generateRandomEntry(activeCounters));
      }
      return queue;
  }

  const startListening = () => {
    if (selectedCounters.length === 0) {
      alert("Please select at least one counter.");
      return;
    }

    const totalDuration = duration * 60 * 1000;
    const intervalTime = 3500;
    const totalIterations = Math.floor(totalDuration / intervalTime);
    
    const newQueue = generatePracticeQueue(selectedCounters, totalIterations);
    setPracticeQueue(newQueue);
    setQueueIndex(0);
    
    setIsPlaying(true);
    
    let currentCount = 0;
    
    const processNextEntry = () => {
        if (currentCount >= newQueue.length) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return;
        }

        const entry = newQueue[currentCount];
        
        const objectJP = entry.object ? entry.object.split(" ")[0] : "";
        speakJapaneseNumber(entry.number, entry.counter, objectJP);
        
        setQueueIndex(currentCount + 1);
        currentCount++;
    };

    processNextEntry(); 
    
    intervalRef.current = setInterval(processNextEntry, intervalTime);
  };

  const stopListening = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setPracticeQueue([]);
    setQueueIndex(0);
    window.speechSynthesis.cancel();
  };
  
  const currentResult = practiceQueue[queueIndex - 1];
  
  return (
    <div className="counter-mode-container">
      <h1>🎧 Japanese Counter Listening Practice</h1>
      <div className="grammar-tip">
  <h3>💡 Grammar Tip:</h3>
  <p>
    When counting standalone items (like in listening practice), you can say: <br />
    <b>「ろっぽん ペン」</b> — “six pens”.
  </p>
  <p>
    🧭 Rule: Counter phrase precedes the object in this simple format.
  </p>
</div>


      <div className="counter-selection">
        <h3>Select Counters (JLPT Level {level}):</h3>
        
        {/* FIX 2: Ensure visual feedback on level selection */}
        <div className="level-selection">
          {Object.keys(JLPT_COUNTER_GROUPS).map(lvl => (
            <button
              key={lvl}
              className={`level-btn ${level === lvl ? 'selected' : ''}`}
              onClick={() => setLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="counter-grid">
  {Object.entries(currentLevelCounters).map(([symbol, objs]) => {
    const info = COUNTER_INFO[symbol] || {};
    return (
      <div 
        key={symbol} 
        className={`counter-card ${selectedCounters.includes(symbol) ? "selected" : ""}`}
        onClick={() => handleCounterSelect(symbol)}
      >
        <button
          className={`counter-btn`}
          onClick={(e) => { e.stopPropagation(); handleCounterSelect(symbol); }} 
        >
          {symbol}（{info.example || "—"}）
        </button>
        <p className="counter-usage">{info.usage}</p>
      </div>
    );
  })}
</div>


      </div>

      <div className="controls">
        <label>
          ⏱ Duration:
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
            <option value={20}>20 min</option>
          </select>
        </label>

        {!isPlaying ? (
          <button className="start-btn" onClick={startListening}>▶ Start Listening</button>
        ) : (
          <button className="stop-btn" onClick={stopListening}>⏹ Stop</button>
        )}
      </div>
      
      <div className="status-bar">
        Selected: <b>{selectedCounters.join(', ') || 'None'}</b>
      </div>
      
      {isPlaying && (
        <div className="current-progress">
          Progress: {queueIndex} / {practiceQueue.length}
        </div>
      )}

      <div className="results">
        <h3>📜 Last Spoken Result</h3>
        {currentResult ? (
          <ul>
            <li>
              <b>{currentResult.number}{currentResult.counter}</b> — {currentResult.object || "N/A"}
            </li>
          </ul>
        ) : (
          <p>No results yet. Start listening!</p>
        )}
      </div>
    </div>
  );
}