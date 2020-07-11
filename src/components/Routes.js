import * as React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";
import UpdatePassword from "../pages/UpdatePassword";
import VerifyEmail from "../pages/VerifyEmail";
import SearchedProfile from "../pages/SearchedProfile";
import Profile from "../pages/Profile";
import SearchUsers from "../pages/SearchUsers";
import UpdateEmail from "../pages/UpdateEmail";
import LoggedInUpdatePassword from "../pages/LoggedInUpdatePassword";
import HumanGame from "../pages/HumanGame";
import AIGame from "../pages/AIGame";
import {isLoggedIn} from "../other/session";
import {connect} from "react-redux";
import {inviteResolved} from "../actions/eventActions";
import {clearGame} from "../actions/gameActions";


function Routes(props) {

    let subscribed = props.eventSource.subscriberId !== undefined;

    let history = useHistory();

    let invite = props.invite;
    if (invite != null) {
        let response = true;
        if (invite.includes("join")) {
            if (response) {
                props.dispatch(inviteResolved());
                props.dispatch(clearGame());
                history.push("/profile");
                history.push(invite);
            }
        } else if (invite.includes("spectate")) {
            if (response) {
                props.dispatch(inviteResolved());
                props.dispatch(clearGame());
                history.push("/profile");
                history.push(invite);
            }
        }
    }

    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/update-password/:code" component={UpdatePassword} />
            <Route path="/verify/:code" component={VerifyEmail} />
            <Route path="/profile/:userId" component={SearchedProfile} />
            <Route path="/profile" component={Profile} />
            <Route path="/search-users" component={SearchUsers} />
            <Route path="/update-email" component={UpdateEmail} />
            <Route path="/update-password" component={LoggedInUpdatePassword} />
            {subscribed && <Route path="/game" component={HumanGame} />}
            {subscribed && <Route path="/ai" component={AIGame} />}
            {subscribed && <Route path="/join/:gameId" component={HumanGame} />}
            {subscribed && <Route path="/spectate/:gameId" component={HumanGame} />}
            {isLoggedIn() && <Route component={() => <Redirect to={"/profile"}/>} />}
            <Route component={() => <Redirect to={"/login"}/>} />
        </Switch>
    );
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(Routes)