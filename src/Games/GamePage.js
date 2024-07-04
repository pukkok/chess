import React, { useEffect, useState } from "react";
import './GamePage.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Board from './Board';
import { gamesAtom, isEndAtom, logPosAtom, turnAtom } from '../Recoil/ChessAtom';
import chessBoard from './ChessBoard';

function GamePage() {
    const [turn, setTurn] = useRecoilState(turnAtom)
    const setGames = useSetRecoilState(gamesAtom)
    const [isEnd, setisEnd] = useRecoilState(isEndAtom)
    const logPos = useRecoilValue(logPosAtom)
    const [logs, setLogs] = useState([])
    useEffect(()=>{
      if(logPos.prevPos){
        setLogs([...logs, logPos])
      }
    },[logPos])
    const resetGame = () => {
      setTurn('white')
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
          <Board/>
          <div className='sidebar'>
              <div className='option-box'>
                  <p>{turn === 'white' ? '흰색' : '흑색'} 턴!</p>
                  <button onClick={resetGame}>새게임</button>
                  <button onClick={()=>giveupGame('white')}>기권</button>
              </div>
              <div className='log-box'>
                  <p>체스 기보</p>
                  {logs.length>0 && logs.map((log, idx) => {
                    const {prevPos, curPos, piece, color} = log
                    return <p key={idx}>{prevPos} {curPos}, {piece} {color}</p>
                  })}
              </div>
          </div>
      </div>
      </section>
    )
}

export default GamePage