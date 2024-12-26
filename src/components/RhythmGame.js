import React, { useState, useEffect } from "react";
import "./App.css";

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const pads = ["#FF4C4C", "#4CFF4C", "#4C4CFF", "#FFC04C"]; // Funky farver!

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomPad = Math.floor(Math.random() * pads.length);
      setActivePad(randomPad);

      setTimeout(() => setActivePad(null), 600); // Hold pad aktiv i 600ms
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePadClick = (index) => {
    if (gameOver) return;

    if (index === activePad) {
      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
  };

  return (
    <div className="rhythm-game">
      <h1>Jamiroquai Rhythm Game</h1>
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
              className={`pad ${activePad === index ? "active" : ""}`}
              style={{
                backgroundColor: color,
                boxShadow:
                  activePad === index
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
