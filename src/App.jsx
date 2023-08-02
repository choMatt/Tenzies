import React, { useState } from "react";
import Die from "./components/Die";
import style from "./styles/App.module.css";

function App() {
  const [dice, setDice] = useState(newDice());
  const [isGameOver, setIsGameOver] = useState(false);

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allHeld = dice.every((die) => die.held)
    const sameValue = dice.every((die) => die.value === firstValue)
    if(sameValue && allHeld){
      setIsGameOver((prevValue) => !prevValue)
    }
  }, [dice])

  function newDieValue() {
    return Math.floor(Math.random() * 6);
  }

  function newDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: newDieValue(),
        held: false,
        id: i + 1,
      };
      newArr.push(newDie);
    }
    return newArr;
  }

  function holdDie(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      });
    });
  }

  function rollUnheldDie(){
    if(!isGameOver){
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.held ? die : {value: newDieValue(), held: die.held, id: die.id}
        })
      })
    } else {
      setDice(newDice())
      setIsGameOver((prevValue) => !prevValue)
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        held={die.held}
        id={die.id}
        holdDie={holdDie}
      />
    );
  });

  return (
    <main>
      <div className={style.card}>
        <h1 className={style.diceHeadingr}>Tenzies</h1>
        <div className={style.diceContainer}>{diceElements}</div>
        <button onClick={rollUnheldDie}>{isGameOver ? "restart" : "roll"}</button>
      </div>
    </main>
  );
}

export default App;
