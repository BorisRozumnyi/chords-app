import React, { useState } from "react";
import { RenderSong } from "./components/RenderSong";
import styled from "styled-components";

// import "./App.css";

function App() {
  const [songContent, setSongContent] =
    useState("");

  const handleChange = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setSongContent(value);
  };

  return (
    <Wrapper>
      <EnteringContent
        value={songContent}
        onChange={handleChange}
        placeholder="Enter text with chords"
      />
      <RenderSong
        songContent={songContent}
      />
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  display: grid;
  grid-template:
    1fr / 1fr minmax(auto, 400px)
    1fr;
  min-height: 100vh;
  background: #ebedf3;
  padding: 20px 15px;
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

export default App;
