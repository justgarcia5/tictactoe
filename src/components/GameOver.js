import React, { useState, useEffect } from "react";

export default function GameOver(props) {
  const [message, setMessage] = useState("");
  const [over, setOver] = useState(null);

  useEffect(() => {
    gameover();
  });

  const gameover = () => {
    console.log("gameover");

    let winningNums = [
      [0, 4, 8],
      [0, 1, 2],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];

    winningNums.map((num, index) => {
      if (
        winningNums[index].every(
          (elem) => props.player1Spaces.indexOf(elem) > -1
        )
      ) {
        setOver(true);
        setMessage("Player 1 Wins!");
      } else if (
        winningNums[index].every(
          (elem) => props.player2Spaces.indexOf(elem) > -1
        )
      ) {
        setOver(true);
        setMessage("Player 2 Wins!");
      } else if (
        props.player1Spaces.length === 5 &&
        props.player2Spaces.length === 4
      ) {
        setOver(true);
        setMessage("Draw!");
      }
    });
    if (props.player1Spaces.length <= 0 && props.player2Spaces.length <= 0) {
      setOver(false);
      setMessage("");
    }
  };

  return (
    <div>
      {over && <div>{message}</div>}
      {!over && <div>{props.playerTurn}</div>}
    </div>
  );
}
