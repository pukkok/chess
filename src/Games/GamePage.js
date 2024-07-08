import React from "react";
import './GamePage.css'
import { useRecoilState, useSetRecoilState } from 'recoil';
import Board from './Board';
import { gamesAtom, isEndAtom, isPromotionAtom, notationAtom, turnAtom, notesAtom } from '../Recoil/ChessAtom';
import chessBoard from './ChessBoard';
import ChessPiece from "./Piece";
import Notation from "./Notation";

function GamePage() {

  const setGames = useSetRecoilState(gamesAtom) // 게임초기화
  const [turn, setTurn] = useRecoilState(turnAtom) // 게임 턴
  const [isEnd, setisEnd] = useRecoilState(isEndAtom) // 게임 종료 확인
  const [isPromotion, setIsPromotion] = useRecoilState(isPromotionAtom) // 프로모션 중인지 확인
  const [notation, setNotation] = useRecoilState(notationAtom)

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
      const {curPos, color} = notation
      setGames(prevs => prevs.map((line, idx1) => {
        return line.map((box, idx2) => {
          if(idx1 === +curPos.split('-')[0] && idx2 === +curPos.split('-')[1]){
            box = {piece : pieceName, color}
          }
          return box
        })
      }))
      setNotation({...notation, piece : pieceName})
      setIsPromotion(prev => prev = false)
    }

    return(
      <section className="game-page">
        <h1>체스 게임</h1>
        <div className='container'>
            <Board/>
            <div className='sidebar'>
                <div className='option-box'>
                    <h4>{turn === 'white' ? '흰색' : '흑색'} 턴!</h4>
                    <button onClick={resetGame}>새게임</button>
                    <button onClick={requestDraw}>무승부 요청</button>
                    <button onClick={()=>giveupGame('white')}>기권</button>
                </div>
                <Notation/>
            </div>
        </div>
        {isPromotion && <div className="promotion-bg">
          <div className="promotion">
            <p>프로모션 선택</p>
            <div className="btn-box">
              <button onClick={()=>changePiece('knight')}>
                <ChessPiece color={notation.color} piece="Knight"/>
              </button>
              <button onClick={()=>changePiece('Queen')}>
                <ChessPiece color={notation.color} piece="Queen"/>
              </button>
              <button onClick={()=>changePiece('Rook')}>
                <ChessPiece color={notation.color} piece="Rook"/>
              </button>
              <button onClick={()=>changePiece('Bishop')}>
                <ChessPiece color={notation.color} piece="Bishop"/>
              </button>
            </div>
          </div>
        </div>}
      </section>
    )
}

export default GamePage