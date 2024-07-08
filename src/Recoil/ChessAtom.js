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

const notationAtom = atom({
    key: 'notation',
    default : {prev: {}, prevPos: '', curPos: '', piece: '', color: ''}
})
const notesAtom = atom({
    key: 'notes',
    default : []
})

const isPromotionAtom = atom({
    key: 'isPromotion',
    default : false
})

export {
    turnAtom,
    gamesAtom,
    isEndAtom,
    notationAtom,
    notesAtom,
    isPromotionAtom
}