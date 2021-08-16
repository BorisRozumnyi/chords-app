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

export class Tonality {
  getTonality() {
    return T;
  }

  loopInRange(number: number) {
    return number % T.length;
  }

  getTonalitySteps(tonicChord: string) {
    const indexOfTonolity = T.findIndex((tonality) => {
      if (tonicChord.includes('m')) {
        return tonicChord.replace('m', '') === tonality.natural;
      }
      return tonicChord === tonality.natural;
    });

    function* generateDurStep() {
      yield T[indexOfTonolity];
      yield T[indexOfTonolity + 2] || T[T.length - indexOfTonolity + 2];
      yield T[indexOfTonolity + 4] || T[indexOfTonolity + 4 - T.length];
      yield T[indexOfTonolity + 5] || T[indexOfTonolity + 5 - T.length];
      yield T[indexOfTonolity + 7] || T[indexOfTonolity + 7 - T.length];
      yield T[indexOfTonolity + 9] || T[indexOfTonolity + 9 - T.length];
      yield T[indexOfTonolity + 11] || T[indexOfTonolity + 11 - T.length];
    }

    function* generateMollStep() {
      yield T[indexOfTonolity];
      yield T[indexOfTonolity + 2] || T[T.length - indexOfTonolity + 2];
      yield T[indexOfTonolity + 3] || T[indexOfTonolity + 3 - T.length];
      yield T[indexOfTonolity + 5] || T[indexOfTonolity + 5 - T.length];
      yield T[indexOfTonolity + 7] || T[indexOfTonolity + 7 - T.length];
      yield T[indexOfTonolity + 8] || T[indexOfTonolity + 8 - T.length];
      yield T[indexOfTonolity + 11] || T[indexOfTonolity + 11 - T.length];
    }

    const major = generateDurStep();
    const minor = generateMollStep();
    const harmony = tonicChord.includes('m') ? minor : major;
    let steps = [];

    for (let value of harmony) {
      steps.push(value);
    }

    return steps;
  }

  fifthCircle() {
    const ton = this.getTonality();

    let count = 0;
    let result = [];
    while (count < 12) {
      count === 0 && result.push(ton[0]);
      count && result.push(ton[this.loopInRange(count * 7)]);
      count++;
    }

    return result.map((item, index, arr) => {
      if (index < arr.length / 2) {
        return item.natural || item.enharmonicSharp;
      } else {
        return item.enharmonicFlat || item.natural;
      }
    });
  }
}

const CHORDS_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ALTERATION_SIGNS = ['#', 'b'];
export let TONALITIES: string[] = [];
CHORDS_LIST.forEach((c) => {
  TONALITIES.push(c);
  ALTERATION_SIGNS.forEach((a) => TONALITIES.push(c + a));
});

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
