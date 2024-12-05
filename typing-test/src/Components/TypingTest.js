import React from "react";
import { useState, useEffect } from "react";

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
  const [paragraph, setParagraph] = useState([]);
  const [fullParagraph, setFullParagraph] = useState("");
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime)
  const [mistakes, setMistakes] = useState(0)
  const [WPM, setWPM] = useState(0)
  const [CPM, setCPM] = useState(0)
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
  return (
    <div className="container">
      <div>
        <div className="test">
          <input type="text" className='input-field'></input>
          {fullParagraph.split("").map((char, index) => (
            <span className="char">{char}</span>
          ))}
        </div>
        <div className="result">
          <p>Time Left: <strong>{timeLeft}</strong></p>
          <p>Mistakes: <strong>{mistakes}</strong></p>
          <p>WPM: <strong>{WPM}</strong></p>
          <p>CPM: <strong>{CPM}</strong></p>
          <button className='btn'>Try Again</button>
        </div>
      </div>
    </div>
  );
}
export default TypingTest;
