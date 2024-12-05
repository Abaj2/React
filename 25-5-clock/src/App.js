import React, { useState } from "react";
import LengthControl from "./LengthControl";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
  };

  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          if (timerLabel === "Session") {
            setTimerLabel("Break");
            return breakLength * 60;
          } else {
            setTimerLabel("Session");
            return sessionLength * 60;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, breakLength, sessionLength, timerLabel]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div id="app">
      <h1>Pomodoro Timer</h1>

      <LengthControl
        title="Session Length"
        count={sessionLength}
        increment={incrementSession}
        decrement={decrementSession}
        id="session"
      />

      <LengthControl
        title="Break Length"
        count={breakLength}
        increment={incrementBreak}
        decrement={decrementBreak}
        id="break"
      />

      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formattedTime}</div>

      <button id="start_stop" onClick={toggleStartStop}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default App;
