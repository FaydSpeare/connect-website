import React from "react";

export function Player({username, elo, turn, width}) {

    let style = {
        width: width,
        height: "38px",
        lineHeight: "10px",
        textAlign: "center",
        padding: "0px",
        margin: "10px",
        backgroundColor: "#38363a",
        display: "inline-block",
        borderRadius: "10px",
        color: "white",
        border: "1px solid #38363a"
    };

    if (turn) {
        style.border = "1px solid #a670ba"
    }

    return (
        <div
            style={style}
        >
            <p>{username === undefined ? "Waiting For Players" : `User: [${username}] ELO: [${elo}]`}</p>
        </div>
    );
}

