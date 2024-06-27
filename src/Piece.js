import React from "react";

function ChessPiece ({color="white", piece='none', caughtPiece=false, possibleMove=false}) {

    return(
        <div className={`piece-box ${caughtPiece && 'pick'} ${possibleMove && 'road'}`}>
            <img className={`${color} ${piece}`} src="./chess-piece-white.png" alt=""/>
        </div>
    )

}
export default ChessPiece