import React, { useState } from "react";
import "./App.css";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [holdDice, setHoldDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollNumber, setRollNumber] = React.useState(0);
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || rollNumber);



  function allNewDice() {
    const randomNumbers = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 6) + 1
    );
    const numberObjects = randomNumbers.map((eachNumber) => ({
      isValue: eachNumber,
      isHeld: false,
      id: nanoid(),
    }));
    return numberObjects;
  }




  React.useEffect(() => {
    holdDice.every(
      (eachObject) =>
        eachObject.isHeld && eachObject.isValue === holdDice[5].isValue
    )
      ? setTenzies(true)
      : holdDice;
  }, [holdDice]); //here while writing eachObject.isValue === holdDice[5].isValue, you know you will already make them equal while rolling so the index of holdDice does not matter.
  //you run the effect everytime holdDice changes so everytime you click button or freeze a die,effect will check these winning conditions.




  function Roll() {
    if (!tenzies) {
      setHoldDice((prevDiceArray) =>
        prevDiceArray.map((eachObject) => {
          return eachObject.isHeld
            ? { ...eachObject, isHeld: true }
            : { ...eachObject, isValue: Math.floor(Math.random() * 6) + 1 };
        })
      );
      
      trackRoll();
      
      

    } else {
        if (rollNumber <= bestScore || bestScore === null) {
          setBestScore(rollNumber);
          localStorage.setItem("bestScore", JSON.stringify(rollNumber));
        }
      setTenzies(false);
      setRollNumber(0);
      setHoldDice(allNewDice());
    }
  }

  function trackRoll() {
  setRollNumber((prevRollNumber) => prevRollNumber + 1);
}







  function clickDice(id) {
    setHoldDice((prevHeldDice) =>
      prevHeldDice.map((eachdieObject) => {
        return eachdieObject.id === id
          ? { ...eachdieObject, isHeld: !eachdieObject.isHeld }
          : eachdieObject;
      })
    );
  } //changes isHeld of object from false to true or true to false





  const newHoldDice = holdDice.map((dieObject) => {
    return (
      <Die
        value={dieObject.isValue}
        isHeld={dieObject.isHeld}
        key={dieObject.id}
        idName={dieObject.id}
        clickDice={clickDice}
      />
    );
  });



  return (
    <main>
      <h1 className="header">Tenzies</h1>
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies-container">{newHoldDice}</div>
      <button type="button" className="btn" onClick={Roll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && (
        <Confetti width={window.outerWidth} height={window.innerHeight} />
      )}
      <p className="bestScore">Best Score :{bestScore}</p>
      <p className="trackRoll">Number Of Rolls :{" " + rollNumber}</p>
    </main>
  );
}

export default App;
