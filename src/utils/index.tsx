type fromCircleOfFifths = {
  withFlats: string[];
  withSharps: string[];
};

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

export class Tonality {
  getTonality() {
    return T;
  }

  loopInRange(number: number) {
    return number % T.length;
  }

  getTonalitySteps2(tonicChord: string) {
    const isMinor = /[A-H](#?|b?)(m)/.test(tonicChord);

    const numberOfSharps = circleOfFifths.withSharps.findIndex(
      (ton: string) => ton === tonicChord,
    );
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
        const finded = stepsWithSings.find(
          (stepForSing) => step === stepForSing,
        );
        return finded ? finded + '#' : step;
      } else {
        const stepsWithSings = flatsOrder.slice(0, numberOfFlats);
        const finded = stepsWithSings.find(
          (stepForSing) => step === stepForSing,
        );
        const B = finded === 'H' ? 'B' : finded + 'b';
        return finded ? B : step;
      }
    });

    return tonalitySteps;
  }

  getTonalitySteps(tonicChord: string) {
    const indexOfTonolity = T.findIndex((tonality) => {
      if (tonicChord.includes('m')) {
        return tonicChord.replace('m', '') === tonality.natural;
      }
      return (
        tonicChord === tonality.natural ||
        tonicChord === tonality.enharmonicSharp ||
        tonicChord === tonality.enharmonicFlat
      );
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
    let result: fromCircleOfFifths = {
      withFlats: [],
      withSharps: [],
    };
    while (count < 13) {
      const quartStep = ton[this.loopInRange(count * 5)];
      const fifthStep = ton[this.loopInRange(count * 7)];
      count === 0 &&
        result.withSharps.push(ton[0].natural) &&
        result.withFlats.push(ton[0].natural);
      count &&
        result.withSharps.push(fifthStep.enharmonicSharp || fifthStep.natural);
      count &&
        result.withFlats.push(quartStep.enharmonicFlat || quartStep.natural);
      count++;
    }

    return result;
  }
}

export const getTonalitySteps = (tonicChord: string) => {
  const isMinor = /[A-H](#?|b?)(m)/.test(tonicChord);

  const numberOfSharps = circleOfFifths.withSharps.findIndex(
    (ton: string) => ton === tonicChord,
  );
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
    return `${currentTonalitySteps[indexes[0]]}/${
      currentTonalitySteps[indexes[1]]
    }`;
  return chord.replace(/[A-H]/g, currentTonalitySteps[indexes[0]]);
}

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
