import { atom } from "recoil";
import chessBoard from "../Games/ChessBoard";

const gamesAtom = atom({
    key: 'games',
    default: JSON.parse(JSON.stringify(chessBoard))
})

const turnAtom = atom({
    key: 'turn',
    default: 'black'
})

const isEndAtom = atom({
    key: 'isEnd',
    default : false
})

export {
    turnAtom,
    gamesAtom,
    isEndAtom
}