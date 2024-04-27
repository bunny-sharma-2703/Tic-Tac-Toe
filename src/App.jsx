import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"




function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns)
  
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns
      });

  }
  

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player name="Player 2" symbol="Y" isActive={activePlayer === 'O'}/>
      </ol>
      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
    </div>
    <Log turns={gameTurns}></Log>
   </main>
  )
}

export default App
