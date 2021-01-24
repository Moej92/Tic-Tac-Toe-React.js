import React from 'react'
import Title from './title'

function StartMenu({isGameStart, startGame, difficulty, changeDifficulty}) {
    
    return (
        <div className={isGameStart ? `menu fade-out` : `menu fade-in`}>
            <Title />
            <div className='choose-difficulty'>
                <h3 className='choose-difficulty'>Choose Difficulty</h3>
                <div className='difficulty-inputs'>
                    <input 
                        type='button' 
                        className={difficulty === 'Easy' ?  'difficulties selectedDifficulty' : 'difficulties'} 
                        value='Easy' 
                        onClick={changeDifficulty}
                    />
                    <input 
                        type='button' 
                        className={difficulty === 'Medium' ?  'difficulties selectedDifficulty' : 'difficulties'} 
                        value='Medium'
                        onClick={changeDifficulty}
                    />
                    <input 
                        type='button' 
                        className={difficulty === 'Impossible' ?  'difficulties selectedDifficulty' : 'difficulties'} 
                        value='Impossible'
                        onClick={changeDifficulty}
                    />
                </div>
                <p className='current-difficulty'>Current Difficulty: <span>{difficulty}</span></p>
            </div>
            <div className='start-btn-area'>
                <button className='start-game' onClick={startGame}>Start</button>
            </div>
        </div>
    )
}

export default StartMenu