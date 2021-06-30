import React, { useContext } from "react";
import { ChordContext } from "../utils/context";
import { ChordButtom } from "../styles";

const CHORDS_LIST = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];
const ALTERATION_SIGNS = ["#", "b"];
let generated_list: string[] = [];
CHORDS_LIST.forEach((c) => {
  generated_list.push(c);
  ALTERATION_SIGNS.forEach((a) =>
    generated_list.push(c + a)
  );
});

type Props = {
  changeKey: (val: any) => void;
};

export const KeyRange: React.FC<Props> =
  ({ changeKey }) => {
    const {currentTonality} = useContext(ChordContext);
    return(
    <>
      {generated_list.map((item) => (
        <ChordButtom
          key={item}
          onClick={() =>
            changeKey(item)
          }
          active={item === currentTonality}
        >
          {item}
        </ChordButtom>
      ))}
    </>
  )};
