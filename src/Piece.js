import React from "react";
import classNames from "classnames";

function ChessPiece ({color="white", piece='none', caughtPiece=false, possibleMove=false}) {

    return(
        <div className={classNames(`piece-box`, {pick : caughtPiece}, {road : possibleMove})}>
            <img className={`${color} ${piece}`} src={`./chess/piece/chess-piece-white.png`} alt=""/>
        </div>
    )

}
export default ChessPiece