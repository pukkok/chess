const Rules = ({coords, piece, color, on}, games, notation) => {
    const vertical = +coords.split('-')[0]
    const horizon = +coords.split('-')[1]
    let possibleCases = []
    const {prevPos, curPos, piece : curPiece, color: curColor} = notation

    if(on){
        // 폰 조건
        if(piece ==='Pawn' && color === 'white'){    
            
            const moveCase = vertical>=1 && games[vertical-1][horizon] // 정면일때
            const firstMoveCase = vertical===6 && games[vertical-2][horizon] // 정면일때
            const leftCase = vertical>=1 && games[vertical-1][horizon-1] // 왼쪽
            const rightCase = vertical>=1 && games[vertical-1][horizon+1] // 오른쪽

            if(moveCase && moveCase.color === 'none') {
                possibleCases.push((vertical-1) + '-' + horizon);
            }
            if(leftCase && leftCase.color === 'black') {
                possibleCases.push((vertical-1) + '-' + (horizon-1));
            }
            if(rightCase && rightCase.color === 'black') {
                possibleCases.push((vertical-1) + '-' + (horizon+1));
            }
            if(vertical === 6 && moveCase.color === 'none' && firstMoveCase.color === 'none') {
                possibleCases.push((vertical-2) + '-' + horizon);
            }
            // 백 앙파상
            if(+prevPos.split('-')[0] === 1 && +curPos.split('-')[0] === 3 && vertical === 3 && curPiece === 'Pawn' && curColor === 'black') {
                possibleCases.push((vertical-1) + '-' + curPos.split('-')[1]);
            }

            return possibleCases;
        }

        if(piece ==='Pawn' && color === 'black'){    
            
            const moveCase = vertical<=6 && games[vertical+1][horizon] // 정면일때
            const firstMoveCase = vertical===1 && games[vertical+2][horizon] // 정면일때
            const leftCase = vertical<=6 && games[vertical+1][horizon-1] // 왼쪽
            const rightCase = vertical<=6 && games[vertical+1][horizon+1] // 오른쪽
            
            if(moveCase && moveCase.color === 'none') {
                possibleCases.push((vertical+1) + '-' + horizon);
            }
            if(leftCase && leftCase.color === 'white') {
                possibleCases.push((vertical+1) + '-' + (horizon-1));
            }
            if(rightCase && rightCase.color === 'white') {
                possibleCases.push((vertical+1) + '-' + (horizon+1));
            }
            if(vertical === 1 && moveCase.color === 'none' && firstMoveCase.color === 'none') {
                possibleCases.push((vertical+2) + '-' + horizon);
            }
            // 흑 앙파상
            if(+prevPos.split('-')[0] === 6 && +curPos.split('-')[0] === 4 && vertical === 4 && curPiece === 'Pawn' && curColor === 'white') {
                possibleCases.push((vertical+1) + '-' + curPos.split('-')[1]);
            }

            return possibleCases;
        }

        // 룩 조건
        if(piece === 'Rook' || piece === 'Queen'){
            for(let i = vertical+1; i < 8; i++) {
                if(games[i][horizon].color === 'none') {
                    possibleCases.push(i + '-' + horizon);
                } else if(games[i][horizon].color === color) {
                    break;
                } else {
                    possibleCases.push(i + '-' + horizon);
                    break;
                }
            }
            for(let j = vertical-1; j >= 0; j--) {
                if(games[j][horizon].color === 'none') {
                    possibleCases.push(j + '-' + horizon);
                } else if(games[j][horizon].color === color) {
                    break;
                } else {
                    possibleCases.push(j + '-' + horizon);
                    break;
                }
            }

            for(let i = horizon+1; i < 8; i++) {
                if(games[vertical][i].color === 'none') {
                    possibleCases.push(vertical + '-' + i);
                } else if(games[vertical][i].color === color) {
                    break;
                } else {
                    possibleCases.push(vertical + '-' + i);
                    break;
                }
            }
            for(let j = horizon-1; j >= 0; j--) {
                if(games[vertical][j].color === 'none') {
                    possibleCases.push(vertical + '-' + j);
                } else if(games[vertical][j].color === color) {
                    break;
                } else {
                    possibleCases.push(vertical + '-' + j);
                    break;
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
            for(let i = 1; i < 8; i++) { // top-left
                const breaker = vertical-i >= 0 && horizon-i >= 0 && games[vertical-i][horizon-i];
                if(breaker) {
                    const point = (vertical-i) + '-' + (horizon-i);
                    if(breaker.color === 'none') {
                        possibleCases.push(point);
                    } else if(breaker.color === color) {
                        break;
                    } else {
                        possibleCases.push(point);
                        break;
                    }
                }
            }

            for(let i = 1; i < 7; i++) { // top-right
                const breaker = vertical-i >= 0 && horizon+i <= 7 && games[vertical-i][horizon+i];
                if(breaker) {
                    const point = (vertical-i) + '-' + (horizon+i);
                    if(breaker.color === 'none') {
                        possibleCases.push(point);
                    } else if(breaker.color === color) {
                        break;
                    } else {
                        possibleCases.push(point);
                        break;
                    }
                }
            }

            for(let i = 1; i < 8; i++) { // bottom-left
                const breaker = vertical+i <= 7 && horizon-i >= 0 && games[vertical+i][horizon-i];
                if(breaker) {
                    const point = (vertical+i) + '-' + (horizon-i);
                    if(breaker.color === 'none') {
                        possibleCases.push(point);
                    } else if(breaker.color === color) {
                        break;
                    } else {
                        possibleCases.push(point);
                        break;
                    }
                }
            }
            for(let i = 1; i < 8; i++) { // bottom-right
                const breaker = vertical+i <= 7 && horizon+i <= 7 && games[vertical+i][horizon+i];
                if(breaker) {
                    const point = (vertical+i) + '-' + (horizon+i);
                    if(breaker.color === 'none') {
                        possibleCases.push(point);
                    } else if(breaker.color === color) {
                        break;
                    } else {
                        possibleCases.push(point);
                        break;
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
            if(vertical === 7 && horizon === 4){
                if(games[vertical][5].color === 'none' && 
                    games[vertical][6].color === 'none'){
                        games.forEach(rows => {
                            rows.forEach(item => {
                                if(item.color === 'black'){

                                }
                            })
                        })
                        possibleCases = [...possibleCases, vertical + '-' + 6]
                }
            }

            return possibleCases
        }

    }else{
        return []
    }

}

export default Rules