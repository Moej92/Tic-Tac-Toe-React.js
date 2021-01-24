import React from 'react'

function Turn({isPlayerTurn, isXTurn}) {
    return (
        <div className='turn'>
            <h2
                style={isXTurn 
                      ? {...turnStyle, color: 'var(--blue-bg)', borderBottom: '3px solid var(--blue-bg)'} 
                      : {...turnStyle, color: 'var(--red-bg)', borderBottom: '3px solid var(--red-bg)'}}>
                    {isPlayerTurn ? 'Player Turn' : 'Computer Turn'}
            </h2>
        </div>
    )
}

const turnStyle = {
  fontSize: '1.9rem',
  padding: '0.3em',
  margin: 'auto'
}

export default Turn