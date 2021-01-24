import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import StartMenu from './components/startMenu'
import Game from './components/game'

function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');

  const startGame = () => {
    setIsGameStart(true)
  }

  const changeDifficulty = (event) => {
    setDifficulty(event.target.value);
  }

  return (
    <div className='game-container'>
      <StartMenu 
          isGameStart={isGameStart} 
          startGame={startGame} 
          difficulty={difficulty} 
          changeDifficulty={changeDifficulty}
      />
      <Game isGameStart={isGameStart} difficulty={difficulty}/>
    </div>
  )
}


export default App;
