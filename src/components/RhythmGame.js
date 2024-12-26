import React, { useState, useEffect } from "react";

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [tolerantPad, setTolerantPad] = useState(null); // Tilføjer en toleranceperiode
  const pads = ["red", "blue", "green", "yellow"];

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomPad = pads[Math.floor(Math.random() * pads.length)];
      console.log("New active pad:", randomPad);
      setActivePad(randomPad);
      setTolerantPad(randomPad); // Tillader toleranceperiode

      // Aktiv knap varer 500ms
      setTimeout(() => setActivePad(null), 500);

      // Tolerance varer yderligere 500ms
      setTimeout(() => setTolerantPad(null), 1000);
    }, 1500); // Gør spillet lidt langsommere

    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePadClick = (color) => {
    console.log("Clicked pad:", color);
    console.log("Active pad:", activePad);
    console.log("Tolerant pad:", tolerantPad);

    if (gameOver) return;

    if (color === activePad || color === tolerantPad) {
      // Accepter klik, hvis det sker i toleranceperioden
      setScore((prev) => prev + 1);
      console.log("Correct pad clicked! Score:", score + 1);
    } else {
      // Fejl fører til Game Over
      console.log("Wrong pad clicked! Game Over.");
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
    setTolerantPad(null); // Nulstil tolerance
    console.log("Game reset.");
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
                border:
                  activePad === color
                    ? "5px solid white"
                    : tolerantPad === color
                    ? "5px dashed white"
                    : "none",
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
