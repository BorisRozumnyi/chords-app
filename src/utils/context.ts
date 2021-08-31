import { createContext } from 'react';

type ChordContextValue = {
  originTonality: string;
  currentTonality: string;
  originTonalitySteps: string[];
  currentTonalitySteps: string[];
  setOriginTonality: (value: string) => void;
  setCurrentTonality: (value: string) => void;
  setOriginTonalitySteps: (value: string[]) => void;
  setCurrentTonalitySteps: (value: string[]) => void;
};

export const ChordContext = createContext<ChordContextValue>({
  originTonality: '',
  currentTonality: '',
  originTonalitySteps: [],
  currentTonalitySteps: [],
  setOriginTonality: () => undefined,
  setCurrentTonality: () => undefined,
  setOriginTonalitySteps: () => undefined,
  setCurrentTonalitySteps: () => undefined,
});
