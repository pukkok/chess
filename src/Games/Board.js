import React, { useEffect, useState } from "react";
import ChessPiece from "./Piece";
import Rules from "./Rules";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gamesAtom, isEndAtom, notationAtom, isPromotionAtom, turnAtom } from "../Recoil/ChessAtom";
import classNames from "classnames";

function Board () {
    const [games, setGames] = useRecoilState(gamesAtom)
    const [caughtPiece, setCaughtPiece] = useState({coords :'', piece:'', color: 'black', on:false})
    const [possibleMoves, setPossibleMoves] = useState([]) // 움직일수 있는 곳
    const [checkMates, setCheckMates] = useState([]) // 체크메이트 하는 기물
    const [pinch, setPinch] = useState({}) // 당하는 킹
    const [turn, setTurn] = useRecoilState(turnAtom)
    const [notation, setNotation] = useRecoilState(notationAtom)
    const [isEnd, setisEnd] = useRecoilState(isEndAtom)
    const setIsPromotion = useSetRecoilState(isPromotionAtom)

    const handelPieceClick = (e, coords, color, piece, turn, isEnd) => {
        
        // 게임 종료 || 빈칸 클릭
        if(isEnd || (!caughtPiece.on && piece === 'none')) return
        // 상대턴일 때
        if(possibleMoves.length===0 && turn !== color) return alert('상대 턴입니다.')
        // 처음 클릭
        if(!caughtPiece.coords) return setCaughtPiece({coords, color, piece, on: true})
            
        if(possibleMoves.length>0){
            if(possibleMoves.includes(coords)){
                movePiece(coords)
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

    const movePiece = (coords) => {
        let log = {prevPos: '', curPos: '', piece: '', color: ''}
        const [moveRow, moveCol] = coords.split('-').map(Number)
        const {piece, color, coords : caughtCoords} = caughtPiece
        const [noneRow, noneCol] = caughtCoords.split('-').map(Number)

        const changePosition = games.map((line, idx1)=>{
            return line.map((box, idx2)=>{

                if(idx1 === moveRow && idx2 === moveCol){
                    log = {...log, prev: games[idx1][idx2], curPos : `${moveRow}-${moveCol}`, piece, color}
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
                    log = {...log, prevPos : `${noneRow}-${noneCol}`}
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
    }

    console.log(notation)

    useEffect(()=>{

        const updateMoves = () => {
            const result = Rules({ ...caughtPiece }, games, notation)
            setPossibleMoves(result)
            setCheckMates(checkForCheckmates())
            handlePromotion()
        };

        const checkForCheckmates = () => {
            let mates = [];
            if (!caughtPiece.on) {
                games.forEach((line, row) => {
                    line.forEach((box, col) => {
                        if (box.piece !== 'none') {
                            const coords = `${row}-${col}`;
                            const moves = Rules({ piece: box.piece, color: box.color, coords, on: true }, games, notation);
                            moves.forEach(move => {
                                const [ver, hor] = move.split('-').map(Number);
                                const enemyChecker = games[ver][hor];
                                if (enemyChecker.piece === 'King' && enemyChecker.color !== box.color) {
                                    mates.push(coords);
                                    setPinch({ color: turn, piece: enemyChecker.piece, coords: move });
                                }
                            });
                        }
                    });
                });
            }
            if (mates.length === 0) setPinch({});
            return mates;
        };

        // 프로모션
        const handlePromotion = () => {
            if ((notation.curPos.startsWith('0') && notation.piece === 'Pawn' && notation.color === 'white') ||
                (notation.curPos.startsWith('7') && notation.piece === 'Pawn' && notation.color === 'black')) {
                console.log(`${notation.color === 'white' ? '화이트' : '블랙'} 폰 프로모션`);
                setIsPromotion(true);
            }
        }
        
        updateMoves()
    },[caughtPiece, games, notation])

    const alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return(
        <section className="board">
            {games.map((line, row) => {
                return <div className="line" key={row}>
                    {line.map((box, col) => {
                        return <div className={classNames("box", {curPos : notation.curPos === `${row}-${col}`, prevPos : notation.prevPos === `${row}-${col}`}, {checkmate : checkMates.includes(`${row}-${col}`)}, {'pinch' : pinch.coords === `${row}-${col}`})} key={col} 
                        onClick={(e)=>handelPieceClick(e, `${row}-${col}`, box.color, box.piece, turn, isEnd)}>
                            {col=== 0 && <span className="numbering">{8-row}</span>}
                            {row === 7 && <span className="alpha">{alphas[col]}</span>} 
                            <ChessPiece color={box.color} piece={box.piece}
                            caughtPiece={`${row}-${col}` === caughtPiece.coords && caughtPiece.on}
                            possibleMove={possibleMoves.length>0 && possibleMoves.includes(`${row}-${col}`) ? true : false}
                            />

                        </div>
                    })}
                </div>
            })}
        </section>
    )
}
export default Board