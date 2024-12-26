import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import "../App.css";

const RhythmGame = () => {
  const [score, setScore] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [tolerantPad, setTolerantPad] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [timeElapsed, setTimeElapsed] = useState(0); // Track elapsed time

  const pads = ["#FF4C4C", "#4CFF4C"]; // Only two pads
  const initialBPM = 100;
  const maxBPM = 119;
  const gameDuration = 60; // Total game duration in seconds

  // Initialize Howler.js with beatcheck.mp3 and double the volume
  const music = new Howl({
    src: ["/beatcheck.mp3"], // Ensure the file is in public/
    autoplay: false,
    loop: true,
    volume: 1.0, // Double the volume (default is 0.5)
  });

  useEffect(() => {
    if (gameOver) return;

    // Start the game after 2 seconds
    const startGameTimeout = setTimeout(() => {
      music.play();

      const dynamicBPM = Math.min(maxBPM, initialBPM + score * 2);
      const beatInterval = (60 / dynamicBPM) * 1000;

      const interval = setInterval(() => {
        const randomPad = Math.floor(Math.random() * pads.length);
        setActivePad(randomPad);
        setTolerantPad(randomPad);

        setTimeout(() => setActivePad(null), 800); // Active for 800ms
        setTimeout(() => setTolerantPad(null), 1500); // Tolerance for 1.5s
      }, beatInterval);

      // Stop the game after the defined duration
      const stopGameTimeout = setTimeout(() => {
        setGameOver(true);
        music.stop();
      }, gameDuration * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(stopGameTimeout);
      };
    }, 2000); // 2-second delay

    // Track elapsed time
    const timerInterval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(startGameTimeout);
      clearInterval(timerInterval);
      music.stop(); // Stop music if component unmounts or game ends
    };
  }, [score, gameOver]);

  const handlePadClick = (index) => {
    if (gameOver) return;

    if (index === activePad || index === tolerantPad) {
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
      if (lives - 1 <= 0) setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActivePad(null);
    setTolerantPad(null);
    setLives(3);
    setTimeElapsed(0); // Reset elapsed time
    music.seek(0); // Restart the music
    music.play(); // Replay the music
  };

  return (
    <div className="rhythm-game">
      <h1>Jamiroquai Rhythm Game</h1>
      <h2>Score: {score}</h2>
      <h2>Lives: {lives}</h2>
      <h2>Time: {Math.min(timeElapsed, gameDuration)} / {gameDuration} seconds</h2>
      {gameOver ? (
        <>
          {timeElapsed >= gameDuration ? (
            <h3>Game Completed!</h3>
          ) : (
            <h3>Game Over!</h3>
          )}
          <p>
            {timeElapsed >= gameDuration
              ? "You mastered the funky beats of Jamiroquai! 🕺"
              : "You lost the groove! Don your virtual space hat and try again!"}
          </p>
          <button className="reset-button" onClick={resetGame}>
            {timeElapsed >= gameDuration ? "Play Again!" : "Funk It Again!"}
          </button>
        </>
      ) : (
        <>
          <p>
            Feel the funky vibes of Jamiroquai! Hit the red or green buttons in
            sync with the beat and keep grooving!
          </p>
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
        </>
      )}
    </div>
  );
};

export default RhythmGame;
