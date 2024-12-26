import React from "react";
import RhythmGame from "./components/RhythmGame"; // Importing the main game component
import "./App.css"; // Importing the updated styling for the app

function App() {
  return (
    <div className="App">
      <header>
        <h1>Jamiroquai Rhythm Game</h1>
        <h2>Feel the Funk, Follow the Beat 🎶</h2>
      </header>
      <main>
        <RhythmGame />
      </main>
    </div>
  );
}

export default App;
