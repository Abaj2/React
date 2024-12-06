import React from "react";
import { useState, useEffect, useRef } from "react";

function Pomodoro() {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (time > 0 && isRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
        setTime(300)
        setIsRunning(true)
    }
  }, [time, isRunning]);
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };
  const resetTimer = () => {
    setTime(1500);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div className="container">
      <div className="timer">
        <div className="current-time-container">
          <span className="current-time">{formatTime(time)}</span>
        </div>
        <button
          className={isRunning ? "pause-button" : "start-button"}
          onClick={handleClick}
        >
          {isRunning ? "Pause Timer" : "Start Timer"}
        </button>
        <button className="reset-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default Pomodoro;
