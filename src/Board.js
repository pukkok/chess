import React, { useEffect, useState } from "react";
import './Board.css'
import ChessPiece from "./Piece";
import Rules from "./Rules";
import { useRecoilState } from "recoil";
import { gamesAtom, turnAtom } from "./Recoil/ChessAtom";

function Board () {
    const [games, setGames] = useRecoilState(gamesAtom)
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: 'black', on:false})
    const [possibleMove, setPossibleMove] = useState([])
    const [checkMate, setCheckMate] = useState({})
    const [turn, setTurn] = useRecoilState(turnAtom)

    const [endGame, setEndGame] = useState(false)

    const catchPiece = (e, coords, color, piece, turn, endGame) => {
        if(endGame){
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
                                setEndGame(true)
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
        setPossibleMove(result)
        if(!caughtPiece.on){
            const nextResult = Rules({...caughtPiece, on: true}, games)
            console.log(nextResult)
            if(nextResult){
                nextResult.forEach(coords => {
                    let ver = coords.split('-')[0]
                    let hor = coords.split('-')[1]
                    let check = games[ver][hor].piece
                    if(check === 'King'){ // 체크메이트
                        console.log('왕 발견')
                        console.log(turn)
                        setCheckMate({color: turn, piece: check, coords})
                    }
                })
            }
        }
    },[caughtPiece, games])

    return(
        <section>
            {games.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className="box" key={col} onClick={(e)=>catchPiece(e, `${row}-${col}`, box.color, box.piece, turn, endGame)}>
                            <ChessPiece color={box.color} piece={box.piece} checkMate={checkMate.coords === `${row}-${col}`}
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