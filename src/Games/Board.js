import React, { useEffect, useState } from "react";
import ChessPiece from "./Piece";
import Rules from "./Rules";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gamesAtom, isEndAtom, notationAtom, isPromotionAtom, turnAtom } from "../Recoil/ChessAtom";
import classNames from "classnames";

function Board () {
    const [games, setGames] = useRecoilState(gamesAtom)
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: 'black', on:false})
    const [possibleMove, setPossibleMove] = useState([]) // 움직일수 있는 곳
    const [checkMates, setCheckMates] = useState([]) // 체크메이트 하는 기물
    const [pinch, setPinch] = useState({}) // 당하는 킹
    const [turn, setTurn] = useRecoilState(turnAtom)
    const [notation, setNotation] = useRecoilState(notationAtom)
    const [isEnd, setisEnd] = useRecoilState(isEndAtom)
    const setIsPromotion = useSetRecoilState(isPromotionAtom)

    const catchPiece = (e, coords, color, piece, turn, isEnd) => {
        let log = {prevPos: '', curPos: '', piece: '', color: ''}
        
        if(isEnd){
            return
        }

        if(!caughtPiece.on && piece === 'none'){
            return console.log('빈칸 누르는 중')
        }
        
        if(possibleMove.length===0 && turn !== color){
            return alert('상대 턴입니다.')
        }

        if(!caughtPiece.coords){ // 맨처음 선택
            setCaughtPiece({coords, color, piece, on: true})
        }
            
        if(possibleMove.length>0){
            if(possibleMove.includes(coords)){

                const moveRow = +coords.split('-')[0]
                const moveCol = +coords.split('-')[1]
                const {piece, color, coords : caughtCoords} = caughtPiece

                const noneRow = +caughtCoords.split('-')[0]
                const noneCol = +caughtCoords.split('-')[1]

                const changePosition = games.map((line, idx1)=>{
                    return line.map((box, idx2)=>{

                        if(idx1 === moveRow && idx2 === moveCol){
                            log = {...log, curPos : moveRow + '-' + moveCol, piece, color}
                            // 바뀌는 곳
                            box = {piece, color}
                            const checkMate = games[moveRow][moveCol]
                            if(checkMate.piece === 'King'){
                                alert(turn + '의 승리')
                                setisEnd(true)
                            }
                        }
                        
                        if(idx1 === noneRow && idx2 === noneCol){
                            // 이전에 있던 곳 비우기
                            box = {piece : 'none', color: 'none'}
                            log = {...log, prevPos : noneRow + '-' + noneCol}
                        }

                        // 백 앙파상
                        if(+notation.prevPos.split('-')[0] === 1 && +notation.curPos.split('-')[0] === 3 &&
                            idx1 === 3 && noneRow === 3 && idx2 === +notation.curPos.split('-')[1] &&
                            notation.piece === 'Pawn' && notation.color === 'black'){
                                box = {piece : 'none', color: 'none'}
                        }
                        // 흑 앙파상
                        if(+notation.prevPos.split('-')[0] === 6 && 
                            +notation.curPos.split('-')[0] === 4 &&
                            idx1 === 4 && noneRow === 4 &&
                            idx2 === +notation.curPos.split('-')[1] &&
                            notation.piece === 'Pawn' && notation.color === 'white'){
                                box = {piece : 'none', color: 'none'}
                        }

                        return box
                    })
                })
                if(log.curPos){
                    setNotation({...log})
                }
                setGames(changePosition)
                setCaughtPiece({coords, color: caughtPiece.color, piece : caughtPiece.piece, on: false})
                const changeTurn = caughtPiece.color === 'black' ? 'white' : 'black'
                setTurn(changeTurn)
                return
            }else{
                if(caughtPiece.color !== color){
                    return alert('움직일수 없는 곳 입니다.')
                }
            }
        }
        
        if(caughtPiece.coords !== coords){ // 다른것 클릭했을때 다른것 액티브
            setCaughtPiece({coords, color, piece, on: true})
        }else{ // 같은 것 클릭했을때 내려놓기
            setCaughtPiece({coords, color, piece, on: !caughtPiece.on})
        }        
    }

    useEffect(()=>{
        const result = Rules({...caughtPiece}, games, notation)
        let mates = []
        if(!caughtPiece.on){
            games.forEach((line, row) => {
                line.forEach((box, col) => {
                    if(box.piece !== 'none'){
                        const coords = row + '-' + col
                        const {piece, color} = box
                        const moves = Rules({piece, color, coords, on:true}, games, notation)

                        if(moves.length>0){
                            
                            moves.forEach(move => {
                                const ver = move.split('-')[0]
                                const hor = move.split('-')[1]
                                const enemyChecker = games[ver][hor]
                                
                                if(enemyChecker.piece === 'King' && enemyChecker.color !== color){
                                    mates = [...mates, coords]
                                    setPinch({color: turn, piece: enemyChecker.piece, coords : move})
                                }
                            })

                        }
                        
                    }
                })
            })

            if(mates.length === 0){
                setPinch({})
            }            
        }
        // 프로모션
        if(+notation.curPos.split('-')[0] === 0 && notation.piece === 'Pawn' && notation.color === 'white'){
            console.log('화이트 폰 프로모션')
            setIsPromotion(true)
        }
        if(+notation.curPos.split('-')[0] === 7 && notation.piece === 'Pawn' && notation.color === 'black'){
            console.log('블랙 폰 프로모션')
            setIsPromotion(true)
        }
        setCheckMates(mates)
        setPossibleMove(result) // 움직일수 있는 위치
    },[caughtPiece, games, notation])

    const alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return(
        <section className="board">
            {games.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className={classNames("box", {curPos : notation.curPos === `${row}-${col}`, prevPos : notation.prevPos === `${row}-${col}`}, {checkmate : checkMates.includes(`${row}-${col}`)}, {'pinch' : pinch.coords === `${row}-${col}`})} key={col} 
                        onClick={(e)=>catchPiece(e, `${row}-${col}`, box.color, box.piece, turn, isEnd)}>
                            {col=== 0 && <span className="numbering">{8-row}</span>}
                            {row === 7 && <span className="alpha">{alphas[col]}</span>} 
                            <ChessPiece color={box.color} piece={box.piece}
                            caughtPiece={`${row}-${col}` === caughtPiece.coords && caughtPiece.on}
                            possibleMove={possibleMove.length>0 && possibleMove.includes(`${row}-${col}`) ? true : false}
                            />

                        </div>
                    })}
                </div>
            })}
        </section>
    )
}
export default Board