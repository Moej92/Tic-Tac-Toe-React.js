import React from 'react'

function Score({player, score}) {
    return <h3 className='score'>{player}: <span>{score}</span></h3>
}

export default Score