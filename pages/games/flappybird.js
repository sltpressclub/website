import React, { useState, useEffect } from "react";

const FlappyBird = () => {
  // Game state variables
  const [birdY, setBirdY] = useState(200);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [gravity, setGravity] = useState(0.6);
  const [flap, setFlap] = useState(-12);
  const [pipeX, setPipeX] = useState(300);
  const [pipeHeight, setPipeHeight] = useState(150);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Game speed (time interval for game loop)
  const gameSpeed = 20;

  // Handle bird movement and gravity
  useEffect(() => {
    if (isGameOver) return;

    const gameInterval = setInterval(() => {
      setBirdY((prevBirdY) => prevBirdY + birdVelocity);
      setBirdVelocity((prevBirdVelocity) => prevBirdVelocity + gravity);
      setPipeX((prevPipeX) => prevPipeX - 3);

      // Pipe reset when it moves off-screen
      if (pipeX < -50) {
        setPipeX(300);
        setPipeHeight(Math.random() * 200 + 50);
        setScore((prevScore) => prevScore + 1);
      }

      // Collision detection
      if (
        birdY > 400 || // Bird hits the ground
        birdY < 0 || // Bird hits the top
        (pipeX < 50 &&
          pipeX > 0 &&
          (birdY < pipeHeight || birdY > pipeHeight + 100))
      ) {
        setIsGameOver(true);
        clearInterval(gameInterval); // Stop the game
      }
    }, gameSpeed);

    return () => clearInterval(gameInterval); // Clean up the interval when component unmounts
  }, [birdY, birdVelocity, pipeX, pipeHeight, isGameOver]);

  // Handle bird flap on click or spacebar
  const handleFlap = () => {
    if (!isGameOver) {
      setBirdVelocity(flap); // Apply flap velocity
    } else {
      restartGame(); // Restart the game if it's over
    }
  };

  // Restart the game
  const restartGame = () => {
    setBirdY(200);
    setBirdVelocity(0);
    setPipeX(300);
    setPipeHeight(150);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div
      className="flappy-bird-game"
      style={{
        width: "400px",
        height: "600px",
        backgroundColor: "#70c5ce",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="bird"
        style={{
          position: "absolute",
          top: `${birdY}px`,
          left: "50px",
          width: "40px",
          height: "40px",
          backgroundColor: "yellow",
          borderRadius: "50%",
        }}
      />
      <div
        className="pipe top-pipe"
        style={{
          position: "absolute",
          top: "0",
          left: `${pipeX}px`,
          width: "50px",
          height: `${pipeHeight}px`,
          backgroundColor: "green",
        }}
      />
      <div
        className="pipe bottom-pipe"
        style={{
          position: "absolute",
          bottom: "0",
          left: `${pipeX}px`,
          width: "50px",
          height: `calc(100% - ${pipeHeight + 100}px)`,
          backgroundColor: "green",
        }}
      />
      <div
        className="score"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          color: "white",
        }}
      >
        {isGameOver ? `Game Over! Score: ${score}` : `Score: ${score}`}
      </div>
      <button
        onClick={handleFlap}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#ff6347",
          border: "none",
          borderRadius: "5px",
          color: "white",
          fontSize: "16px",
        }}
      >
        {isGameOver ? "Restart" : "Flap"}
      </button>
    </div>
  );
};

export default FlappyBird;
