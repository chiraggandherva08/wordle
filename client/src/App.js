import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const fetch_word = async (setWord) => {
  const res = (await axios.get("http://localhost:8000/")).data;
  console.log(res.word);
  setWord(res.word);
};

function App() {
  const [word, setWord] = useState("");

  useEffect(() => {
    fetch_word(setWord);
  }, []);

  return <div className="App"></div>;
}

export default App;
