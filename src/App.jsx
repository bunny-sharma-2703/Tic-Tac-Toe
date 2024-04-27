import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./Support/winning-combinations"
import GameOver from "./components/GameOver"

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}


function App() {
  const [playerObject ,  setPlayerNameField] = useState({
    X: "Player 1",
    O: "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = [...initialGameboard.map(array => [...array])]
  let winner

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row,col} = square
      gameBoard[row][col] = player
  }

  for(const combinations of WINNING_COMBINATIONS){
    let firstElement = gameBoard[combinations[0].row][combinations[0].column]
    let secondElement =  gameBoard[combinations[1].row][combinations[1].column]
    let thirdElement =  gameBoard[combinations[2].row][combinations[2].column]

    if(firstElement && firstElement === secondElement && firstElement === thirdElement){
      winner = playerObject[firstElement]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner
  
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns
      });

  }

  function handleRematch(){
    setGameTurns([])
  }
  
  function handlePlayerNameChange(symbol, newName){
    setPlayerNameField(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol] : newName
      }
    })
  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
          <Player name= {playerObject.X} symbol="X" isActive={activePlayer === 'X'} onChangeName = {handlePlayerNameChange}/>
          <Player name= {playerObject.O} symbol="O" isActive={activePlayer === 'O'} onChangeName = {handlePlayerNameChange}/>
      </ol>
      {winner && <GameOver winner={winner} restart={handleRematch}/>}
      {hasDraw && <GameOver restart={handleRematch}></GameOver>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}></Log>
   </main>
  )
}

export default App
