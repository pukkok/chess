import React, { useEffect, useState } from "react";
import './Board.css'
import ChessPiece from "./Piece";
import chessBoard from "./ChessBoard";

function Board () {
    const [game, setGame] = useState(chessBoard)
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: '', on:false})
    const [possibleMove, setPossibleMove] = useState([])
    const catchPiece = (e, coords, color, piece) => {
        if(!caughtPiece.coords){
            setCaughtPiece({coords, color, piece, on: true})
        }else{
            if(caughtPiece.coords !== coords){
                setCaughtPiece({coords, color, piece, on: true})
            }else{
                setCaughtPiece({coords, color, piece, on: false})
            }
        }
    }

    useEffect(()=>{
        const {coords, color, piece} = caughtPiece
        if(piece ==='Pawn' && color === 'white'){
            const x = +coords.split('-')[0]
            if(x === 6){
                console.log('처음 시작하는 자리')
                
                const moveA = x-1 + '-' + coords.split('-')[1]  
                const moveB = x-2 + '-' + coords.split('-')[1]  
                setPossibleMove([moveA, moveB])
            }
        }

        if(piece ==='Pawn' && color === 'black'){
            const x = +coords.split('-')[0]
            if(x === 1){ // 처음 시작
                
                const moveA = x+1 + '-' + coords.split('-')[1]  
                const moveB = x+2 + '-' + coords.split('-')[1]  
                setPossibleMove([moveA, moveB])
            }
        }
    },[caughtPiece])

    return(
        <section>
            {game.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className="box" key={col} onClick={(e)=>catchPiece(e, `${row}-${col}`, box.color, box.piece)}>
                            <ChessPiece color={box.color} piece={box.piece} 
                            caughtPiece={`${row}-${col}` === caughtPiece.coords && caughtPiece.on}
                            possibleMove={possibleMove.includes(`${row}-${col}`)}
                            />
                            
                        </div>
                    })}
                </div>
            })}
        </section>
    )
}
export default Board