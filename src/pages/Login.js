import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {clearUserDetails, loginUser} from "../actions/loginActions";
import {isLoggedIn} from "../other/session";
import "./login.css"

function Login(props) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        props.dispatch(clearUserDetails())
    }, []);

    if (isLoggedIn(props)) {
        return <Redirect to={"/profile"}/>;
    }

    let errorMessage = props.userDetails.errorMessage;

    return (
        <div className={"loginPageContainer"} style={{
            marginTop: "120px"
        }}>
            <div className = "login-box">
                <form onSubmit={e => {
                    e.preventDefault();
                    props.dispatch(loginUser(username, password, rememberMe))
                }}>
                    <label className="loginLabel"><b>Login</b></label><br/>
                    <input className="loginInput" type="username"
                           placeholder="Username" onChange={e => {
                        setUsername(e.target.value);
                    }}/><br/>
                    <input className="loginInput" type="password"
                           placeholder="Password" onChange={e => {
                        setPassword(e.target.value);
                    }}/><br/>
                    <div className={"checkBoxContainer"}>
                        <input type={"checkbox"} onClick={e => {
                            setRememberMe(e.target.checked);
                        }}/>
                        <label>Remember me</label><br/>
                    </div>

                    <input className={props.userDetails.isFetching ? "loginButtonPushed" : "loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(Login);