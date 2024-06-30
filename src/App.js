import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import Board from './Board';
import { gamesAtom, turnAtom } from './Recoil/ChessAtom';
import chessBoard from './ChessBoard';
import classNames from 'classnames';

function App() {
  const [turn, setTurn] = useRecoilState(turnAtom)
  const setGames = useSetRecoilState(gamesAtom)

  const resetGame = () => {
    setTurn('black')
    setGames(JSON.parse(JSON.stringify(chessBoard)))
  }

  return (
    <div className="App">
      <h1>체스 게임</h1>
      <div className='container'>
        <div className='option-box'>
          <p className={classNames({active : turn === 'black'})}>흑색 턴!</p>
          <button onClick={resetGame}>새게임</button>
        </div>
        <Board turn={turn}/>
        <div className='option-box'>
          <p className={classNames({active : turn === 'white'})}>흰색 턴!</p>
          <button onClick={resetGame}>새게임</button>
        </div>
      </div>
    </div>
  )
}

export default App;
