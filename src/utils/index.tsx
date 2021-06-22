export const isTitle = (row: string) => {
  const c = [
    "припев:",
    "куплет:",
    "бридж:",
  ];
  return c.some((m) =>
    row.toLowerCase().includes(m)
  );
};

export const isChords = (row: string) => {
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
  const ALTERATION_SIGNS = [
    "#",
    "b",
  ];
  const TONE_LAD = [
    "m",
    "maj",
    "dim",
    "+",
    "sus",
  ];
  let generated_list: string[] = [];
  CHORDS_LIST.forEach((c) => {
    generated_list.push(c);
    ALTERATION_SIGNS.forEach((a) =>
      generated_list.push(c + a)
    );
  });
  const chordsFromRow = row
    ?.split(" ")
    .filter((rowItem) => rowItem);

  const res = chordsFromRow?.every(
    (chordInput) => {
      return generated_list.some(
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