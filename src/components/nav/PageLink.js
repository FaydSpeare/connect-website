import {NavLink} from "react-router-dom";
import * as React from "react";
import "../component.css"

function PageLink({to, text}) {
    return (
        <NavLink
            to={to}
            style={{
                textDecoration: "none",
                color: "white",
                //border: "1px solid white",
                margin: "20px",
                display: "inline-block",
                marginLeft: "20px",
                fontSize: "18px"
            }}
        >
            <b className = {"purpleHover"}>{text}</b>
        </NavLink>
    );
}

export default PageLink