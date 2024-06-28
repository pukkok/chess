import React, { useEffect, useState } from "react";
import './Board.css'
import ChessPiece from "./Piece";
import chessBoard from "./ChessBoard";
import Rules from "./Rules";

function Board () {
    const [games, setGames] = useState(JSON.parse(JSON.stringify(chessBoard)))
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: '', on:false})
    const [possibleMove, setPossibleMove] = useState([])
    const catchPiece = (e, coords, color, piece) => {

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
                            box = {piece, color}
                        }
                        
                        const noneRow = +caughtPiece.coords.split('-')[0]
                        const noneCol = +caughtPiece.coords.split('-')[1]
                        if(idx1 === noneRow && idx2 === noneCol){
                            box = {piece : 'none', color: 'none'}
                        }
                        return box
                    })
                })
                setGames(changePosition)
                setCaughtPiece({coords, color: caughtPiece.color, piece : caughtPiece.piece, on: false})
                return
            }else{
                if(caughtPiece.color !== color){
                    return alert('잘못된 선택입니다.')
                }
            }
        }else{

            
        }
        
        if(caughtPiece.coords !== coords){
            setCaughtPiece({coords, color, piece, on: true})
        }else{
            setCaughtPiece({coords, color, piece, on: !caughtPiece.on})
        }
        
    }

    useEffect(()=>{
        const result = Rules({...caughtPiece}, games)
        setPossibleMove(result)
        
    },[caughtPiece])

    return(
        <section>
            {games.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className="box" key={col} onClick={(e)=>catchPiece(e, `${row}-${col}`, box.color, box.piece)}>
                            <ChessPiece color={box.color} piece={box.piece} 
                            caughtPiece={`${row}-${col}` === caughtPiece.coords && caughtPiece.on}
                            possibleMove={possibleMove.length>0 && possibleMove.includes(`${row}-${col}`) ? true : false}
                            />
                        </div>
                    })}
                </div>
            })}
            <button onClick={()=>setGames('')}></button>
        </section>
    )
}
export default Board