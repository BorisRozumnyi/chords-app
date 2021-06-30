import { createContext } from "react";

type ChordContextValue = {
  originTonality: string;
  currentTonality: string;
  setOriginTonality: (value: string) => void;
  setCurrentTonality: (value: string) => void;
};

export const ChordContext =
  createContext<ChordContextValue>({
    originTonality: "",
    currentTonality: "",
    setOriginTonality: () => undefined,
    setCurrentTonality: () => undefined,
  });
