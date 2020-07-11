import * as React from "react";
import {subscribeToEventSource} from "../actions/eventActions";
import NavBar from "./nav/NavBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Profile from "../pages/Profile";
import {connect} from "react-redux";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import HumanGame from "../pages/HumanGame";
import AIGame from "../pages/AIGame";
import ResetPassword from "../pages/ResetPassword";
import UpdatePassword from "../pages/UpdatePassword";
import VerifyEmail from "../pages/VerifyEmail";
import SearchUsers from "../pages/SearchUsers";
import SearchedProfile from "../pages/SearchedProfile";
import UpdateEmail from "../pages/UpdateEmail";
import LoggedInUpdatePassword from "../pages/LoggedInUpdatePassword";
import IdleTimer from 'react-idle-timer'
import {logout} from "../actions/loginActions";
import {maxIdleTime} from "../other/constants";
import {getUserId, isLoggedIn} from "../other/session";
import eventSource from "../reducers/eventReducer";
import Routes from "./Routes";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.idleTimer = null;
        this.onAction = this._onAction.bind(this);
        this.onActive = this._onActive.bind(this);
        this.onIdle = this._onIdle.bind(this);
    }

    _onAction(e) {
        console.log("User did something.");
    }

    _onActive(e) {
        console.log("User is active.");
        //console.log("Time remaining", this.idleTimer);
    }

    _onIdle(e) {
        console.log("User is idle.");
        this.props.dispatch(logout());
        //console.log("Last active", this.idleTimer.getLastActiveTime())
    }

    componentDidMount() {
        /*
        if (isLoggedIn() && this.props.eventSource.subscriberId === undefined) {
            this.props.dispatch(subscribeToEventSource(getUserId()));
        }

         */
    }

    componentDidUpdate() {
    }


    render() {
        let subscribed = this.props.eventSource.subscriberId !== undefined;

        return (
            <div>
                <IdleTimer
                    ref = {ref => {this.idleTimer = ref}}
                    element={document}
                    onActive={this.onActive}
                    onAction={this.onAction}
                    onIdle={this.onIdle}
                    debounce={250}
                    timeout={1000 * 60 * maxIdleTime}
                />
                <Router>
                    <NavBar />
                    <Routes invite={this.props.eventSource.pendingInvite}/>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(App)