import { atom } from "recoil";
import chessBoard from "../Games/ChessBoard";

const gamesAtom = atom({
    key: 'games',
    default: JSON.parse(JSON.stringify(chessBoard))
})

const turnAtom = atom({
    key: 'turn',
    default: 'white'
})

const isEndAtom = atom({
    key: 'isEnd',
    default : false
})

const logPosAtom = atom({
    key: 'logPos',
    default : {prevPos: '', curPos: '', piece: '', color: ''}
})

export {
    turnAtom,
    gamesAtom,
    isEndAtom,
    logPosAtom
}