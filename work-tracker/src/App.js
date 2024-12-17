import logo from "./logo.svg";
import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("sessions"));
    if (savedSessions) {
      setSessions(savedSessions);
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const addCurrentTime = () => {
    const date = new Date().toLocaleDateString();
    const existingSession = sessions.find((session) => session.date === date);

    if (existingSession) {
      const updatedSessions = sessions.map((session) =>
        session.date === date
          ? { ...session, workDone: session.workDone + timer }
          : session
      );
      setSessions(updatedSessions);
    } else {
      const workEntry = {
        date: date,
        workDone: timer,
      };
      setSessions((prevSessions) => [...prevSessions, workEntry]);
    }

    resetTimer();
  };

  const deleteSession = (date) => {
    const updatedSessions = sessions.filter((session) => session.date !== date);
    setSessions(updatedSessions);
  };

  return (
    <div className="tracker-container">
      <header className="header">
        <h1>Work Session Tracker</h1>
      </header>
      <main className="main">
        <div className="timer-section">
          <h2>Current Session</h2>
          <div className="timer-display">
            <span id="timer">{formatTime(timer)}</span>
          </div>
          <div className="timer-controls">
            <button id="start-btn" onClick={startTimer}>Start</button>
            <button id="pause-btn" onClick={pauseTimer}>Pause</button>
            <button id="reset-btn" onClick={resetTimer}>Reset</button>
          </div>
        </div>
        <div className="today-work">
          <h2>Today's Work</h2>
          <button id="add-time-btn" onClick={addCurrentTime}>Add Current Time</button>
          <ul>
            {sessions.map((session, index) => (
              <li key={index}>
                {`${session.date}: ${formatTime(session.workDone)}`}
                <button className='delete-btn' onClick={() => deleteSession(session.date)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="statistics">
          <h2>Statistics</h2>
          <ul>
            {sessions.map((session, index) => (
              <li key={index}>
                {session.date}: {formatTime(session.workDone)}
                <button className='delete-btn' onClick={() => deleteSession(session.date)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
