import React, { useState, useEffect } from "react";
import YouLost from "../youlost/YouLost";
import axios from "axios";

const fetch_word = async (setWord) => {
  const res = (await axios.get("http://localhost:8000/")).data;
  console.log(res.word); // remove before deployement.
  setWord(res.word);
};

const GRID = ({ guessedWord_, word }) => {
  const letters = [];

  document.querySelector("#input-word").value = "";

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
        } else if (word.includes(currChar) && word[index] != currChar) {
          color = "rgb(235, 196, 84)";
          tcolor = "rgb(255, 255, 255)";
        } else {
          color = "rgb(160, 160, 160)";
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
    const latest_guessed_word = document.querySelector("#input-word").value;

    if (guessedWord.length > 5 && latest_guessed_word != word) {
      const YouLost_ = document.querySelector("#you-lost-sec");
      YouLost_.style.display = "flex";
      return false;
    }

    else if (latest_guessed_word.length == 5) {
      const newGuessedWord = [...guessedWord, latest_guessed_word];
      setGuessedWords(newGuessedWord);
    }
  };

  useEffect(() => {
    fetch_word(setWord);
  }, []);

  return (
    <div id="game">
      <h2>WORDLE</h2>

      <div className="input-sec">
        <input type="text" id="input-word" placeholder="Word" maxLength="5" />
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

      <YouLost correct_word={word}></YouLost>
    </div>
  );
};

export default Wordle;
