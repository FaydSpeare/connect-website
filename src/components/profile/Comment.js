import * as React from "react";
import "./home.css"

function Comment(props) {
    return (
        <div className={"commentContainer"}>
            <p><b>{props.username}</b>: {props.comment}</p>
        </div>
    );
}

export default Comment;