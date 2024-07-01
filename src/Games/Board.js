import React, { useEffect, useState } from "react";
import './Board.css'
import ChessPiece from "./Piece";
import Rules from "./Rules";
import { useRecoilState } from "recoil";
import { gamesAtom, isEndAtom, turnAtom } from "../Recoil/ChessAtom";
import classNames from "classnames";

function Board () {
    const [games, setGames] = useRecoilState(gamesAtom)
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: 'black', on:false})
    const [possibleMove, setPossibleMove] = useState([])
    const [checkMates, setCheckMates] = useState([])
    const [pinch, setPinch] = useState({})
    const [turn, setTurn] = useRecoilState(turnAtom)

    const [isEnd, setisEnd] = useRecoilState(isEndAtom)

    const catchPiece = (e, coords, color, piece, turn, isEnd) => {
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
                const changePosition = games.map((line, idx1)=>{
                    return line.map((box, idx2)=>{
                        const moveRow = +coords.split('-')[0]
                        const moveCol = +coords.split('-')[1]
                        const {piece, color} = caughtPiece
                        if(idx1 === moveRow && idx2 === moveCol){
                            // 바뀌는 곳
                            box = {piece, color}
                            const checkMate = games[moveRow][moveCol]
                            if(checkMate.piece === 'King'){
                                alert(turn + '의 승리')
                                setisEnd(true)
                            }
                        }
                        
                        const noneRow = +caughtPiece.coords.split('-')[0]
                        const noneCol = +caughtPiece.coords.split('-')[1]
                        if(idx1 === noneRow && idx2 === noneCol){
                            // 이전에 있던 곳
                            box = {piece : 'none', color: 'none'}
                        }
                        return box
                    })
                })
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
        const result = Rules({...caughtPiece}, games)

        let mates = []
        if(!caughtPiece.on){
            games.forEach((line, row) => {
                line.forEach((box, col) => {
                    if(box.piece !== 'none'){
                        const coords = row + '-' + col
                        const {piece, color} = box
                        const moves = Rules({piece, color, coords, on:true}, games)

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
        setCheckMates(mates)
        setPossibleMove(result) // 움직일수 있는 위치
    },[caughtPiece, games])

    return(
        <section>
            {games.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className={classNames("box", {checkmate : checkMates.includes(`${row}-${col}`)}, {'pinch' : pinch.coords === `${row}-${col}`})} key={col} 
                        onClick={(e)=>catchPiece(e, `${row}-${col}`, box.color, box.piece, turn, isEnd)}>

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