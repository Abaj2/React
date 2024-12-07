import React, { useState, useEffect, useRef } from "react";
function Dictionary() {
  const [wordData, setWordData] = useState({});
  const inputRef = useRef(null);
  
  const search = async (word) => {
    if (word === "") {
      alert("Enter a valid word");
      return;
    }
  
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message);
        return;
      }
  
      const newWordData = {
        word: data[0].word,
        phonetic: data[0].phonetic,
        meanings: data[0].meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definition: meaning.definitions?.[0]?.definition || "No definition available",
          example: meaning.definitions?.[0]?.example || "No example available",
        })),
      };
  
      setWordData(newWordData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  
  return (
    <div className="dictionary-container">
      <input
        ref={inputRef}
        type="text"
        className="word-input"
        placeholder="Search word"
      />
      <button className="search" onClick={() => search(inputRef.current.value)}>
        Search
      </button>
      {wordData.word && (
        <>
          <span className="word">
            <strong>{wordData.word}</strong>
          </span>
          <span className="phonetic">
            <i>{wordData.phonetic}</i>
          </span>
        </>
      )}
      {wordData.meanings &&
        wordData.meanings.map((meaning, index) => (
          <div key={index} className="meaning-block">
            <span className="part-of-speech">
              <strong>{meaning.partOfSpeech}</strong>
            </span>
            <span className="definition">{meaning.definition}</span>
            <span className="example">{meaning.example}</span>
          </div>
        ))}
    </div>
  );
}
export default Dictionary;  