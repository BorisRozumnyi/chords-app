import React, { useContext } from 'react';
import { transposeChord } from '../utils';
import { ChordContext } from '../utils/context';

type Props = {
  initialChord?: string;
  newChord?: string;
};

export const Chord: React.FC<Props> = ({ children }) => {
  const {
    originTonality,
    currentTonality,
    originTonalitySteps,
    currentTonalitySteps,
  } = useContext(ChordContext);

  const transposedChord = transposeChord(
    String(children),
    originTonalitySteps,
    currentTonalitySteps,
  );

  if (currentTonality === originTonality) return <span>{children}</span>;
  else return <span>{transposedChord}</span>;
};
