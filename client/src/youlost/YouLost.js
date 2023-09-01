import React from "react";

const YouLost = ({ correct_word }) => {
  return (
    <div id="you-lost-sec">
      <h3 style={{ color: "red" }}>YOU LOST</h3>
      <a href="/">NEW GAME</a>
      <p>Correct Word:</p>
      <p> {correct_word}</p>
    </div>
  );
};

export default YouLost;
