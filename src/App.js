import React from "react";
import RhythmGameWithMusic from "./components/RhythmGame"; // Brug RhythmGame, som inkluderer musikken
import "./App.css"; // Styling

function App() {
  return (
    <div className="App">
      <header>
        <h1>Rhythm Game</h1>
        <h2>Play along with the beat of "beatcheck.mp3"</h2>
      </header>
      <main>
        <RhythmGameWithMusic />
      </main>
    </div>
  );
}

export default App;
