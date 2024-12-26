import React, { useState, useEffect } from "react";

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const pads = ["red", "blue", "green", "yellow"];

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const randomPad = pads[Math.floor(Math.random() * pads.length)];
      setActivePad(randomPad);
      setTimeout(() => setActivePad(null), 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePadClick = (color) => {
    if (gameOver) return;
    if (color === activePad) {
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Rhythm Game</h1>
      <h2>Score: {score}</h2>
      {gameOver && (
        <>
          <h3>Game Over!</h3>
          <button onClick={resetGame}>Try Again</button>
        </>
      )}
      {!gameOver && (
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {pads.map((color) => (
            <button
              key={color}
              onClick={() => handlePadClick(color)}
              style={{
                backgroundColor: color,
                border: activePad === color ? "5px solid white" : "none",
                padding: "20px",
                width: "70px",
                height: "70px",
                cursor: "pointer",
              }}
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RhythmGame;
