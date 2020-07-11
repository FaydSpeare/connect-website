import {connect} from "react-redux";
import React from "react";
import {sendBoardUpdate} from "../../actions/gameActions";

function BoardTile(props) {

    let row = props.row;
    let col = props.col;
    let backgroundColor = "white";

    if (props.currentGame.board !== undefined) {
        let tile = props.currentGame.board[row][col];
        backgroundColor = tile === 0 ? "white" : (tile === 1 ? "#a670ba" : "#0066ff");
    }

    let winningTile = isWinningTile(props.currentGame.winCombination, row, col);

    return (
        <div
            style={{
                width: winningTile ? "calc(14.28% - 6px)" : "calc(14.28% - 4px)",
                height: winningTile ? "calc(100% - 6px)" : "calc(100% - 6px)",
                border: winningTile ? "2px solid white" : "1px solid black",
                display: "inline-block",
                backgroundColor: backgroundColor,
                verticalAlign: "top",
                margin: "1px",
                borderRadius: "8px"
            }}
            onClick={() => {
                if (props.editable) {
                    props.dispatch(sendBoardUpdate(props.currentGame.gameId, props.currentGame, props.row, props.col))
                }
            }}
        />
    )
}

function isWinningTile(winCombination, row, col) {
    if (winCombination == null) {
        return false;
    }
    for (let i = 0; i < winCombination.length; i++) {
        let item = winCombination[i];
        let iCol = item % 7;
        let iRow = (item - iCol) / 7;
        if (row === iRow && col === iCol) {
            return true;
        }
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(BoardTile);