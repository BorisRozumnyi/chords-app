import React, {
  useContext,
} from "react";
import { ChordContext } from "../utils/context";

type Props = {
  initialChord?: string;
  newChord?: string;
};

export const Chord: React.FC<Props> = ({
  children,
}) => {
  const {
    originTonality,
    currentTonality,
  } = useContext(ChordContext);
  if (!currentTonality)
    return <span>{children}</span>;
  else return <span>from {originTonality} to {currentTonality}</span>;
};
