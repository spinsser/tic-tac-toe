import { useState } from 'react'
import './App.css'
import {TicTacToe, TTicTacToe} from './model/game';
import TicTacToeGame from './components/TicTacToeGame';

const mapSize = 3;
const initialState = new TicTacToe({mapSize} as TTicTacToe);

function App() {
  const [game, setGame] = useState(initialState)

  return (
    <TicTacToeGame game={game} setGame={setGame} />
  )
}

export default App
