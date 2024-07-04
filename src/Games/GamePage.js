import React, { useEffect, useState } from "react";
import './GamePage.css'
import { useRecoilState, useSetRecoilState } from 'recoil';
import Board from './Board';
import { gamesAtom, isEndAtom, logPosAtom, logsAtom, promotionAtom, turnAtom } from '../Recoil/ChessAtom';
import chessBoard from './ChessBoard';
import ChessPiece from "./Piece";

function GamePage() {

    const [turn, setTurn] = useRecoilState(turnAtom)
    const setGames = useSetRecoilState(gamesAtom)
    const [isEnd, setisEnd] = useRecoilState(isEndAtom)
    const [logPos, setLogPos] = useRecoilState(logPosAtom)
    const [logs, setLogs] = useRecoilState(logsAtom)
    const [promotion, setPromotion] = useRecoilState(promotionAtom)

    useEffect(()=>{
      if(logPos.prevPos){
        setLogs([...logs, logPos])
      }
    },[logPos, setLogs])

    const resetGame = () => {
      setTurn('white')
      setGames(JSON.parse(JSON.stringify(chessBoard)))
      setisEnd(false)
    }
    const requestDraw = () => {
      alert('우리 무승부로 하지 않을래? ㅜㅜ')
    }
    const giveupGame = (user) => {
      
      if(isEnd){
        return alert('이미 종료된 게임입니다.')
      }
      alert(user + '승리')
      resetGame()
    }

    const changePiece = (pieceName) => {
      const {curPos, color} = logPos
      setGames(prevs => prevs.map((line, idx1) => {
        return line.map((box, idx2) => {
          if(idx1 === +curPos.split('-')[0] && idx2 === +curPos.split('-')[1]){
            box = {piece : pieceName, color}
          }
          return box
        })
      }))
      setLogPos({...logPos, piece : pieceName})
      setPromotion(prev => prev = false)
    }

    console.log(promotion)

    return(
      <section className="game-page">
        <h1>체스 게임</h1>
        <div className='container'>
            <Board/>
            <div className='sidebar'>
                <div className='option-box'>
                    <p>{turn === 'white' ? '흰색' : '흑색'} 턴!</p>
                    <button onClick={resetGame}>새게임</button>
                    <button onClick={requestDraw}>무승부 요청</button>
                    <button onClick={()=>giveupGame('white')}>기권</button>
                </div>
                <div className='log-box'>
                    <p>체스 기보(공부 중)</p>
                    {logs.length>0 && logs.map((log, idx) => {
                      const {prevPos, curPos, piece, color} = log
                      return <p key={idx}>{prevPos} {curPos}, {piece} {color}</p>
                    })}
                </div>
            </div>
        </div>
        {promotion && <div className="promotion-bg">
          <div className="promotion">
            <p>프로모션 선택</p>
            <div className="btn-box">
              <button onClick={()=>changePiece('knight')}>
                <ChessPiece color={logPos.color} piece="Knight"/>
              </button>
              <button onClick={()=>changePiece('Queen')}>
                <ChessPiece color={logPos.color} piece="Queen"/>
              </button>
              <button onClick={()=>changePiece('Rook')}>
                <ChessPiece color={logPos.color} piece="Rook"/>
              </button>
              <button onClick={()=>changePiece('Bishop')}>
                <ChessPiece color={logPos.color} piece="Bishop"/>
              </button>
            </div>
          </div>
        </div>}
      </section>
    )
}

export default GamePage