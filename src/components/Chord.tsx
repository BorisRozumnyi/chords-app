import React, { useContext } from 'react';
import { getTonalitySteps } from '../utils';
import { ChordContext } from '../utils/context';

type Props = {
  initialChord?: string;
  newChord?: string;
};

export const Chord: React.FC<Props> = ({ children }) => {
  const { originTonality, currentTonality } = useContext(ChordContext);
  const indexOfsteps = getTonalitySteps(originTonality).findIndex(
    (step) => step === children,
  );

  const transposedChord = getTonalitySteps(currentTonality)[indexOfsteps];

  if (currentTonality === originTonality) return <span>{children}</span>;
  else return <span>{transposedChord}</span>;
};
