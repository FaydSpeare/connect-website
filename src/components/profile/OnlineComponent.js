import * as React from "react";
import "../component.css"
import "./home.css"

function OnlineComponent(props) {

    return (
        <div className={"emailBox"}>
            <div style={{
                fontSize: "20px",
                textAlign: "center"
            }}>
                Online Status
            </div>
            <div>
                <input className={"infoInput"} defaultValue={props.isOnline ? "Online Now" : "Offline"} style={{color: props.isOnline ? "green" : "gray"}} readOnly={true}/>
            </div>
        </div>
    );
}

export default OnlineComponent;