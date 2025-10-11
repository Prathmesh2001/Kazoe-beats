// --- 🎌 Object Lists by Counter Type - SEGREGATED BY JLPT LEVEL ---
export const JLPT_COUNTER_GROUPS = {
  N5: {
    人: ["かぞく (family)", "ともだち (friend)", "せんせい (teacher)", "がくせい (student)", "いしゃ (doctor)"],
    本: ["ペン (pen)", "えんぴつ (pencil)", "ボトル (bottle)", "き (tree)", "ストロー (straw)"],
    枚: ["かみ (paper)", "シャツ (shirt)", "しゃしん (photo)", "チケット (ticket)", "タオル (towel)"],
    匹: ["ねこ (cat)", "いぬ (dog)", "うさぎ (rabbit)", "さる (monkey)", "ねずみ (mouse)"],
    個: ["りんご (apple)", "ボール (ball)", "たまご (egg)", "みかん (orange)", "キャンディー (candy)"],
    回: ["しけん (exam)", "かいぎ (meeting)", "じゅぎょう (class)", "トレーニング (training)", "ゲーム (game)"],
    冊: ["ほん (book)", "ざっし (magazine)", "ノート (notebook)", "じしょ (dictionary)", "パンフレット (pamphlet)"],
  },
  N4: {
    台: ["くるま (car)", "パソコン (computer)", "テレビ (TV)", "でんしゃ (train)", "じてんしゃ (bicycle)"],
    羽: ["とり (bird)", "うさぎ (rabbit)", "カラス (crow)", "スズメ (sparrow)", "ハト (pigeon)"],
    杯: ["コーヒー (coffee)", "みず (water)", "さけ (sake)", "ジュース (juice)", "おちゃ (tea)"],
    足: ["くつ (shoes)", "くつした (socks)", "サンダル (sandals)", "ブーツ (boots)", "スリッパ (slippers)"],
    頭: ["うし (cow)", "うま (horse)", "ぞう (elephant)", "きりん (giraffe)", "ライオン (lion)"],
    着: ["スーツ (suit)", "ワンピース (dress)", "ジャケット (jacket)", "コート (coat)", "セーター (sweater)"],
  },
  N3: {
    階: ["たてもの (building)", "ホテル (hotel)", "デパート (department store)", "マンション (apartment)", "ビル (building)"],
    通: ["てがみ (letter)", "メール (email)", "はがき (postcard)", "ふうとう (envelope)", "しりょう (document)"],
    泊: ["りょかん (inn)", "ホテル (hotel)", "キャンプ (camping)", "りょこう (trip)"],
    軒: ["いえ (house)", "レストラン (restaurant)", "みせ (shop)", "カフェ (cafe)", "アパート (apartment)"],
    年: ["期間 (kikan)"],
    月: ["期間 (kikan)"],
  }
};

export const ALL_COUNTER_GROUPS = Object.values(JLPT_COUNTER_GROUPS).reduce((acc, level) => ({ ...acc, ...level }), {});

export const COUNTER_INFO = {
  人: { usage: "People (irregular 1-2)", example: "にん (nin)" },
  つ: { usage: "General (up to 10)", example: "ひとつ (hitotsu)" },
  本: { usage: "Long cylindrical objects", example: "ほん (hon)" },
  匹: { usage: "Small animals, insects, fish", example: "ひき (hiki)" },
  頭: { usage: "Large animals (cows, elephants)", example: "とう (tou)" },
  枚: { usage: "Flat/thin objects (paper, shirts)", example: "まい (mai)" },
  個: { usage: "Small round/general objects", example: "こ (ko)" },
  回: { usage: "Occurrences/times", example: "かい (kai)" },
  台: { usage: "Machines, vehicles, appliances", example: "だい (dai)" },
  冊: { usage: "Bound objects (books, magazines)", example: "さつ (satsu)" },
  階: { usage: "Floors/stories of buildings", example: "かい (kai)" },
  羽: { usage: "Birds or rabbits", example: "わ (wa)" },
  杯: { usage: "Cups, glasses of drinks", example: "はい (hai)" },
  着: { usage: "Suits of clothing", example: "ちゃく (chaku)" },
  足: { usage: "Pairs of footwear or socks", example: "そく (soku)" },
  通: { usage: "Letters, emails, documents", example: "つう (tsuu)" },
  泊: { usage: "Nights of stay", example: "はく (haku)" },
  軒: { usage: "Houses, buildings (small)", example: "けん (ken)" },
  番: { usage: "Numbers in order (bus number)", example: "ばん (ban)" },
  年: { usage: "Years (duration)", example: "ねん (nen)" },
  月: { usage: "Months (duration)", example: "かげつ (kagetsu)" },
  日: { usage: "Days (duration)", example: "にち (nichi)" },
  時: { usage: "Hours (time of day)", example: "じ (ji)" },
  分: { usage: "Minutes", example: "ふん/ぷん (fun/pun)" },
};
