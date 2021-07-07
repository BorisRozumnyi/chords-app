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
    const tonalityInParentheses =
      songContent
        .split("\n")[0]
        .match(/\([A-H](#?|b?)(m?)\)/);

    const firstChord = songContent
      .split("\n")
      .find((row) => isChords(row))
      ?.split(" ")[0];

    if (tonalityInParentheses) {
      const tonalityWithoutParentheses =
        tonalityInParentheses[0]
          .replace("(", "")
          .replace(")", "");
      setOriginTonality(
        tonalityWithoutParentheses
      );
      setCurrentTonality(
        tonalityWithoutParentheses
      );
    }

    if (
      firstChord &&
      tonalityInParentheses === null
    ) {
      setOriginTonality(firstChord);
      setCurrentTonality(firstChord);
    }

    if (
      firstChord &&
      !tonalityInParentheses &&
      !currentTonality
    ) {
      setCurrentTonality(firstChord);
    }
  }, [songContent]);

  const handleChangeEnteringContent = (
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
              onChange={
                handleChangeEnteringContent
              }
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
