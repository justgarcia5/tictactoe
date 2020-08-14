import React, { useState, useEffect } from "react";

import GameOver from "./GameOver";

export default function Grid() {
  const [spaces, setSpaces] = useState([]);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [playerIcon, setPlayerIcon] = useState("X");
  const [playerTurn, setPlayerTurn] = useState(player1Name);
  const [count, setCount] = useState(0);
  const [player1Spaces, setPlayer1Spaces] = useState([]);
  const [player2Spaces, setPlayer2Spaces] = useState([]);

  useEffect((e) => {
    spaceGenerator();
  }, []);

  const game = (e) => {
    let sqrNum = parseInt(e.target.id);
    let spaceIndex = spaces.map((space, index) => {
      return index;
    });
    if (playerTurn === "Player 1") {
      setPlayer1Spaces((player1Spaces) => [
        ...player1Spaces,
        spaceIndex[sqrNum]
      ]);
    } else {
      setPlayer2Spaces((player2Spaces) => [
        ...player2Spaces,
        spaceIndex[sqrNum]
      ]);
    }
    if (spaces[sqrNum] === undefined) {
      setCount(count);
      setPlayerTurn(playerTurn);
      setPlayerIcon(playerIcon);
    } else {
      setCount(count + 1);
      let turn = count % 2 !== 0 ? player1Name : player2Name;
      setPlayerTurn(turn);
      setPlayerIcon(turn === player2Name ? "O" : "X");
      spaces[sqrNum] = playerIcon;
      setSpaces(spaces);
    }
  };

  const spaceGenerator = () => {
    let str = " ";
    let spaces = Array(9).fill(str);
    setSpaces(spaces);
  };

  const reset = () => {
    spaceGenerator();
    setCount(0);
    setPlayerTurn(player1Name);
    setPlayerIcon("X");
    setPlayer1Spaces([]);
    setPlayer2Spaces([]);
  };

  return (
    <div>
      <div className="board">
        <div className="board-header">
          <br />
          <GameOver
            player1Spaces={player1Spaces}
            player2Spaces={player2Spaces}
            playerIcon={playerIcon}
            playerTurn={playerTurn}
            player1Name={player1Name}
            player2Name={player2Name}
            reset={reset}
          />
        </div>
        <div className="grid">
          {spaces.map((space, index) => {
            return (
              <div id={index} className="spaces" key={index} onClick={game}>
                <p>{space}</p>
              </div>
            );
          })}
        </div>
        <div className="reset-btn-div">
          <button className="reset-btn" onClick={reset}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
