import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const [displayText, setDisplayText] = useState("");

  const drumPads = useMemo(
    () => [
      { id: "Q", label: "Heater 1" },
      { id: "W", label: "Heater 2" },
      { id: "E", label: "Heater 3" },
      { id: "A", label: "Heater 4" },
      { id: "S", label: "Clap" },
      { id: "D", label: "Open-HH" },
      { id: "Z", label: "Kick-n-Hat" },
      { id: "X", label: "Kick" },
      { id: "C", label: "Closed-HH" },
    ],
    []
  );

  const audioRefs = useRef({});

  const playSound = (pad) => {
    const audio = audioRefs.current[pad.id];
    if (audio) {
      audio.play();
      setDisplayText(pad.label);
    } else {
      console.error("Audio element not found for pad:", pad.id);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const pad = drumPads.find((pad) => pad.id === key);
      if (pad) {
        playSound(pad);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [drumPads]);

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => playSound(pad)}
          >
            {pad.id}
            <audio
              className="clip"
              id={pad.id}
              ref={(el) => (audioRefs.current[pad.id] = el)}
              src={`/drum-machine-sounds/${pad.label.replace(" ", "-")}.mp3`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
