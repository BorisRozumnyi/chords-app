const T = [
  "C",
  "C#",
  // "Cb",
  "D",
  "D#",
  // "Db",
  "E",
  // "E#",
  // "Eb",
  "F",
  "F#",
  // "Fb",
  "G",
  "G#",
  // "Gb",
  // "H#",
  // "Hb",
  // "Ab",
  "A",
  // "A#",
  "B",
  // "B#",
  // "Bb",
  "H",
];

class Tonality {
  getTonality() {
    return T;
  }

  getTonalitySteps(tonicChord: string) {
    const indexOfTonolity = T.findIndex(
      (tonality) =>
        tonality.includes(tonicChord)
    );

    T.filter((tonality, i, arr) => {});

    function* generateDurStep() {
      yield T[indexOfTonolity];
      yield T[indexOfTonolity + 2] || T[T.length - indexOfTonolity-1  + 1];
      yield T[indexOfTonolity + 4] || T[indexOfTonolity + 4 - T.length];
      yield T[indexOfTonolity + 5] || T[indexOfTonolity  + 5 - T.length];
      yield T[indexOfTonolity + 7] || T[indexOfTonolity  + 7 - T.length];
      yield T[indexOfTonolity + 9] || T[indexOfTonolity  + 9 - T.length];
      yield T[indexOfTonolity + 11] || T[indexOfTonolity  + 11 - T.length];
    }

    function* generateMollStep() {
      yield T[indexOfTonolity];
      yield T[indexOfTonolity + 2] || T[T.length - indexOfTonolity-1  + 1];
      yield T[indexOfTonolity + 3] || T[indexOfTonolity + 3 - T.length];
      yield T[indexOfTonolity + 5] || T[indexOfTonolity  + 5 - T.length];
      yield T[indexOfTonolity + 7] || T[indexOfTonolity  + 7 - T.length];
      yield T[indexOfTonolity + 8] || T[indexOfTonolity  + 8 - T.length];
      yield T[indexOfTonolity + 11] || T[indexOfTonolity  + 11 - T.length];
    }

    const major = generateDurStep();
    const minor = generateMollStep();
    let steps = [];


    for (let value of minor) {
      steps.push(value);
    }
    // console.log(
    //   T,
    //   indexOfTonolity,
    //   T.length,
    //   T.length - indexOfTonolity
    // );
    return steps;
  }
}

console.log(
  new Tonality().getTonalitySteps("C#")
);

const CHORDS_LIST = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];
const ALTERATION_SIGNS = ["#", "b"];
export let TONALITIES: string[] = [];
CHORDS_LIST.forEach((c) => {
  TONALITIES.push(c);
  ALTERATION_SIGNS.forEach((a) =>
    TONALITIES.push(c + a)
  );
});

export const sectionTypes = [
  "вступление:",
  "куплет:",
  "припев:",
  "проигрыш:",
  "бридж:",
  "конец:",
];

export const isTitle = (
  row: string
) => {
  return sectionTypes.some((m) =>
    row.toLowerCase().includes(m)
  );
};

export const isChords = (
  row: string
) => {
  const chordsFromRow = row
    ?.split(" ")
    .filter((rowItem) => rowItem);

  const res = chordsFromRow?.every(
    (chordInput) => {
      return TONALITIES.some(
        (chord) => {
          return chordInput.includes(
            chord
          );
        }
      );
    }
  );

  return res;
};
