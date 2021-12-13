export type note =
  | 'C'
  | 'C#'
  | 'Cb'
  | 'D'
  | 'D#'
  | 'Db'
  | 'E'
  | 'Eb'
  | 'F'
  | 'F#'
  | 'Fb'
  | 'G'
  | 'G#'
  | 'Gb'
  | 'A'
  | 'A#'
  | 'Ab'
  | 'B'
  | 'H';

const T = [
  {
    natural: 'C',
    enharmonicSharp: 'H#',
    enharmonicFlat: '',
  },
  {
    natural: 'C#',
    enharmonicSharp: '',
    enharmonicFlat: 'Db',
  },
  {
    natural: 'D',
    enharmonicSharp: '',
    enharmonicFlat: '',
  },
  {
    natural: 'D#',
    enharmonicSharp: '',
    enharmonicFlat: 'Eb',
  },
  {
    natural: 'E',
    enharmonicSharp: '',
    enharmonicFlat: 'Fb',
  },
  {
    natural: 'F',
    enharmonicSharp: 'E#',
    enharmonicFlat: '',
  },
  {
    natural: 'F#',
    enharmonicSharp: '',
    enharmonicFlat: 'Gb',
  },
  {
    natural: 'G',
    enharmonicSharp: '',
    enharmonicFlat: '',
  },
  {
    natural: 'G#',
    enharmonicSharp: '',
    enharmonicFlat: 'Ab',
  },
  {
    natural: 'A',
    enharmonicSharp: '',
    enharmonicFlat: '',
  },
  {
    natural: 'A#',
    enharmonicSharp: '',
    enharmonicFlat: 'B',
  },
  {
    natural: 'H',
    enharmonicSharp: '',
    enharmonicFlat: 'Cb',
  },
];

const chordOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];

const circleOfFifths = {
  withFlats: [
    'C',
    'F',
    'B',
    'Eb',
    'Ab',
    'Db',
    'Gb',
    'Cb',
    'Fb',
    'A',
    'D',
    'G',
    'C',
  ],
  withSharps: [
    'C',
    'G',
    'D',
    'A',
    'E',
    'H',
    'F#',
    'C#',
    'G#',
    'D#',
    'A#',
    'E#',
    'H#',
  ],
};

const sharpOrder = ['F', 'C', 'G', 'D', 'A', 'E', 'H'];
const flatsOrder = ['H', 'E', 'A', 'D', 'G', 'C', 'F'];

const getParallelMajorKey = (minorKey: string) => {
  const note = minorKey.replace('m', '');
  const indexOfKeyList = TONALITIES_HARDCODE.findIndex((noteFromList) =>
    noteFromList.includes(note),
  );
  const parallelMajorKey = T[indexOfKeyList + 3];
  return parallelMajorKey;
};

export const getTonalitySteps = (tonicChord: string) => {
  const isMinor = /[A-H](#?|b?)(m)/.test(tonicChord);
  if (isMinor) getParallelMajorKey(tonicChord);

  const numberOfSharps = circleOfFifths.withSharps.findIndex((ton: string) => {
    return ton === tonicChord;
  });
  const numberOfFlats = circleOfFifths.withFlats.findIndex(
    (ton: string) => ton === tonicChord,
  );
  let numberOfSigns = '';
  if (numberOfSharps >= 0) {
    numberOfSigns = `${numberOfSharps} #`;
  } else if (numberOfFlats >= 0) {
    numberOfSigns = `${numberOfFlats} b`;
  }

  const indexOfOrder = chordOrder.findIndex((step) => {
    return tonicChord.includes(step);
  });
  const copy = chordOrder.slice();
  let restOfOrder = copy.splice(0, indexOfOrder);
  let reorderedChordOrder = copy.concat(restOfOrder);

  const tonalitySteps = reorderedChordOrder.map((step) => {
    if (numberOfSigns.includes('#')) {
      const stepsWithSings = sharpOrder.slice(0, numberOfSharps);
      const finded = stepsWithSings.find((stepForSing) => step === stepForSing);
      return finded ? finded + '#' : step;
    } else {
      const stepsWithSings = flatsOrder.slice(0, numberOfFlats);
      const finded = stepsWithSings.find((stepForSing) => step === stepForSing);
      const B = finded === 'H' ? 'B' : finded + 'b';
      return finded ? B : step;
    }
  });

  return tonalitySteps;
};

const CHORDS_LIST = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'H'];
const ALTERATION_SIGNS = ['#', 'b'];
export let TONALITIES: string[] = [];
CHORDS_LIST.forEach((c) => {
  TONALITIES.push(c);
  ALTERATION_SIGNS.forEach((a) => TONALITIES.push(c + a));
});

const TONALITIES_HARDCODE = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'B',
  'H',
];

const loopInRange = (number: number, lenghtOfRange: number) => {
  return number % lenghtOfRange;
};

export const getTransposedKey = (
  currentTonality: string,
  transposeValue: number,
) => {
  const indexOfTonality = T.findIndex(
    (sound) =>
      sound.natural === currentTonality ||
      sound.enharmonicSharp === currentTonality ||
      sound.enharmonicFlat === currentTonality,
  );
  return TONALITIES_HARDCODE[
    loopInRange(indexOfTonality + transposeValue, TONALITIES_HARDCODE.length)
  ];
};

export const transposeChord = (
  chord: string,
  originTonalitySteps: string[],
  currentTonalitySteps: string[],
) => {
  let indexes: number[] = [];
  originTonalitySteps.forEach((step, index) => {
    if (chord.includes(step)) indexes.push(index);
  });

  if (chord.includes('/'))
    return chord
      .replace(/[A-H](#?|b?)/g, currentTonalitySteps[indexes[0]])
      .replace(/\/[A-H](#?|b?)/g, `/${currentTonalitySteps[indexes[1]]}`);

  return chord.replace(/[A-H]/g, currentTonalitySteps[indexes[0]]);
};

export const sectionTypes = [
  'вступление:',
  'куплет:',
  'припев:',
  'проигрыш:',
  'бридж:',
  'конец:',
];

export const isTitle = (row: string) => {
  return sectionTypes.some((m) => row.toLowerCase().includes(m));
};

export const isChords = (row: string) => {
  const chordsFromRow = row?.split(' ').filter((rowItem) => rowItem);

  const res = chordsFromRow?.every((chordInput) => {
    return TONALITIES.some((chord) => {
      return chordInput.includes(chord);
    });
  });

  return res;
};
