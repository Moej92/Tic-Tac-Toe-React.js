import React, { useState, useEffect } from 'react'
import Score from './score'
import Turn from './turn'
import Board from './board'
import DisplayWinner from './displayWinner'

import {isWinning, newCellsArray, minimax} from '../utils/utils';

function Game({isGameStart, difficulty}) {
    const [cellsArray, setCellsArray] = useState(Array.from(Array(9).keys()))
    const [isXTurn, setIsXTurn] = useState(true)
    const [isPlayerTurn, setIsPlayerTurn] = useState(Math.random() < 0.5)
    const [displayWinner, setDisplayWinner] = useState(false);
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)

    const playerAction = (i) => {
        if (typeof cellsArray[i] === 'number' && !isWinning(cellsArray) && isPlayerTurn) {
            const currentChar = isXTurn ? 'X' : 'O';
            setCellsArray(newCellsArray(cellsArray, i, currentChar))
            setIsXTurn(prevTurn => !prevTurn);
            setIsPlayerTurn(false)
        }
    }
    
    const easyAi = (currentAction) => {
        let random_action = Math.floor(Math.random() * cellsArray.length);
        while(typeof cellsArray[random_action] !== 'number') { 
            random_action = Math.floor(Math.random() * cellsArray.length);
        }
        setCellsArray(newCellsArray(cellsArray, random_action, currentAction));
        setIsXTurn(prevTurn => !prevTurn)
        setIsPlayerTurn(true)
    }

    const impossibleAi = (currentAction) => {
        const aiSpot = minimax([...cellsArray], currentAction).index;
        setCellsArray(newCellsArray([...cellsArray], aiSpot, currentAction))
        setIsXTurn(prevTurn => !prevTurn)
        setIsPlayerTurn(true)
    }

    const computerAction = () => {
        let timeOut;
        if (!isPlayerTurn && !isWinning(cellsArray) && !displayWinner && isGameStart)
         timeOut = setTimeout(() => {
            const currentAction = isXTurn ? 'X' : 'O';
            if (difficulty === 'Easy') {
                easyAi(currentAction)
            }
            else if (difficulty === 'Medium') {
                const randomDifficulty = Math.random();
                randomDifficulty < 0.3 ? easyAi(currentAction) : impossibleAi(currentAction);
            }
            else if (difficulty === 'Impossible') {
                impossibleAi(currentAction)
            }
            
        }, 1000)
        return () => {
            clearTimeout(timeOut);
        }
    }

    const playAgain = () => {
        updatedScore()
        setDisplayWinner(false);
        const emptyCells = Array.from(Array(9).keys())
        setCellsArray(emptyCells)
        setIsPlayerTurn(Math.random() < 0.5)
        setIsXTurn(true)
    }

    const updatedScore = () => {
        if (isWinning(cellsArray)) {
            if (isPlayerTurn) {
                setComputerScore(prevScore => prevScore + 1)
            } else {
                setPlayerScore(prevScore => prevScore + 1)
            }
        }
    }

    const checkTie = () => {
        const availableCells = cellsArray.filter(cell => typeof cell === 'number')
        if (availableCells.length === 0) {
            setDisplayWinner(true);
        }
    } 

    useEffect(computerAction, [isPlayerTurn, displayWinner, isGameStart])

    useEffect(() => {
        if (isWinning(cellsArray) || checkTie()) {
            setDisplayWinner(true)
        }
    }, [cellsArray])

    console.log(isWinning(cellsArray))
    return (
        <div className={isGameStart ? `game fade-in` : `hide`}>
            <div className='score-board'>
                <Score player={'Player'} score={playerScore}/>
                <Score player={'Computer'} score={computerScore}/>
            </div>
            <Turn isPlayerTurn={isPlayerTurn} isWinning={isWinning(cellsArray)} isXTurn={isXTurn}/>
            <Board 
                cellsArray={cellsArray} 
                playerAction={playerAction} 
                isXTurn={isXTurn} 
                isPlayerTurn={isPlayerTurn}
            />
            <DisplayWinner 
                displayWinner={displayWinner} 
                playAgain={playAgain} 
                cellsArray={cellsArray} 
                isWinning={isWinning}
                isPlayerTurn={isPlayerTurn}
                isXTurn={isXTurn}
            />
        </div>
    )
}

export default Game