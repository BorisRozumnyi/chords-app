import React, { useState } from "react";
import { RenderSong } from "./components/RenderSong";
import styled from "styled-components";

export const App = () => {
  const [songContent, setSongContent] =
    useState("");
  const [editMode, setEditMode] =
    useState(false);

  const handleChange = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setSongContent(value);
  };

  return (
    <Wrapper>
      {editMode ? (
        <EnteringContent
          value={songContent}
          onChange={handleChange}
          placeholder="Enter text with chords here"
          onBlur={() =>
            setEditMode(false)
          }
          autoFocus
          rows={songContent.split('\n').length}
        />
      ) : (
        <RenderSong
          songContent={songContent}
          setEditMode={setEditMode}
        />
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template:
    1fr /
    1fr minmax(auto, 400px) 1fr;
  padding: 0;
  color: #212529;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
`;

export const EnteringContent = styled.textarea`
  grid-column: 2;
  width: 100%;
  height: 100%;
`;
