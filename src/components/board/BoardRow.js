import {connect} from "react-redux";
import BoardTile from "./BoardTile";
import React from "react";

function BoardRow(props) {
    return (
        <div
            style={{
                minWidth: "100%",
                height: "16.6%",
                //border: "1px solid white",
                //margin: "3px"
            }}
        >
            <BoardTile row={props.row} col={0} editable={props.editable}/>
            <BoardTile row={props.row} col={1} editable={props.editable}/>
            <BoardTile row={props.row} col={2} editable={props.editable}/>
            <BoardTile row={props.row} col={3} editable={props.editable}/>
            <BoardTile row={props.row} col={4} editable={props.editable}/>
            <BoardTile row={props.row} col={5} editable={props.editable}/>
            <BoardTile row={props.row} col={6} editable={props.editable}/>
        </div>

    );

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(BoardRow);