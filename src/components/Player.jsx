import { useState } from "react"

export default function Player({name, symbol, isActive}){
   const [isEditing, setEditing] = useState(false)
   function setPlayerNameField(){
     setEditing(!isEditing)
   }

    return (
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {!isEditing ? (<span className="player-name">{name}</span>) : (<input type="text" value={name} required/>)}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={setPlayerNameField}>Edit</button>
      </li>
    )
}