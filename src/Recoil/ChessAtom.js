import { atom } from "recoil";
import chessBoard from "../ChessBoard";

const gamesAtom = atom({
    key: 'games',
    default: JSON.parse(JSON.stringify(chessBoard))
})

const turnAtom = atom({
    key: 'turn',
    default: 'black'
})

export {
    turnAtom,
    gamesAtom
}