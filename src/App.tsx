import React, { useState } from "react";
import { RenderSong } from "./components/RenderSong";
import { KeyRange } from "./components/KeyRange";
import {
  AppWrapper,
  Container,
  EnteringContent,
} from "./styles";

export const App = () => {
  const [songContent, setSongContent] =
    useState("");
  const [editMode, setEditMode] =
    useState(false);

  const [keyOfSong, setKeyOfSong] =
    useState("");

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
  );
};
