const counters = [
  { jp: "人 (nin)", meaning: "people" },
  { jp: "本 (hon)", meaning: "long objects" },
  { jp: "匹 (hiki)", meaning: "small animals" },
  { jp: "枚 (mai)", meaning: "flat objects" },
  { jp: "個 (ko)", meaning: "general objects" },
  { jp: "回 (kai)", meaning: "times (occurrences)" },
];

export default function Counters() {
  return (
    <div className="quiz-card">
      <h1>🔢 Japanese Counters</h1>
      <ul className="counter-list">
        {counters.map((c, i) => (
          <li key={i}>
            <strong>{c.jp}</strong> — {c.meaning}
          </li>
        ))}
      </ul>
      <p className="note">
        Tip: Try combining numbers with counters! <br /> e.g. <b>三本</b> (sanbon)
        → 3 long objects.
      </p>
        <marquee behavior="scroll" direction="left" scrollamount="5" className="scroll-note">
          <p>Quiz for this section Coming Soon!</p>
        </marquee>
    </div>
  );
}
