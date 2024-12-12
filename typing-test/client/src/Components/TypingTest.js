import { UsernameProvider } from "./UsernameContext.js";
import React from "react";
import { useState, useEffect, useRef, createContext } from "react";
import "./TypingTest.css";
import { UsernameContext } from "./UsernameContext";
import { useContext } from "react";
function TypingTest() {
  const commonWords = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "people",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
    "is",
    "are",
    "was",
    "were",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "each",
    "few",
    "while",
    "long",
    "might",
    "must",
    "should",
    "didn't",
    "don't",
    "can't",
    "more",
    "number",
    "place",
    "during",
    "work",
    "live",
    "how",
    "school",
    "without",
    "until",
    "great",
    "system",
    "government",
    "know",
    "think",
    "need",
    "become",
    "good",
    "bad",
    "keep",
    "point",
    "use",
    "information",
    "start",
    "happen",
    "really",
    "watch",
    "speak",
    "under",
  ];
  const { finalUsername, setFinalUsername } = useContext(UsernameContext);
  const [paragraph, setParagraph] = useState([]);
  const [fullParagraph, setFullParagraph] = useState("");
  const [maxTime, setMaxTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const logout = () => {
    setFinalUsername("");
    window.location.reload();
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    const randomWord = commonWords[randomIndex];
    setParagraph((prevParagraph) => [...prevParagraph, randomWord]);
  };

  useEffect(() => {
    inputRef.current.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(""));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0 && charIndex < fullParagraph.length) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsTyping(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTyping, timeLeft, charIndex, fullParagraph.length]);
  
  useEffect(() => {
    if (isTyping && timeLeft > 0 && charIndex < fullParagraph.length) {
      const totalTime = maxTime - timeLeft;
      const correctChars = charIndex - mistakes;
      
      const newCPM = totalTime > 0 
        ? Math.round((correctChars / totalTime) * 60) 
        : 0;
      
      const newWPM = totalTime > 0 
        ? Math.round((correctChars / 5 / totalTime) * 60)
        : 0;
  
      setCPM(newCPM);
      setWPM(newWPM);
    }
  }, [isTyping, timeLeft, charIndex, mistakes, maxTime, fullParagraph.length]);

  const createAccount = () => {
    window.history.replaceState(
      null,
      "",
      "http://localhost:3001/create-account"
    );
    window.location.reload();
  };

  const login = () => {
    window.history.replaceState(null, "", "http://localhost:3001/login");
    window.location.reload();
  };

  const handleChange = (e) => {
    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);
    
  
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setCharIndex(charIndex - 1);
      const updatedCorrectWrong = [...correctWrong];
      updatedCorrectWrong[charIndex - 1] = ""; 
      setCorrectWrong(updatedCorrectWrong);
      setInputValue(e.target.value);
      setMistakes(mistakes > 0 ? mistakes - 1 : 0); 
      return; 
    }
    
   
    if (!isTyping) {
      setIsTyping(true);
    }
  
    if (charIndex < characters.length && timeLeft > 0) {
      const updatedCorrectWrong = [...correctWrong]; 
  
      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        updatedCorrectWrong[charIndex] = "correct";
      } else if (typedChar !== " ") { 
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        updatedCorrectWrong[charIndex] = "wrong";
      } else {
        setCharIndex(charIndex + 1); 
      }
  
      setCorrectWrong(updatedCorrectWrong);
    }
  
    
    if (charIndex >= fullParagraph.length) {
      setTimeLeft(0); 
      setIsTyping(false);
    }
  
    setInputValue(e.target.value);
  };
  
  
  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsTyping(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);
  
  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      const elapsedTime = maxTime - timeLeft;
      const correctChars = charIndex - mistakes;
      
      
      if (elapsedTime > 0) {
        const newCPM = Math.round((correctChars / elapsedTime) * 60);
        const newWPM = Math.round((correctChars / 5 / elapsedTime) * 60);
  
        setCPM(newCPM);
        setWPM(newWPM);
      }
    }
  }, [isTyping, timeLeft, charIndex, mistakes, maxTime]);
  
  
  
  let mode;

  const fifteenSeconds = () => {
    setParagraph([])
    setFullParagraph("")
    setMaxTime(15)
    setTimeLeft(15);
    mode = 15;
  };

  const thirtySeconds = () => {
    setParagraph([])
    setFullParagraph("")
    setMaxTime(30)
    setTimeLeft(30);
    mode = 30
  };

  const tenWords = () => {
    setParagraph([])
    setFullParagraph("")
    setMaxTime(86400)
    setTimeLeft(maxTime);
    mode = 10
  };

  const twentyFiveWords = () => {
    setParagraph([])
    setFullParagraph("")
    setMaxTime(86400)
    setTimeLeft(maxTime);
    mode = 25
  };

  const fiftyWords = () => {
    setParagraph([])
    setFullParagraph("")
    setMaxTime(86400)
    setTimeLeft(maxTime);
    mode = 50
  };
  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setInputValue("");
    setWPM(0);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    inputRef.current.focus();

    if (mode === 10 || mode === 25 || mode === 50) {
 
      for (let i = 0; i < mode; i++) {
        getRandomWord();
      }
  
      setFullParagraph(paragraph.join(" "));
    }
    else if (mode === 15) {

      for (let i = 0; i < 50; i++) {
        getRandomWord();
      }
  
      setFullParagraph(paragraph.join(" "));
    }
    else if (mode === 30) {


      for (let i = 0; i < 100; i++) {
        getRandomWord();
      }
      setFullParagraph(paragraph.join(" "));
    }
    
  };

  return (
    <div className="typing-test-container">
      <div className="container">
        <div>
          <div className="test">
            <div className="modes">
              <button className="mode" onClick={() => {fifteenSeconds(); resetGame(); }}>15 Seconds</button>
              <button className="mode" onClick={() => {thirtySeconds(); resetGame(); }}>30 Seconds</button>
              <button className="mode" onClick={() => {tenWords(); resetGame(); }}>10 Words</button>
              <button className="mode" onClick={() => {twentyFiveWords(); resetGame(); }}>25 Words</button>
              <button className="mode" onClick={() => {fiftyWords(); resetGame(); }}>50 Words</button>
            </div>
            <input
              type="text"
              className="input-field"
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
            />
            {fullParagraph.split("").map((char, index) => (
              <span
                key={index}
                id="first-span"
                className={`char ${index === charIndex ? "active" : ""} ${
                  correctWrong[index]
                } ${char === " " ? "space" : ""}`}
                ref={(e) => (charRefs.current[index] = e)}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <div className="result">
            {timeLeft <= 30 && (<><p>Time Left: <strong>{timeLeft}</strong></p></>)}
            <p>
              Mistakes: <strong>{mistakes}</strong>
            </p>
            <p>
              WPM: <strong>{WPM}</strong>
            </p>
            <p>
              CPM: <strong>{CPM}</strong>
            </p>
            <button className="btn" onClick={resetGame}>
              <i className="fa fa-refresh" aria-hidden="true"></i> Retry
            </button>

            {finalUsername === "" && (
              <>
                <button className="btn" onClick={createAccount}>
                  <i className="fa fa-user-plus" aria-hidden="true"></i> Create
                  Account
                </button>
                <button className="btn" onClick={login}>
                  <i className="fa fa-sign-in" aria-hidden="false"></i> Log in
                </button>
              </>
            )}
            {finalUsername && (
              <>
                <button className="btn" onClick={logout}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Log out
                </button>
                <button className="btn">
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  {finalUsername}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;
