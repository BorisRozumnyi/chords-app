import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import {
  isChords,
  isTitle,
} from "../utils";
import {
  Wrapper,
  Chords,
  Title,
  Text,
} from "../styles";

type Props = {
  songContent: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const RenderSong: FC<Props> =
  ({ songContent, setEditMode }) => {
    const [textRows, setTextRows] =
      useState([] as string[]);
    useEffect(() => {
      setTextRows(
        songContent.split("\n")
      );
    }, [songContent]);

    const list = textRows.map((row) => {
      let rowType = "text";
      if (isChords(row))
        rowType = "chords";
      if (isTitle(row))
        rowType = "title";

      switch (rowType) {
        case "chords":
          return (
            <Chords
              key={Date.now()}
            >
              {row}
            </Chords>
          );
        case "title":
          return (
            <Title key={Date.now()}>
              {row}
            </Title>
          );
        default:
          return (
            <Text key={Date.now()}>
              {row}
            </Text>
          );
      }
    })

    return (
      <Wrapper onClick={() => setEditMode(true)}>
        {songContent ? list : 'Click to enter text'}
      </Wrapper>
    );
  };
