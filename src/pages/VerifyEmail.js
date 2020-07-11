import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {clearErrorMessage, clearUserDetails} from "../actions/loginActions";
import {isLoggedIn} from "../other/session";
import "./login.css"
import {verifyEmail} from "../actions/profileActions";

function VerifyEmail(props) {

    let code = props.match.params.code;

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
                    props.dispatch(verifyEmail(code));
                }}>
                    <label className="loginLabel"><b>Verify Email</b></label><br/>
                    <input value={"Click to verify"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(VerifyEmail);