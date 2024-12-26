import React from "react";
import RhythmGame from "./components/RhythmGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Rhythm Game</h1>
        <h2>Follow the beat of "beatcheck.mp3"</h2>
      </header>
      <main>
        <RhythmGame />
      </main>
    </div>
  );
}

export default App;
