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

export const isTitle = (row: string) => {
  return sectionTypes.some((m) =>
    row.toLowerCase().includes(m)
  );
};

export const isChords = (row: string) => {
  
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