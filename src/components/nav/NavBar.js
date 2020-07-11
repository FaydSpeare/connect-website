import * as React from "react";
import PageLink from "./PageLink";
import {connect} from "react-redux";
import {logout} from "../../actions/loginActions";
import {isLoggedIn} from "../../other/session";
import '../component.css'
import {useHistory} from "react-router-dom";

function NavBar(props) {
    let loggedIn = isLoggedIn(props);

    let history = useHistory();

    return (
        <div
            style={{
                backgroundColor: "#38363a",
                width: "100%",
                height: "60px",
                display: "inline-block",
                position: "fixed",
                fontFamily: "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif",
                top: "0"
            }}
        >
            {!loggedIn && <PageLink to="/login" text={"Login"}/>}
            {!loggedIn && <PageLink to="/signup" text={"Signup"}/>}
            {!loggedIn && <PageLink to="/reset-password" text={"Reset Password"}/>}
            {loggedIn && <PageLink to="/profile" text={"Home"}/>}
            {loggedIn && <PageLink to="/game" text={"New Human Game"}/>}
            {loggedIn && <PageLink to="/ai" text={"New AI Game"}/>}
            {loggedIn && <PageLink to="/search-users" text={"Search Users"}/>}
            {loggedIn &&
            <button
                onClick={() => {
                    let game = prompt("Enter game number:");
                    history.push("/join/" + game)
                }}
                style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                    fontSize: "19px",
                    color: "white",
                    display: "inline-block",
                    marginLeft: "20px"
                }}
            >
                <b className={"purpleHover "}>Join Game</b>
            </button>}
            {loggedIn &&
            <button
                onClick={() => {
                    let game = prompt("Enter game number:");
                    history.push("/spectate/" + game)
                }}
                style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                    fontSize: "19px",
                    color: "white",
                    display: "inline-block",
                    marginLeft: "20px"
                }}
            >
                <b className={"purpleHover "}>Spectate Game</b>
            </button>}
            {loggedIn &&
            <button
                onClick={() => {
                    props.dispatch(logout());
                    console.log("logging out");
                }}
                className={"logoutButton purpleHover"}
            >Log Out</button>}
            {loggedIn &&
            <label style={{float: "right", marginRight: "50px", marginTop: "20px"}}>Users Online: {props.eventSource.onlineCount}</label>
            }

        </div>
    );
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(NavBar);

//{loggedIn && <PageLink to="/profile" text={"Join Game"}/>}
//{loggedIn && <PageLink to="/profile" text={"Spectate Game"}/>}