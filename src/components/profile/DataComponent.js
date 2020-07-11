import * as React from "react";
import "../component.css"
import "./home.css"
import {useState} from "react";

function DataComponent(props) {

    return (
        <div className={"emailBox"}>
            <div style={{
                fontSize: "20px",
                textAlign: "center"
            }}>
                Data
            </div>
            <div>
                <input className={"infoInput"} defaultValue={"Games Played: " + props.gamesPlayed} readOnly={true}/>
            </div>
            <div>
                <input className={"infoInput"} defaultValue={"ELO Rating: " + props.elo} readOnly={true}/>
            </div>
        </div>
    );
}

export default DataComponent;