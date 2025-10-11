// utils/speechUtilsJP.js

let japaneseVoice = null;

export const initJapaneseVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  japaneseVoice =
    voices.find((v) => v.name === "Kyoko" || (v.lang === "ja-JP" && v.name.includes("Female"))) ||
    voices.find((v) => v.lang === "ja-JP");
};

if (window.speechSynthesis) {
  initJapaneseVoice();
  window.speechSynthesis.onvoiceschanged = initJapaneseVoice;
}

// --- Counter-specific reading rules ---
const COUNTER_READINGS = {
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
export const speakJapaneseNumber = (num, counter, objectJP = "") => {
  if (!japaneseVoice) initJapaneseVoice();

  let phrase = "";

  if (COUNTER_READINGS[counter] && num >= 1 && num <= 10) {
    phrase = `${COUNTER_READINGS[counter][num - 1]} ${objectJP}`;
  } else {
    phrase = `${num}${counter} ${objectJP}`;
  }

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.voice = japaneseVoice;
  utterance.lang = "ja-JP";
  window.speechSynthesis.speak(utterance);
};
