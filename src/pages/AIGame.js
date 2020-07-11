import * as React from "react";
import Game from "../components/board/Game";
import {connect} from "react-redux";
import {clearGame, createCompGame} from "../actions/gameActions";
import {isLoggedIn} from "../other/session";
import {Redirect} from "react-router-dom";

class AIGame extends React.Component {

    componentDidMount() {
        let userId = this.props.userDetails.userId;
        let subscriberId = this.props.eventSource.subscriberId;
        this.props.dispatch(createCompGame(userId, subscriberId))
    }

    componentWillUnmount() {
        this.props.dispatch(clearGame())
    }

    render() {
        if (!isLoggedIn(this.props)) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <Game />
        )
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(AIGame)