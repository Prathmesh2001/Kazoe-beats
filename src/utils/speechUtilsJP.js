// utils/speechUtilsJP.js

let japaneseVoice = null;
let voicesLoaded = false;

// Function to find and set the Japanese voice
export const initJapaneseVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    japaneseVoice =
      voices.find((v) => v.name === "Kyoko" || (v.lang === "ja-JP" && v.name.includes("Female"))) ||
      voices.find((v) => v.lang === "ja-JP");
    voicesLoaded = true;
    // console.log("Japanese voice initialized:", japaneseVoice ? japaneseVoice.name : "None found");
  } else {
    // console.log("Voices not loaded yet.");
  }
};

if (window.speechSynthesis) {
  // Listen for voices to load, which happens asynchronously
  window.speechSynthesis.onvoiceschanged = initJapaneseVoice;
  // Try to initialize immediately in case they are already loaded
  initJapaneseVoice();
}

// --- Counter-specific reading rules ---
const COUNTER_READINGS = {
  // ... (Keep the rest of this object exactly as it was)
  人: ["ひとり", "ふたり", "さんにん", "よにん", "ごにん", "ろくにん", "しちにん", "はちにん", "きゅうにん", "じゅうにん"],
  本: ["いっぽん", "にほん", "さんぼん", "よんほん", "ごほん", "ろっぽん", "ななほん", "はっぽん", "きゅうほん", "じゅっぽん"],
  匹: ["いっぴき", "にひき", "さんびき", "よんひき", "ごひき", "ろっぴき", "ななひき", "はっぴき", "きゅうひき", "じゅっぴき"],
  枚: ["いちまい", "にまい", "さんまい", "よんまい", "ごまい", "ろくまい", "ななまい", "はちまい", "きゅうまい", "じゅうまい"],
  個: ["いっこ", "にこ", "さんこ", "よんこ", "ごこ", "ろっこ", "ななこ", "はっこ", "きゅうこ", "じゅっこ"],
  回: ["いっかい", "にかい", "さんかい", "よんかい", "ごかい", "ろっかい", "ななかい", "はっかい", "きゅうかい", "じゅっかい"],
  冊: ["いっさつ", "にさつ", "さんさつ", "よんさつ", "ごさつ", "ろくさつ", "ななさつ", "はっさつ", "きゅうさつ", "じゅっさつ"],
  台: ["いちだい", "にだい", "さんだい", "よんだい", "ごだい", "ろくだい", "ななだい", "はちだい", "きゅうだい", "じゅうだい"],
  羽: ["いちわ", "にわ", "さんわ", "よんわ", "ごわ", "ろくわ", "ななわ", "はちわ", "きゅうわ", "じゅうわ"],
  杯: ["いっぱい", "にはい", "さんばい", "よんはい", "ごはい", "ろっぱい", "ななはい", "はっぱい", "きゅうはい", "じゅっぱい"],
  足: ["いっそく", "にそく", "さんぞく", "よんそく", "ごそく", "ろくそく", "ななそく", "はっそく", "きゅうそく", "じゅっそく"],
};


// --- Main function ---
export const speakJapaneseNumber = (num, counter = "", objectJP = "") => {
  // CRITICAL FIX: Re-check voice before speaking if not loaded, as 'onvoiceschanged' is unreliable on some hosts/browsers
  if (!japaneseVoice && !voicesLoaded) {
    initJapaneseVoice();
    if (!japaneseVoice) {
        // If still no voice, log a warning and exit.
        console.warn("SpeechSynthesis voice is unavailable.");
        return;
    }
  }

  let phrase = "";
  if (counter && COUNTER_READINGS[counter] && num >= 1 && num <= 10) {
    phrase = `${COUNTER_READINGS[counter][num - 1]} ${objectJP}`;
  } else if (!counter || counter === "") {
    // Only Japanese numbers (no counter)
    phrase = `${num}`;
  } else {
    // Other numbers > 10, or unhandled counters
    phrase = `${num}${counter} ${objectJP}`;
  }

  window.speechSynthesis.cancel(); // Clear queue before speaking
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.voice = japaneseVoice;
  utterance.lang = "ja-JP";
  window.speechSynthesis.speak(utterance);
};