import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {clearErrorMessage, clearUserDetails} from "../actions/loginActions";
import {getUserId, isLoggedIn} from "../other/session";
import "./login.css"
import {updatePassword} from "../actions/profileActions";

function LoggedInUpdatePassword(props) {

    const [password, setPassword] = useState("");

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
                    props.dispatch(updatePassword(getUserId(), password));
                    setPassword("");
                }}>
                    <label className="loginLabel"><b>Update Password</b></label><br/>
                    <input className="loginInput" type="password" value={password}
                           placeholder="New Password" onChange={e => {
                        setPassword(e.target.value);
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

export default connect(mapStateToProps)(LoggedInUpdatePassword);