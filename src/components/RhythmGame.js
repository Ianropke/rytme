import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import "../App.css";

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [tolerantPad, setTolerantPad] = useState(null); // Tolerance period
  const [gameOver, setGameOver] = useState(false);

  const pads = ["#FF4C4C", "#4CFF4C", "#4C4CFF", "#FFC04C"]; // Pad colors
  const BPM = 119; // Updated BPM for beatcheck.mp3
  const beatInterval = (60 / BPM) * 1000; // Interval between beats in milliseconds (~504ms)

  // Initialize Howler.js with beatcheck.mp3
  const music = new Howl({
    src: ["/beatcheck.mp3"], // Ensure the file is in the public/ folder
    autoplay: false,
    loop: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (gameOver) return;

    // Start the music
    music.play();

    // Start the pad cycling
    const interval = setInterval(() => {
      const randomPad = Math.floor(Math.random() * pads.length);
      setActivePad(randomPad); // Highlight the active pad
      setTolerantPad(randomPad); // Allow a tolerance window for clicks

      // Clear the active pad after 500ms
      setTimeout(() => setActivePad(null), 500);

      // Clear the tolerant pad after 1 second
      setTimeout(() => setTolerantPad(null), 1000);
    }, beatInterval); // Sync with the updated BPM (~504ms)

    return () => {
      clearInterval(interval);
      music.stop(); // Stop the music when unmounted or game ends
    };
  }, [gameOver]);

  const handlePadClick = (index) => {
    if (gameOver) return;

    if (index === activePad || index === tolerantPad) {
      // Player clicked correctly within the active/tolerance window
      setScore((prev) => prev + 1);
    } else {
      // Player clicked incorrectly
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
    setTolerantPad(null);
    music.seek(0); // Restart the music
    music.play(); // Replay the music
  };

  return (
    <div className="rhythm-game">
      <h1>Rhythm Game</h1>
      <h2>Score: {score}</h2>
      {gameOver ? (
        <>
          <h3>Game Over!</h3>
          <button className="reset-button" onClick={resetGame}>
            Try Again
          </button>
        </>
      ) : (
        <div className="pad-container">
          {pads.map((color, index) => (
            <div
              key={index}
              className={`pad ${
                activePad === index || tolerantPad === index ? "active" : ""
              }`}
              style={{
                backgroundColor: color,
                boxShadow:
                  activePad === index || tolerantPad === index
                    ? `0 0 30px ${color}`
                    : "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => handlePadClick(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RhythmGame;
