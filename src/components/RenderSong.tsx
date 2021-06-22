import React, {
  useEffect,
  useState,
} from "react";
import { isChords, isTitle } from "../utils";
import { Wrapper, Chords, Title, Text } from "../styles";

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
