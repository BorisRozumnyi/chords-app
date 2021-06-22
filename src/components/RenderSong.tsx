import React, {
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

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
      <Wrapper>
        {textRows.map((row) => {
          return isChords(row) ? (
            <Chords key={row}>
              {row}
            </Chords>
          ) : (
            <Text>{row}</Text>
          );
        })}
      </Wrapper>
    );
  };

export const Wrapper = styled.section`
  grid-row: 2/2;
  grid-column: 2/3;
`;

export const Content = styled.pre`
  font-size: 16px;
  font-family: monospace;
`;

export const Chords = styled(Content)`
  color: #58911f;
`;

export const Text = styled(Content)`
  color: #292825
`;
