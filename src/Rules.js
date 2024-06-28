const Rules = ({coords, piece, color, on}, games) => {
    const vertical = +coords.split('-')[0]
    const horizon = +coords.split('-')[1]
    let possibleCases = []
    
    // Pawn 조건
    if(on){
        if(piece ==='Pawn' && color === 'white'){    
            
            const caseA = vertical>=1 && games[vertical-1][horizon] // 정면일때
            const caseA_2 = vertical===6 && games[vertical-2][horizon] // 정면일때
            const caseB = vertical>=1 && games[vertical-1][horizon-1] // 왼쪽
            const caseC = vertical>=1 && games[vertical-1][horizon+1] // 오른쪽
            if(caseA && caseA.color === 'none'){
                const moveA = (vertical-1) + '-' + horizon
                possibleCases = [...possibleCases, moveA]   
            }
            if(caseB && caseB.color === 'black'){
                const moveA = (vertical-1) + '-' + (horizon-1)
                possibleCases = [...possibleCases, moveA]
            }
            if(caseC && caseC.color === 'black'){
                const moveA = (vertical-1) + '-' + (horizon+1)
                possibleCases = [...possibleCases, moveA]
            }

            if(vertical === 6){ 
                if(caseA.color === 'none' && caseA_2.color === 'none'){
                    const moveA = vertical-2 + '-' + horizon
                    possibleCases = [...possibleCases, moveA]
                }
            }
            return possibleCases
        }

        if(piece ==='Pawn' && color === 'black'){    
            
            const caseA = vertical<=6 && games[vertical+1][horizon] // 정면일때
            const caseA_2 = vertical===1 && games[vertical+2][horizon] // 정면일때
            const caseB = vertical<=6 && games[vertical+1][horizon-1] // 왼쪽
            const caseC = vertical<=6 && games[vertical+1][horizon+1] // 오른쪽
            if(caseA.color === 'none'){
                const moveA = (vertical+1) + '-' + horizon
                possibleCases = [...possibleCases, moveA]
            }
            if(caseB && caseB.color === 'white'){
                const moveA = (vertical+1) + '-' + (horizon-1)
                possibleCases = [...possibleCases, moveA]
            }
            if(caseC && caseC.color === 'white'){
                const moveA = (vertical+1) + '-' + (horizon+1)
                possibleCases = [...possibleCases, moveA]
            }
            if(vertical === 1){
                if(caseA.color === 'none' && caseA_2.color === 'none'){
                    const moveA = vertical+2 + '-' + horizon
                    possibleCases = [...possibleCases, moveA]
                }
            }

            return possibleCases
        }

    }else{
        if(piece ==='Pawn' && color === 'white'){
            if(vertical === 0){
                console.log('화이트 폰 변신 준비')
            }
        }
        if(piece ==='Pawn' && color === 'black'){
            if(vertical === 7){
                console.log('블랙 폰 변신 준비')
            }
        }
        return []
    }

    // Knight 조건
    if(on){
        if(piece === 'Knight'){
            const caseA = vertical>=2 && horizon>=1 && games[vertical-2][horizon-1]
            const caseB = vertical>=2 && horizon<=6 && games[vertical-2][horizon+1]
            const caseC = vertical>=1 && horizon>=2 && games[vertical-1][horizon-2]
            const caseD = vertical>=1 && horizon<=5 && games[vertical-1][horizon+2]
            const caseE = vertical<=6 && horizon>=2 && games[vertical+1][horizon-2]
            const caseF = vertical<=6 && horizon<=5 && games[vertical+1][horizon+2]
            const caseG = vertical<=5 && horizon>=1 && games[vertical+2][horizon-1]
            const caseH = vertical<=5 && horizon<=6 && games[vertical+2][horizon+1]
            console.log(caseA, caseB, caseC, caseD, caseE, caseF, caseG, caseH)
            if(caseA && caseA.color !== color){
                const moveA = (vertical-2) + '-' + (horizon-1)
                possibleCases = [...possibleCases, moveA]
            }
            if(caseB && caseB.color !== color){
                const moveB = (vertical-2) + '-' + (horizon+1)
                possibleCases = [...possibleCases, moveB]
            }
            if(caseC && caseC.color !== color){
                const moveC = (vertical-1) + '-' + (horizon-2)
                possibleCases = [...possibleCases, moveC]
            }
            if(caseD && caseD.color !== color){
                const moveD = (vertical-1) + '-' + (horizon+2)
                possibleCases = [...possibleCases, moveD]
            }
            if(caseE && caseE.color !== color){
                const moveE = (vertical+1) + '-' + (horizon-2)
                possibleCases = [...possibleCases, moveE]
            }
            if(caseF && caseF.color !== color){
                const moveF = (vertical+1) + '-' + (horizon+2)
                possibleCases = [...possibleCases, moveF]
            }
            if(caseG && caseG.color !== color){
                const moveG = (vertical+2) + '-' + (horizon-1)
                possibleCases = [...possibleCases, moveG]
            }
            if(caseH && caseH.color !== color){
                const moveH = (vertical+2) + '-' + (horizon+1)
                possibleCases = [...possibleCases, moveH]
            }
        }

        return possibleCases
    }

    if(on){
        if(piece === 'Rook'){
            
        }
    }

    let a = []
    // 임시용
    return a
}

export default Rules