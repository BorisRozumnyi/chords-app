import React, {
  useEffect,
  useState,
} from "react";

type Props = {
  songContent: string;
  content?: (val: any) => void;
};

export const RenderSong: React.FC<Props> =
  ({ songContent }) => {
    const isChords = (row: string) => {
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
      const ALTERATION_SIGNS = [
        "#",
        "b",
      ];
      const TONE_LAD = [
        "m",
        "maj",
        "dim",
        "+",
        "sus",
      ];
      let generated_list: string[] = [];
      CHORDS_LIST.forEach((c) => {
        generated_list.push(c);
        ALTERATION_SIGNS.forEach((a) =>
          generated_list.push(c + a)
        );
      });
      const chordsFromRow = row
        ?.split(" ")
        .filter((rowItem) => rowItem);

      const res = chordsFromRow?.every(
        (chordInput) => {
          return generated_list.some(
            (chord) => {
              return chordInput.includes(
                chord
              );
            }
          );
        }
      );

      return res;
    };

    const [textRows, setTextRows] =
      useState([] as string[]);
    useEffect(() => {
      setTextRows(
        songContent.split("\n")
      );
      isChords(textRows[1]);
    }, [songContent]);

    return (
      <>
        {textRows.map((row) => {
          return isChords(row) ? (
            <h3 key={row}>{row}</h3>
          ) : (
            <p>{row}</p>
          );
        })}
      </>
    );
  };
