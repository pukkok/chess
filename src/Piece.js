import React from "react";
import classNames from "classnames";

function ChessPiece ({color="white", piece='none', caughtPiece=false, possibleMove=false, checkMate}) {

    return(
        <div className={classNames(`piece-box`, {pick : caughtPiece}, {road : possibleMove}, {'check-mate': checkMate})}>
            <img draggable={false} className={`${color} ${piece}`} src={`./chess/piece/chess-piece-white.png`} alt=""/>
        </div>
    )

}
export default ChessPiece