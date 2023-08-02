import React from "react";
import style from "../styles/Die.module.css";

export default function Die(props) {
  const isHeld = {
    backgroundColor: props.held ? "orange" : "white",
  };

  return (
    <div
      className={style.die}
      style={isHeld}
      onClick={() => props.holdDie(props.id)}
    >
      <h1>{props.value}</h1>
    </div>
  );
}
