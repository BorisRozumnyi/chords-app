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

  const [
    originTonality,
    setOriginTonality,
  ] = useState<string>("");
  const [
    currentTonality,
    setCurrentTonality,
  ] = useState<string>("");

  useEffect(() => {
    const firstChord = songContent
      .split("\n")
      .find((row) => isChords(row))
      ?.split(" ")[0];

    firstChord &&
      setOriginTonality(firstChord);
  }, [songContent]);

  const handleChange = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setSongContent(value);
  };

  return (
    <ChordContext.Provider
      value={{
        originTonality,
        currentTonality,
        setOriginTonality,
        setCurrentTonality,
      }}
    >
      <AppWrapper>
        <Container>
          <KeyRange />
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
