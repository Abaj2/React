import React from "react";
import { useState, useEffect, useRef } from "react";
import './TypingTest.css'

function TypingTest() {
  const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", 
    "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", 
    "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", 
    "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", 
    "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", 
    "time", "no", "just", "him", "know", "take", "people", "into", "year", 
    "your", "good", "some", "could", "them", "see", "other", "than", "then", 
    "now", "look", "only", "come", "its", "over", "think", "also", "back", 
    "after", "use", "two", "how", "our", "work", "first", "well", "way", 
    "even", "new", "want", "because", "any", "these", "give", "day", "most", 
    "us", "is", "are", "was", "were", "been", "being", "have", "has", "had", 
    "having", "do", "does", "did", "doing", "each", "few", "while", "long", 
    "might", "must", "should", "didn't", "don't", "can't", "more", "number", 
    "place", "during", "work", "live", "how", "school", "without", "until", 
    "great", "system", "government", "know", "think", "need", "become", "good", 
    "bad", "keep", "point", "use", "information", "start", "happen", "really", 
    "watch", "speak", "under",
  ];

  const [paragraph, setParagraph] = useState([]);
  const [fullParagraph, setFullParagraph] = useState("");
  const maxTime = 15;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    const randomWord = commonWords[randomIndex];
    setParagraph((prevParagraph) => [...prevParagraph, randomWord]);
  };

  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      getRandomWord();
    }
  }, []);

  useEffect(() => {
    setFullParagraph(paragraph.join(" "));
  }, [paragraph]);

  useEffect(() => {
    console.log(fullParagraph);
  }, [fullParagraph]);

  useEffect(() => {
    inputRef.current.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(''));
  }, []);

  useEffect(() => {
    let interval;
    if(isTyping && timeLeft > 0) {
      interval = setInterval(() => {

        setTimeLeft(timeLeft - 1);
        let correctChars = charIndex - mistakes;
        let totalTime = maxTime - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => {
      clearInterval(interval);
    };

  }, [isTyping, timeLeft]);

  const handleChange = (e) => {
    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      const updatedCorrectWrong = [...correctWrong];

      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        updatedCorrectWrong[charIndex] = "correct";
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        updatedCorrectWrong[charIndex] = "wrong";
      }

      setCorrectWrong(updatedCorrectWrong);

      if (charIndex === characters.length - 1) setIsTyping(false);
    } else {
      setIsTyping(false);
    }
  };
  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);
    setCorrectWrong(Array(charRefs.current.length).fill(''))
    inputRef.current.focus();
  }

  return (
    <div className="container">
      <div>
        <div className="test">
          <input
            type="text"
            className="input-field"
            ref={inputRef}
            onChange={handleChange}
          />
          {fullParagraph.split("").map((char, index) => (
            <span
              key={index} 
              id='first-span'
              className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`}
              ref={(e) => (charRefs.current[index] = e)}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="result">
          <p>
            Time Left: <strong>{timeLeft}</strong>
          </p>
          <p>
            Mistakes: <strong>{mistakes}</strong>
          </p>
          <p>
            WPM: <strong>{WPM}</strong>
          </p>
          <p>
            CPM: <strong>{CPM}</strong>
          </p>
          <button className="btn" onClick={resetGame}>Try Again</button>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;