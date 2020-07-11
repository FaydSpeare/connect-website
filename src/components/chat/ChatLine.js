import React from "react";

export function ChatLine({username, chatLine}) {
    let color = username === "SYSTEM" ? "#0066ff" : "#a670ba";
    return (
        <div style={{marginLeft: "10px", marginRight: "10px", fontSize: "15px"}}>
            <p><b style={{color}}>{username}:</b> {chatLine}</p>
        </div>
    )
}