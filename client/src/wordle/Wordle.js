import React, { useState, useEffect } from "react";
import axios from "axios";

const fetch_word = async (setWord) => {
  const res = (await axios.get("http://localhost:8000/")).data;
  console.log(res.word);
  setWord(res.word);
};

const GRID = ({ guessedWord_, word }) => {
  const letters = [];

  for (let i = 0; i < 5; i++) {
    letters.push(guessedWord_[i]);
  }

  return (
    <div className="grid">
      {letters.map((currChar, index) => {
        let color = "rgb(252, 252, 255)";
        let tcolor = "rgb(20, 20, 20)";

        if (word[index] == currChar) {
          color = "rgb(108, 183, 86)";
          tcolor = "rgb(255, 255, 255)";
        } 
        else if (word.includes(currChar) && word[index] != currChar) {
          color = "rgb(235, 196, 84)";
          tcolor = "rgb(255, 255, 255)";
        }
        else {
            color = "rgb(50, 50, 50)";
            tcolor = "rgb(255, 255, 255)";
        }
        return (
          <div
            className="bordered-box"
            style={{ backgroundColor: color, color: tcolor }}
            key={index}
          >
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
        <input type="text" id="input-word" placeholder="Word" />
        <input
            id="input-btn"
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
          return <GRID key={index} guessedWord_={currElem} word={word} />;
        })}
      </div>
    </div>
  );
};

export default Wordle;
