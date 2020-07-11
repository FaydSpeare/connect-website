import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {isLoggedIn} from "../other/session";
import {signUpUser} from "../actions/signupActions";
import "./login.css"
import {clearUserDetails} from "../actions/loginActions";

function SignUp(props) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    let errorMessage = props.userDetails.errorMessage;

    useEffect(() => {
        props.dispatch(clearUserDetails())
    }, []);

    if (isLoggedIn(props)) {
        return <Redirect to={"/profile"}/>;
    }
    return (
        <div className={"loginPageContainer"} style={{
            marginTop: "120px"
        }}>
            <div className = "login-box">
                <form onSubmit={e => {
                    e.preventDefault();
                    props.dispatch(signUpUser(username, password, email));
                }}>
                    <label className="loginLabel"><b>Signup</b></label><br/>
                    <input className="loginInput" type="username"
                           placeholder="Username" onChange={e => {
                        setUsername(e.target.value);
                    }}/><br/>
                    <input className="loginInput" type="password"
                           placeholder="Password" onChange={e => {
                        setPassword(e.target.value);
                    }}/><br/>
                    <input className="loginInput" type="email"
                           placeholder="Email" onChange={e => {
                        setEmail(e.target.value);
                    }}/><br/>
                    <input className={"loginButton"} type="submit"/>
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

export default connect(mapStateToProps)(SignUp);