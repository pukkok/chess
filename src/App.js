import { useRecoilState, useSetRecoilState } from 'recoil';
import './App.css';
import Board from './Games/Board';
import { gamesAtom, isEndAtom, turnAtom } from './Recoil/ChessAtom';
import chessBoard from './Games/ChessBoard';
import classNames from 'classnames';

function App() {
  const [turn, setTurn] = useRecoilState(turnAtom)
  const setGames = useSetRecoilState(gamesAtom)
  const [isEnd, setisEnd] = useRecoilState(isEndAtom)

  const resetGame = () => {
    setTurn('black')
    setGames(JSON.parse(JSON.stringify(chessBoard)))
    setisEnd(false)
  }
  const giveupGame = (color) => {
    if(isEnd){
      return alert('이미 종료된 게임입니다.')
    }
    alert(color + '승리')
    resetGame()
  }

  return (
    <div className="App">
      <h1>체스 게임</h1>
      <div className='container'>
        <div className='option-box'>
          <p className={classNames({active : turn === 'black'})}>흑색 턴!</p>
          <button onClick={resetGame}>새게임</button>
          <button onClick={()=>giveupGame('white')}>기권</button>
        </div>
        <Board/>
        <div className='option-box'>
          <p className={classNames({active : turn === 'white'})}>흰색 턴!</p>
          <button onClick={resetGame}>새게임</button>
          <button onClick={()=>giveupGame('black')}>기권</button>
        </div>
      </div>
    </div>
  )
}

export default App;
