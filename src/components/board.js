import React, {useState} from 'react'
import XRender from './xRender'
import ORender from './oRender'

function Board({cellsArray, playerAction, isXTurn, isPlayerTurn}) {
    const [index, setIndex] = useState(100);

    const displayCells = cellsArray.map((cell, i, arr) => (
        <div 
            key={`cell${i+1}`}
            className={index === i && isXTurn && typeof arr[i] === 'number' && isPlayerTurn
                        ? 'cell x-turn-hover' 
                        : index === i && !isXTurn && typeof arr[i] === 'number' && isPlayerTurn
                        ? 'cell o-turn-hover'
                        : 'cell'}
            onClick={() => playerAction(i)}
            onMouseEnter={() => setIndex(i)}
            onMouseLeave={() => setIndex(100)}
            >
                {arr[i] === 'X' ? <XRender /> : arr[i] === 'O' ? <ORender /> : null}
        </div>
    ))
    
    return (
        <div className='board-container'>
            <div className='game-board'>
                {displayCells}
            </div>
        </div>
        
    )
}

export default Board

