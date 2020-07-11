import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {
    clearSearch,
    clearUserDetails,
    doesUserExist,
    loginUser,
    sendResetPasswordEmail,
    updatePassword
} from "../actions/loginActions";
import {isLoggedIn} from "../other/session";
import "./login.css"

function SearchUsers(props) {

    const [password, setPassword] = useState("");

    if (!isLoggedIn(props)) {
        return <Redirect to={"/login"}/>;
    }

    let errorMessage = props.userDetails.errorMessage;
    let searchedUserId = props.userSearch.userId;
    let isValidSearch = searchedUserId !== undefined && searchedUserId != null;

    function clear() {
        props.dispatch(clearSearch())
    }

    return (
        <div className={"loginPageContainer"} style={{
            marginTop: "120px"
        }}>
            <div className = "login-box">
                <form onSubmit={e => {
                    e.preventDefault();
                    props.dispatch(clearSearch());
                    if (!isValidSearch) {
                        props.dispatch(doesUserExist(password === "" ? null : password));
                    } else {
                        props.history.push("/profile/" + searchedUserId);
                    }
                    setPassword("");
                }}>
                    <label className="loginLabel"><b>User Search</b></label><br/>
                    {!isValidSearch &&
                        <input className="loginInput" type="username" value={password}
                               placeholder="Enter Username" onChange={e => {
                            setPassword(e.target.value);
                        }}/>
                    }
                    <br/>
                    <input value={!isValidSearch ? "Search" : "Go to Profile"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
                    <br/>
                    {isValidSearch &&
                    <input defaultValue={"Go Back"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} onClick={clear} type={"button"}/>
                    }

                </form>
            </div>
            <br/>
            {errorMessage !== undefined ? <div className={"loginErrorBox"}>
                <label className={"loginErrorLabel"}>{errorMessage}</label>
            </div> : null }
        </div>
    );

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(SearchUsers);