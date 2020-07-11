import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {
    clearErrorMessage,
    clearUserDetails,
    loginUser,
    sendResetPasswordEmail,
    updatePassword
} from "../actions/loginActions";
import {isLoggedIn} from "../other/session";
import "./login.css"

function UpdatePassword(props) {

    let code = props.match.params.code;

    const [password, setPassword] = useState("");

    useEffect(() => {
        props.dispatch(clearErrorMessage())
    }, []);

    if (isLoggedIn(props)) {
        //return <Redirect to={"/profile"}/>;
    }

    let errorMessage = props.userDetails.errorMessage;

    return (
        <div className={"loginPageContainer"} style={{
            marginTop: "120px"
        }}>
            <div className = "login-box">
                <form onSubmit={e => {
                    e.preventDefault();
                    props.dispatch(updatePassword(password === "" ? "x" : password, code));
                    setPassword("");
                }}>
                    <label className="loginLabel"><b>Password Reset</b></label><br/>
                    <input className="loginInput" type="password" value={password}
                           placeholder="New Password" onChange={e => {
                        setPassword(e.target.value);
                    }}/><br/>
                    <input value={"Update Password"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(UpdatePassword);