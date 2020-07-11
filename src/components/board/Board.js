import {connect} from "react-redux";
import React from "react";
import BoardRow from "./BoardRow";

function Board(props) {

    let height = ((props.width / 7.0) * 6.0);

    return (
        <div
            style={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "#38363a",
                display: "inline-block",
                borderRadius: "10px"
            }}
        >
            <div
                style={{
                    width: "calc(" + props.width + "px - 20px)",
                    height: "calc(" + height + "px - 20px)",
                }}
            >
                <BoardRow row={5} editable={props.editable}/>
                <BoardRow row={4} editable={props.editable}/>
                <BoardRow row={3} editable={props.editable}/>
                <BoardRow row={2} editable={props.editable}/>
                <BoardRow row={1} editable={props.editable}/>
                <BoardRow row={0} editable={props.editable}/>
            </div>

        </div>
    );

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Board);