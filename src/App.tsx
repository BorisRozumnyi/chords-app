import React, { useState } from "react";
import { RenderSong } from "./components/RenderSong";
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
    <div className="App">
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
    </div>
  );
}

export default App;
