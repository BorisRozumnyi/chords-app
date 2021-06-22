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

    const isTitle = (row: string) => {
      const c = [
        "припев:",
        "куплет:",
        "бридж:",
      ];
      return c.some((m) =>
        row.toLowerCase().includes(m)
      );
    };

    const [textRows, setTextRows] =
      useState([] as string[]);
    useEffect(() => {
      setTextRows(
        songContent.split("\n")
      );
    }, [songContent]);

    return (
      <Wrapper>
        {textRows.map((row) => {
          let rowType = "text";
          if (isChords(row))
            rowType = "chords";
          if (isTitle(row))
            rowType = "title";
          switch (rowType) {
            case "chords":
              return (
                <Chords>{row}</Chords>
              );
            case "title":
              return (
                <Title>{row}</Title>
              );
            default:
              return <Text>{row}</Text>;
          }
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

export const Title = styled.section`
  background: #f1f5f1;
  padding: 5px;
  color: #58911f;
  font-size: 26px;
`;

export const Chords = styled(Content)`
  color: #58911f;
`;

export const Text = styled(Content)`
  color: #292825;
`;
