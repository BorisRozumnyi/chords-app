import React, {
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { isChords, isTitle } from "../utils";

type Props = {
  songContent: string;
  content?: (val: any) => void;
};

export const RenderSong: React.FC<Props> =
  ({ songContent }) => {
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
