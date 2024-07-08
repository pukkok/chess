const Rules = ({coords, piece, color, on}, games, logPos) => {
    const vertical = +coords.split('-')[0]
    const horizon = +coords.split('-')[1]
    let possibleCases = []
    const {prevPos, curPos, piece : logPiece, color: logColor} = logPos
    if(on){
        // 폰 조건
        if(piece ==='Pawn' && color === 'white'){    
            
            const caseA = vertical>=1 && games[vertical-1][horizon] // 정면일때
            const caseA_2 = vertical===6 && games[vertical-2][horizon] // 정면일때
            const caseB = vertical>=1 && games[vertical-1][horizon-1] // 왼쪽
            const caseC = vertical>=1 && games[vertical-1][horizon+1] // 오른쪽
            if(caseA && caseA.color === 'none'){
                const point = (vertical-1) + '-' + horizon
                possibleCases = [...possibleCases, point]
            }
            if(caseB && caseB.color === 'black'){
                const point = (vertical-1) + '-' + (horizon-1)
                possibleCases = [...possibleCases, point]
            }
            if(caseC && caseC.color === 'black'){
                const point = (vertical-1) + '-' + (horizon+1)
                possibleCases = [...possibleCases, point]
            }

            if(vertical === 6){ 
                if(caseA.color === 'none' && caseA_2.color === 'none'){
                    const point = (vertical-2) + '-' + horizon
                    possibleCases = [...possibleCases, point]
                }
            }

            if(+prevPos.split('-')[0] === 1 && +curPos.split('-')[0] === 3 && vertical === 3 && logPiece === 'Pawn' && logColor === 'black'){
                // 백 앙파상
                const point = (vertical-1) + '-' + curPos.split('-')[1]
                possibleCases = [...possibleCases, point]
            }

            return possibleCases
        }

        if(piece ==='Pawn' && color === 'black'){    
            
            const caseA = vertical<=6 && games[vertical+1][horizon] // 정면일때
            const caseA_2 = vertical===1 && games[vertical+2][horizon] // 정면일때
            const caseB = vertical<=6 && games[vertical+1][horizon-1] // 왼쪽
            const caseC = vertical<=6 && games[vertical+1][horizon+1] // 오른쪽
            if(caseA.color === 'none'){
                const point = (vertical+1) + '-' + horizon
                possibleCases = [...possibleCases, point]
            }
            if(caseB && caseB.color === 'white'){
                const point = (vertical+1) + '-' + (horizon-1)
                possibleCases = [...possibleCases, point]
            }
            if(caseC && caseC.color === 'white'){
                const point = (vertical+1) + '-' + (horizon+1)
                possibleCases = [...possibleCases, point]
            }
            if(vertical === 1){
                if(caseA.color === 'none' && caseA_2.color === 'none'){
                    const point = vertical+2 + '-' + horizon
                    possibleCases = [...possibleCases, point]
                }
            }

            if(+prevPos.split('-')[0] === 6 && +curPos.split('-')[0] === 4 && vertical === 4 && logPiece === 'Pawn' && logColor === 'white'){
                // 흑 앙파상
                const point = (vertical+1) + '-' + curPos.split('-')[1]
                possibleCases = [...possibleCases, point]
            }

            return possibleCases
        }

        // 룩 조건
        if(piece === 'Rook' || piece === 'Queen'){
            for(let i=vertical+1; i<8; i++){
                if(games[i][horizon].color === 'none'){
                    possibleCases = [...possibleCases, (i) + '-' + horizon]
                }else if(games[i][horizon].color === color){
                    break
                }else{
                    possibleCases = [...possibleCases, (i) + '-' + horizon]
                    break
                }
            }
            for(let j=vertical-1; j>=0; j--){
                if(games[j][horizon].color === 'none'){
                    possibleCases = [...possibleCases, (j) + '-' + horizon]
                }else if(games[j][horizon].color === color){
                    break
                }else{
                    possibleCases = [...possibleCases, (j) + '-' + horizon]
                    break
                }
            }

            for(let i=horizon+1; i<8; i++){
                if(games[vertical][i].color === 'none'){
                    possibleCases = [...possibleCases, vertical + '-' + (i)]
                }else if(games[vertical][i].color === color){
                    break
                }else{
                    possibleCases = [...possibleCases, vertical + '-' + (i)]
                    break
                }
            }
            for(let j=horizon-1; j>=0; j--){
                if(games[vertical][j].color === 'none'){
                    possibleCases = [...possibleCases, vertical + '-' + (j)]
                }else if(games[vertical][j].color === color){
                    break
                }else{
                    possibleCases = [...possibleCases, vertical + '-' + (j)]
                    break
                }
            }

            if(piece === 'Rook'){
                return possibleCases
            }
        }

        // 나이트 조건
        if(piece === 'Knight'){
            const points = [
                vertical>=2 && horizon>=1 && {v: vertical-2, h: horizon-1},
                vertical>=2 && horizon<=6 && {v: vertical-2, h: horizon+1},
                vertical>=1 && horizon>=2 && {v: vertical-1, h: horizon-2},
                vertical>=1 && horizon<=5 && {v: vertical-1, h: horizon+2},
                vertical<=6 && horizon>=2 && {v: vertical+1, h: horizon-2},
                vertical<=6 && horizon<=5 && {v: vertical+1, h: horizon+2},
                vertical<=5 && horizon>=1 && {v: vertical+2, h: horizon-1},
                vertical<=5 && horizon<=6 && {v: vertical+2, h: horizon+1}    
            ]
            points.forEach(point => {
                if(point && games[point.v][point.h].color !== color){
                    const possiblePoint = point.v + '-' + point.h
                    possibleCases = [...possibleCases, possiblePoint]
                }
            })
            return possibleCases
        }

        // 비숍 조건
        if(piece === 'Bishop' || piece === 'Queen'){
            for(let i=1; i<8; i++){ // 좌 위
                const breaker = vertical-i >=0 && horizon-i >=0 && games[vertical-i][horizon-i]
                if(breaker){
                    const point = (vertical-i) + '-' + (horizon-i)
                    if(breaker.color === 'none'){
                        possibleCases = [...possibleCases, point]
                    }else if(breaker.color === color){
                        break
                    }else{
                        possibleCases = [...possibleCases, point]
                        break
                    }
                }
            }

            for(let i=1; i<7; i++){ // 우 위
                const breaker = vertical-i >=0 && horizon+i <=7 && games[vertical-i][horizon+i]
                if(breaker){
                    const point = (vertical-i) + '-' + (horizon+i)
                    if(breaker.color === 'none'){
                        possibleCases = [...possibleCases, point]
                    }else if(breaker.color === color){
                        break
                    }else{
                        possibleCases = [...possibleCases, point]
                        break
                    }
                }
            }

            for(let i=1; i<8; i++){ // 좌 아래
                const breaker = vertical+i <=7 && horizon-i >=0 && games[vertical+i][horizon-i]
                if(breaker){
                    const point = (vertical+i) + '-' + (horizon-i)
                    if(breaker.color === 'none'){
                        possibleCases = [...possibleCases, point]
                    }else if(breaker.color === color){
                        break
                    }else{
                        possibleCases = [...possibleCases, point]
                        break
                    }
                }
            }
            for(let i=1; i<8; i++){ // 우 아래
                const breaker = vertical+i <=7 && horizon+i <=7 && games[vertical+i][horizon+i]
                if(breaker){
                    const point = (vertical+i) + '-' + (horizon+i)
                    if(breaker.color === 'none'){
                        possibleCases = [...possibleCases, point]
                    }else if(breaker.color === color){
                        break
                    }else{
                        possibleCases = [...possibleCases, point]
                        break
                    }
                }
            }
            
            if(piece === 'Bishop'){
                return possibleCases
            }
        }
        
        // 퀸 조건
        if(piece === 'Queen'){
            return possibleCases
        }

        // 킹 조건 
        if(piece === 'King'){
            const points = [
                vertical>=1 && horizon>=1 && {v: vertical-1, h: horizon-1},
                vertical>=1 && {v: vertical-1, h: horizon},
                vertical>=1 && horizon<=6 && {v: vertical-1, h: horizon+1},
                horizon>=1 && {v: vertical, h: horizon-1},
                horizon<=6 && {v: vertical, h: horizon+1},
                vertical<=6 && horizon>=1 && {v: vertical+1, h: horizon-1},
                vertical<=6 && {v: vertical+1, h: horizon},
                vertical<=6 && horizon<=6 && {v: vertical+1, h: horizon+1},
            ]
            points.forEach(point => {
                if(point && games[point.v][point.h].color !== color){
                    const possiblePoint = point.v + '-' + point.h
                    possibleCases = [...possibleCases, possiblePoint]
                }
            })

            // 캐슬링

            return possibleCases
        }

    }else{
        // 프로모션
        if(piece ==='Pawn' && color === 'white'){
            if(vertical === 0){
                // console.log('화이트 폰 프로모션')
                possibleCases = ['white promotion']
            }
        }
        if(piece ==='Pawn' && color === 'black'){
            if(vertical === 7){
                // console.log('블랙 폰 프로모션')
                possibleCases = ['black promotion']
            }
        }
        return []
    }

}

export default Rules