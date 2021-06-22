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
    <Component>
      <header className="App-header">
        <textarea
          cols={50}
          rows={10}
          value={songContent}
          onChange={handleChange}
        />
        <button>render</button>
      </header>
      <RenderSong
        songContent={songContent}
      />
    </Component>
  );
}

export const Component = styled.section`
  background: #efd
`;

export default App;
