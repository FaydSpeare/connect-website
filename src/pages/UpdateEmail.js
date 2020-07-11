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
import {getUserId, isLoggedIn} from "../other/session";
import "./login.css"
import {updateEmail} from "../actions/profileActions";

function UpdateEmail(props) {

    const [email, setEmail] = useState("");

    useEffect(() => {
        props.dispatch(clearErrorMessage())
    }, []);

    if (!isLoggedIn(props)) {
        return <Redirect to={"/login"}/>;
    }

    let errorMessage = props.userDetails.errorMessage;

    return (
        <div className={"loginPageContainer"} style={{
            marginTop: "120px"
        }}>
            <div className = "login-box">
                <form onSubmit={e => {
                    e.preventDefault();
                    props.dispatch(updateEmail(getUserId(), email));
                    setEmail("");
                }}>
                    <label className="loginLabel"><b>Update Email</b></label><br/>
                    <input className="loginInput" type="email" value={email}
                           placeholder="New Email" onChange={e => {
                        setEmail(e.target.value);
                    }}/><br/>
                    <input value={"Update"} className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(UpdateEmail);