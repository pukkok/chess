import React, {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamesAtom, notationAtom, notesAtom } from "../Recoil/ChessAtom";

function Notation () {
    const games = useRecoilValue(gamesAtom)
    const [notation, setNotation] = useRecoilState(notationAtom)
    const [notes, setNotes] = useRecoilState(notesAtom)

    useEffect(()=>{

        const cols = [8, 7, 6, 5, 4, 3, 2, 1]
        const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        if(notation.prevPos){
            const {prev, prevPos, curPos, piece, color} = notation
            let a = games[prevPos.split('-')[0]][prevPos.split('-')[1]]
            
            let text
            const swtichPieceNote = (piece) => {
                switch(piece) {
                    case 'King' : return 'K'
                    case 'Queen' : return 'Q'
                    case 'Rook' : return 'R'
                    case 'Bishop' : return 'B'
                    case 'Knight' : return 'N'
                    default : return ''
                }
            }
            text = text + swtichPieceNote(piece)
            console.log(text)
            if(prev.color !== 'none' && prev.color !== color){
                text = text + 'x'
            }

            const row = curPos.split('-')[0]
            const col = curPos.split('-')[1]
            const posNote = rows[row] + cols[col]

            text = text + posNote
            
            
            setNotes(prev => [...prev, text])
        }
        
    },[notation, setNotes])

    return (
        <div className='notation-box'>
            <h4>체스 기보</h4>
            {notes.length>0 &&
            <p>
            {notes.map((note, idx) => {
                return <React.Fragment key={idx}>
                    {idx % 2 === 0 &&<span className="move">{Math.floor(idx / 2)+1}</span>}
                    <span>{note}</span>
                    </React.Fragment>
            })}
            </p>}
        </div>
    )
}

export default Notation

// 킹 : K
// 퀸 : Q
// 룩 : R
// 비숍 : B
// 나이트 : N
// 폰 : 없음

// 특수기호
// 포획(x)
// 체크(+), 체크메이트(#)
// 킹사이드 캐슬링(0-0)
// 퀸사이드 캐슬링(0-0-0)
// 승진(프로모션) : d8 = Q (예시)