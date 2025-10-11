import { useState } from "react";
import { speakJapaneseNumber, initJapaneseVoice } from "../utils/speechUtilsJP";

export default function KazoeBeats({ theme }) {
  const [range, setRange] = useState(10);
  const [questionCount, setQuestionCount] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [number, setNumber] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState(new Set());

  initJapaneseVoice();

  const generateUniqueNumber = () => {
    if (usedNumbers.size >= range + 1) setUsedNumbers(new Set());
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (range + 1));
    } while (usedNumbers.has(randomNum));
    setUsedNumbers((prev) => new Set([...prev, randomNum]));
    return randomNum;
  };

  const startGame = () => {
    setScore(0);
    setCurrentQuestion(1);
    setGameOver(false);
    setFeedback(null);
    setUsedNumbers(new Set());
    nextNumber();
  };

  const nextNumber = () => {
    const randomNum = generateUniqueNumber();
    setNumber(randomNum);
    setUserInput("");
    setRevealed(false);
    setFeedback(null);
    speakJapaneseNumber(randomNum, "");
  };

  const handleRepeat = () => {
    if (number !== null) speakJapaneseNumber(number);
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(userInput) === number;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestion === questionCount) setGameOver(true);
      else {
        setCurrentQuestion((prev) => prev + 1);
        nextNumber();
      }
    }, 1000);
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setNumber(null);
    setUserInput("");
    setFeedback(null);
    setUsedNumbers(new Set());
  };

  return (
    <div className="quiz-card">
      <h1>Kazoe Beats 🎧</h1>

      {currentQuestion === 0 && !gameOver && (
        <div className="menu">
          <h2>🎮 Start Training</h2>
          <div className="form-group">
            <label>Difficulty</label>
            <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
              <option value="10">0–10</option>
              <option value="100">0–100</option>
              <option value="1000">0–1000</option>
              <option value="10000">0–10000</option>
            </select>
          </div>

          <div className="form-group">
            <label>Questions</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button className="btn start" onClick={startGame}>
            ▶️ Start
          </button>
        </div>
      )}

      {currentQuestion > 0 && !gameOver && (
        <div className="game">
          <h3>
            Question {currentQuestion}/{questionCount}
          </h3>

          <div className="actions">
            <button className="btn small" onClick={handleRepeat}>🔁 Repeat</button>
            <button className="btn small" onClick={() => setRevealed(true)}>👀 Reveal</button>
          </div>

          {revealed && <div className="number">{number}</div>}

          <input
            type="number"
            placeholder="Enter what you heard"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          {!feedback && (
            <button className="btn submit" onClick={checkAnswer}>
              ✅ Submit
            </button>
          )}

          {feedback && (
            <p className={`feedback ${feedback === "correct" ? "correct" : "wrong"}`}>
              {feedback === "correct" ? "✔️ Correct!" : "❌ Wrong!"}
            </p>
          )}
        </div>
      )}

      {gameOver && (
        <div className="result">
          <h2>🎉 All done!</h2>
          <p>You scored <strong>{score}</strong> / {questionCount}</p>
          <button className="btn" onClick={resetGame}>🔁 Play Again</button>
        </div>
      )}
    </div>
  );
}
