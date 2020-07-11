import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {clearErrorMessage, clearUserDetails, loginUser, sendResetPasswordEmail} from "../actions/loginActions";
import {isLoggedIn} from "../other/session";
import "./login.css"

function ResetPassword(props) {

    const [username, setUsername] = useState(null);

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
                    props.dispatch(sendResetPasswordEmail(username))
                }}>
                    <label className="loginLabel"><b>Password Reset</b></label><br/>
                    <input className="loginInput" type="username"
                           placeholder="Username" onChange={e => {
                        setUsername(e.target.value);
                    }}/><br/>
                    <input value={"Send Reset Email"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(ResetPassword);