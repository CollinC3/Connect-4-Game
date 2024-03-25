import './App.css'
import { useState, useEffect } from 'react'

function App() {
  let [board, setBoard] = useState(new Array(7).fill(new Array(6).fill(null)));
  let [turn, setTurn] = useState('Red');
  let [winner, setWinner] = useState('');
  let [winnerStyle, setWinnerStyle] = useState("winnerMessage");

  useEffect(() => {
    setWinner(checkWinner());
  }, [board])

  useEffect(() => {
    setWinnerStyle('winnerMessage appear');
  }, [winner])

  const checkLine = (a, b, c, d) => ((a !== null) && (a === b) && (a === c) && (a === d))

  const checkWinner = () => {
    for (let c = 0; c < 7; c++)
      for (let r = 0; r < 4; r++)
        if (checkLine(board[c][r], board[c][r + 1], board[c][r + 2], board[c][r + 3]))
          return board[c][r];

    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (checkLine(board[c][r], board[c + 1][r], board[c + 2][r], board[c + 3][r]))
          return board[c][r];

    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        if (checkLine(board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]))
          return board[c][r];

    for (let r = 0; r < 4; r++)
      for (let c = 3; c < 6; c++)
        if (checkLine(board[c][r], board[c - 1][r + 1], board[c - 2][r + 2], board[c - 3][r + 3]))
          return board[c][r];

    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 7; c++)
        if (board[c][r] === null)
          return "";

    return "Draw";
  }

  const makeMove = (col) => {
    const boardCopy = board.map((arr) => arr.slice())
    if (boardCopy[col].indexOf(null) !== -1) {
      let newColumn = boardCopy[col].reverse()
      newColumn[newColumn.indexOf(null)] = turn;
      newColumn.reverse()
      setTurn(turn === 'Red' ? 'Blue' : 'Red');
      setBoard(boardCopy);
    }
  }

  const handleClick = (col) => {
    if (winner == '') {
      makeMove(col);
    }
  }

  const Square = ({ value }) => {
    return (
      <div className='Square'>
        <div className={value} />
      </div>
    )
  }

  const Column = ({ squares, handleClick }) => {
    return (
      <div className='Column' onClick={() => handleClick()}>
        {[...Array(squares.length)].map((x, j) => (
          <Square key={j} value={squares[j]} />
        ))}

      </div>
    );
  }


  return (
    <>
      <h1 className='Game'>Connect 4</h1>
      <div className="Game">
        <div className="Game-Board">
          <div className='Board'>
            {[...Array(board.length)].map((x, i) => (
              <Column key={i} squares={board[i]} handleClick={() => handleClick(i)} />
            ))}
          </div>
          <div className={winnerStyle}>{winner} Wins!</div>
        </div>
      </div>
    </>
  )
}

export default App