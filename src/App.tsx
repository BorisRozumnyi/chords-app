import React, {
  useEffect,
  useState,
} from "react";
import { RenderSong } from "./components/RenderSong";
import { KeyRange } from "./components/KeyRange";
import {
  AppWrapper,
  Container,
  EnteringContent,
} from "./styles";
import { isChords } from "./utils";
import { ChordContext } from "./utils/context";

export const App = () => {
  const [songContent, setSongContent] =
    useState("");
  const [editMode, setEditMode] =
    useState(false);

  const [keyOfSong, setKeyOfSong] =
    useState<string>("");

  useEffect(() => {
    const firstChord = songContent
      .split("\n")
      .find((row) => isChords(row))
      ?.split(" ")[0];

    firstChord &&
      setKeyOfSong(firstChord);
  }, [songContent]);

  const handleChange = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setSongContent(value);
  };

  const changeKey = (key: string) => {
    setKeyOfSong(key);
  };

  return (
    <ChordContext.Provider
      value={{
        tonality: keyOfSong,
        setTonality: setKeyOfSong,
      }}
    >
      <AppWrapper>
        <Container>
          <KeyRange
            changeKey={changeKey}
          />
          <h2>Tonality: {keyOfSong}</h2>
          {editMode ? (
            <EnteringContent
              value={songContent}
              onChange={handleChange}
              placeholder="Enter text with chords here"
              onBlur={() =>
                setEditMode(false)
              }
              autoFocus
              rows={
                songContent.split("\n")
                  .length
              }
            />
          ) : (
            <RenderSong
              songContent={songContent}
              setEditMode={setEditMode}
            />
          )}
        </Container>
      </AppWrapper>
    </ChordContext.Provider>
  );
};
