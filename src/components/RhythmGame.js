import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import "../App.css"; // Styling til spillet

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [tolerantPad, setTolerantPad] = useState(null); // Tilføjet toleranceperiode
  const [gameOver, setGameOver] = useState(false);

  const pads = ["#FF4C4C", "#4CFF4C", "#4C4CFF", "#FFC04C"]; // Farver til pads
  const BPM = 120; // Beats per minute for beatcheck.mp3
  const beatInterval = (60 / BPM) * 1000; // Interval mellem beats i millisekunder

  // Initialiser Howler.js med beatcheck.mp3
  const music = new Howl({
    src: ["/beatcheck.mp3"], // Sørg for, at beatcheck.mp3 ligger i public-mappen
    autoplay: false,
    loop: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (gameOver) return;

    // Start musikken
    music.play();

    // Synkroniser knapper med beats
    const interval = setInterval(() => {
      const randomPad = Math.floor(Math.random() * pads.length);
      setActivePad(randomPad);
      setTolerantPad(randomPad); // Tilføj toleranceperiode

      // Nulstil activePad efter 500ms, men hold tolerantPad aktiv i 1 sekund
      setTimeout(() => setActivePad(null), 500);
      setTimeout(() => setTolerantPad(null), 1000);
    }, beatInterval); // Synkroniseret med musikkens BPM

    return () => {
      clearInterval(interval);
      music.stop(); // Stop musikken, når komponenten unmountes
    };
  }, [gameOver]);

  const handlePadClick = (index) => {
    if (gameOver) return;

    if (index === activePad || index === tolerantPad) {
      // Giv point, hvis spilleren klikker inden for toleranceperioden
      setScore((prev) => prev + 1);
    } else {
      // Spillet slutter ved forkert klik
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
    setTolerantPad(null);
    music.seek(0); // Genstart musikken
    music.play();
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
