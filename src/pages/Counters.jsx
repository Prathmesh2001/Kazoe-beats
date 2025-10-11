import React, { useState, useEffect, useRef } from "react";
import { speakJapaneseNumber } from "../utils/speechUtilsJP"; // reuse same speech logic

// --- 🎌 Object Lists by Counter Type ---
export const COUNTER_GROUPS = {
  人: ["かぞく (family)", "ともだち (friend)", "せんせい (teacher)", "がくせい (student)", "いしゃ (doctor)"],
  本: ["ペン (pen)", "えんぴつ (pencil)", "ボトル (bottle)", "き (tree)", "ストロー (straw)"],
  枚: ["かみ (paper)", "シャツ (shirt)", "しゃしん (photo)", "チケット (ticket)", "タオル (towel)"],
  匹: ["ねこ (cat)", "いぬ (dog)", "うさぎ (rabbit)", "さる (monkey)", "ねずみ (mouse)"],
  個: ["りんご (apple)", "ボール (ball)", "たまご (egg)", "みかん (orange)", "キャンディー (candy)"],
  回: ["しけん (exam)", "かいぎ (meeting)", "じゅぎょう (class)", "トレーニング (training)", "ゲーム (game)"],

  冊: ["ほん (book)", "ざっし (magazine)", "ノート (notebook)", "じしょ (dictionary)", "パンフレット (pamphlet)"],
  台: ["くるま (car)", "パソコン (computer)", "テレビ (TV)", "でんしゃ (train)", "じてんしゃ (bicycle)"],
  階: ["たてもの (building)", "ホテル (hotel)", "デパート (department store)", "マンション (apartment)", "ビル (building)"],
  羽: ["とり (bird)", "うさぎ (rabbit)", "カラス (crow)", "スズメ (sparrow)", "ハト (pigeon)"],
  杯: ["コーヒー (coffee)", "みず (water)", "さけ (sake)", "ジュース (juice)", "おちゃ (tea)"],
  足: ["くつ (shoes)", "くつした (socks)", "サンダル (sandals)", "ブーツ (boots)", "スリッパ (slippers)"],
};

// --- 🧭 Counter Info (for display & learning) ---
export const COUNTER_INFO = {
  人: { usage: "Used for counting people", example: "にん (nin)" },
  本: { usage: "Used for long cylindrical objects", example: "ほん (hon)" },
  匹: { usage: "Used for small animals", example: "ひき (hiki)" },
  枚: { usage: "Used for flat/thin objects like paper, plates", example: "まい (mai)" },
  個: { usage: "Used for small round/general objects", example: "こ (ko)" },
  回: { usage: "Used for counting occurrences/times", example: "かい (kai)" },
  台: { usage: "Used for machines or vehicles", example: "だい (dai)" },
  冊: { usage: "Used for bound objects like books", example: "さつ (satsu)" },
  階: { usage: "Used for counting floors/stories of buildings", example: "かい (kai)" },
  羽: { usage: "Used for birds or rabbits", example: "わ (wa)" },
  杯: { usage: "Used for cups, glasses of drinks", example: "はい (hai)" },
  着: { usage: "Used for clothes", example: "ちゃく (chaku)" },
  足: { usage: "Used for pairs of footwear or socks", example: "そく (soku)" },
  通: { usage: "Used for letters, emails", example: "つう (tsuu)" },
  箱: { usage: "Used for boxes or containers", example: "はこ (hako)" },
  番: { usage: "Used for numbers in order (like bus number)", example: "ばん (ban)" },
  年: { usage: "Used for years", example: "ねん (nen)" },
  月: { usage: "Used for months", example: "がつ (gatsu)" },
  日: { usage: "Used for days", example: "にち (nichi)" },
  時: { usage: "Used for hours (time)", example: "じ (ji)" },
  分: { usage: "Used for minutes", example: "ふん/ぷん (fun/pun)" },
};



// --- 🎧 Component ---
export default function CountersListeningMode() {
  const [selectedCounters, setSelectedCounters] = useState([]);
  const [duration, setDuration] = useState(10); // minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState([]);
  const intervalRef = useRef(null);

  const handleCounterSelect = (counter) => {
    setSelectedCounters((prev) =>
      prev.includes(counter) ? prev.filter((c) => c !== counter) : [...prev, counter]
    );
  };

  const generateRandomEntry = () => {
    const counter = selectedCounters[Math.floor(Math.random() * selectedCounters.length)];
    const number = Math.floor(Math.random() * 10) + 1; // 1–10 for practice
    const objects = COUNTER_GROUPS[counter];
    const object = objects[Math.floor(Math.random() * objects.length)];
    return { counter, number, object };
  };

  const startListening = () => {
    if (selectedCounters.length === 0) {
      alert("Please select at least one counter.");
      return;
    }
    setIsPlaying(true);
    setResults([]);
    const newResults = [];

    const totalDuration = duration * 60 * 1000; // ms
    const intervalTime = 3500; // 3.5 sec between calls
    const totalIterations = Math.floor(totalDuration / intervalTime);

    let count = 0;
    intervalRef.current = setInterval(() => {
      if (count >= totalIterations) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      const entry = generateRandomEntry();
      const objectJP = entry.object.split(" ")[0]; // e.g. ペン
      speakJapaneseNumber(entry.number, entry.counter, objectJP);
      newResults.push(entry);
      setResults([...newResults]);
      count++;
    }, intervalTime);
  };

  const stopListening = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  return (
    <div className="counter-mode-container">
      <h1>🎧 Japanese Counter Listening Practice</h1>
      <div className="grammar-tip">
  <h3>💡 Grammar Tip:</h3>
  <p>
    When counting standalone items (like in listening practice), you can say: <br />
    <b>「ろっぽん ペン」</b> — “six pens” (just the counter phrase).
  </p>
  <p>
    But in full sentences, the order changes depending on the grammar: <br />
    <b>「ペンをろっぽんください」</b> → Please give me six pens. <br />
    <b>「ペンがろっぽんあります」</b> → There are six pens.
  </p>
  <p>
    🧭 Rule: Use <b>object + particle (を/が) + counter phrase</b> in sentences.
  </p>
</div>


      <div className="counter-selection">
        <h3>Select Counters:</h3>
        <div className="counter-grid">
  {Object.entries(COUNTER_GROUPS).map(([symbol, objs]) => {
    const info = COUNTER_INFO[symbol] || {};
    return (
      <div key={symbol} className="counter-card">
        <button
          className={`counter-btn ${selectedCounters.includes(symbol) ? "selected" : ""}`}
          onClick={() => handleCounterSelect(symbol)}
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

      <div className="results">
        <h3>📜 Practice Results</h3>
        {results.length === 0 ? (
          <p>No results yet. Start listening!</p>
        ) : (
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                <b>{r.number}{r.counter}</b> — {r.object} — {r.number} {r.object.replace(/\(.*\)/, "").trim()} ({r.object.match(/\((.*?)\)/)?.[1]})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


//TODO: Add more counters, counter consts not matching. Segregate in N5, N4, N3.