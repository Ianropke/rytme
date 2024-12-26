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
      console.log("New active pad:", randomPad); // Debug-log for at vise hvilken knap, der lyser
      setActivePad(randomPad);

      // Sørg for, at knappen kun er aktiv i 500ms
      setTimeout(() => setActivePad(null), 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePadClick = (color) => {
    console.log("Clicked pad:", color); // Debug-log for at vise, hvilken knap brugeren klikkede på
    console.log("Active pad:", activePad); // Debug-log for at vise, hvad den aktive knap er

    if (gameOver) return;

    if (color === activePad) {
      // Hvis det er korrekt, øges scoren, og spillet fortsætter
      setScore((prev) => prev + 1);
      console.log("Correct pad clicked! Score:", score + 1); // Debug-log for korrekt klik
    } else {
      // Hvis det er forkert, stopper spillet
      console.log("Wrong pad clicked! Game Over."); // Debug-log for forkert klik
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
    console.log("Game reset."); // Debug-log for reset
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
