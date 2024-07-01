import React from "react";
import './GamePage.css'
import { useRecoilState, useSetRecoilState } from 'recoil';
import Board from './Board';
import { gamesAtom, isEndAtom, turnAtom } from '../Recoil/ChessAtom';
import chessBoard from './ChessBoard';
import classNames from 'classnames';
import { Link } from "react-router-dom";

function GamePage() {
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

    return(
        <section className="game-page">
            <h1>체스 게임</h1>
            <div className='container'>
                <div className='option-box'>
                    <p className={classNames({active : turn === 'black'})}>흑색 턴!</p>
                    <button onClick={resetGame}>새게임</button>
                    <button onClick={()=>giveupGame('white')}>기권</button>
                    <Link to={'/login'}>로그인</Link>
                </div>
                <Board/>
                <div className='option-box'>
                    <p className={classNames({active : turn === 'white'})}>흰색 턴!</p>
                    <button onClick={resetGame}>새게임</button>
                    <button onClick={()=>giveupGame('black')}>기권</button>
                </div>
            </div>
        </section>
    )
}

export default GamePage