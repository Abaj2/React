import "./Startgame.css";
import React, { useEffect, useState } from "react";

function Startgame() {
  const [isVisible, setIsVisible] = useState(true);
  const [countDown, setCountDown] = useState(3);
  const [balls, setBalls] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);

  const handleClick = () => {
    setIsVisible(false);
  };

  const spawnBall = () => {
    const container = document.querySelector(".startgame-container");
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const randomX = Math.floor(Math.random() * (containerWidth - 100));
    const randomY = Math.floor(Math.random() * (containerHeight - 100));

    const newBall = { id: Date.now() + Math.random(), x: randomX, y: randomY };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  };

  const handleBallClick = (id) => {
    setBalls((prevBalls) => {
      const newBalls = prevBalls.filter((ball) => ball.id !== id);
      if (newBalls.length < 3) {
        spawnBall();
      }
      setScore((prevScore) => prevScore + 1);
      return newBalls;
    });
  };

  useEffect(() => {
    if (!isVisible && countDown >= 0) {
      const timer = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      if (countDown === 0) {
        setGameStarted(true);

        const timerTwo = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);

        for (let i = 0; i < 3; i++) {
          spawnBall();
        }
      }

      return () => clearInterval(timer);
    }
  }, [isVisible, countDown]);

  return (
    <div>
      <div className="header">
        <div className="score-container">
          <p>Score: {score}</p>
        </div>
        <div className="time-container">
          <p>Time: {timer}</p>
        </div>
      </div>
      <div className="startgame-container">
        {isVisible ? (
          <div className="start-button" onClick={handleClick}>
            Start Game
          </div>
        ) : (
          countDown > 0 && <p>{countDown}</p>
        )}
        {gameStarted && (
          <div className="balls-container">
            {balls.map((ball) => (
              <div
                key={ball.id}
                className="ball"
                style={{
                  left: `${ball.x}px`,
                  top: `${ball.y}px`,
                  cursor: "crosshair",
                }}
                onClick={() => handleBallClick(ball.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Startgame;
