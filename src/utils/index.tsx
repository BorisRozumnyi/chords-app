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

  circleOfFifths() {
    const ton = this.getTonality();

    let count = 0;
    let result: any = {
      withFlats: [],
      withSharps: [],
    };
    while (count < 7) {
      const quartStep = ton[this.loopInRange(count * 5)];
      const fifthStep = ton[this.loopInRange(count * 7)];
      count === 0 && result.withSharps.push(ton[0].natural) && result.withFlats.push(ton[0].natural);
      count && result.withSharps.push(fifthStep.enharmonicSharp || fifthStep.natural);
      count && result.withFlats.push(quartStep.enharmonicFlat || quartStep.natural);
      count++;
    }

    return result;
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
