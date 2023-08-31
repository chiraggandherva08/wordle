import React, { useState, useEffect } from "react";
import axios from "axios";

const fetch_word = async (setWord) => {
  const res = (await axios.get("http://localhost:8000/")).data;
  console.log(res.word);
  setWord(res.word);
};

const GRID = ({ guessedWord_ }) => {
  const letters = [];

  for (let i = 0; i < 5; i++) {
    letters.push(guessedWord_[i]);
  }

  return (
    <div className="grid">
      {letters.map((currChar, index) => {
        return (
          <div className="bordered-box" key={index}>
            {" "}
            {currChar}{" "}
          </div>
        );
      })}
    </div>
  );
};

const Wordle = () => {
  const [word, setWord] = useState("");
  const [guessedWord, setGuessedWords] = useState([]);

  const addWord = () => {
    const word = document.querySelector("#input-word").value;
    if (word.length == 5) {
      const newGuessedWord = [...guessedWord, word];
      setGuessedWords(newGuessedWord);
      console.log(newGuessedWord);
    }
  };

  useEffect(() => {
    fetch_word(setWord);
  }, []);

  return (
    <div id="game">
      <h2>WORDLE</h2>

      <div className="input-sec">
        <input type="text" id="input-word" placeholder="Enter Word" />
        <input
          type="button"
          value={"Enter"}
          onClick={() => {
            addWord();
          }}
        />
      </div>

      <div className="box">
        {" "}
        {guessedWord.map((currElem, index) => {
          return <GRID key={index} guessedWord_={currElem} />;
        })}
      </div>
    </div>
  );
};

export default Wordle;
