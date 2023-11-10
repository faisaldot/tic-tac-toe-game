import { useState } from "react";

const initialValue = Array(9).fill(null);

export default function Board() {
  const [squares, setSquares] = useState(initialValue);
  const [xIsNext, setXIsNext] = useState(true);
  const handleSquareClick = (i) => {
    const nextSquare = squares.slice();
    if (squares[i] || calculateWinner(squares)) return;
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "0";
    }

    setSquares(nextSquare);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square onSquareClick={() => handleSquareClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleSquareClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleSquareClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleSquareClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleSquareClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleSquareClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleSquareClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleSquareClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleSquareClick(8)} value={squares[8]} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
