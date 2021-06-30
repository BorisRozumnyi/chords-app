import { createContext } from 'react';

type ChordContextValue = {
  tonality: string;
  setTonality: (value: string) => void;
};

export const ChordContext = createContext<ChordContextValue>({
  tonality: '',
  setTonality: () => undefined,
});
