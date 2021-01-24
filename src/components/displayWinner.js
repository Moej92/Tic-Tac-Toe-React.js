import React from 'react'

function DisplayWinner({displayWinner, playAgain, cellsArray, isWinning, isPlayerTurn, isXTurn}) {
    return (
        <div className={displayWinner ? 'display-winner' : 'hide'}>
            <h2
                style={isXTurn ? {backgroundColor: 'var(--red-bg)'}
                               : {backgroundColor: 'var(--blue-bg)'}}
            >
                {isPlayerTurn && isWinning(cellsArray) ? 'Computer Win!' 
                : cellsArray.every(cell => cell) && !isWinning(cellsArray) 
                ? 'It\'s a tie'
                :'Player Win!'}</h2>
            <button onClick={playAgain}>Again</button>
        </div>
    )
}

export default DisplayWinner