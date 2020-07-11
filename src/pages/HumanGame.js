import * as React from "react";
import Game from "../components/board/Game";
import {connect} from "react-redux";
import {clearGame, createHumanGame, joinGame, spectateGame} from "../actions/gameActions";
import {isLoggedIn} from "../other/session";
import {Redirect} from "react-router-dom";

class HumanGame extends React.Component {

    constructor(props) {
        super(props);
        let path = this.props.location.pathname;
        this.spectatingGame = path.includes("spectate");
        this.joiningGame = path.includes("join");
        this.gameId = this.props.match.params.gameId;
    }

    componentDidMount() {

        let userId = this.props.userDetails.userId;
        let subscriberId = this.props.eventSource.subscriberId;

        if (this.joiningGame) {
            this.props.dispatch(joinGame(userId, this.gameId, subscriberId))
        } else if (this.spectatingGame) {
            this.props.dispatch(spectateGame(subscriberId, this.gameId));
        } else {
            this.props.dispatch(createHumanGame(userId, subscriberId))
        }

    }

    componentDidUpdate() {
        console.log("UPDATING");

        let path = this.props.location.pathname;
        let spectatingGame = path.includes("spectate");
        let joiningGame = path.includes("join");
        let gameId = this.props.match.params.gameId;

        if (spectatingGame !== this.spectatingGame || this.joiningGame !== joiningGame || gameId !== this.gameId) {
            this.spectatingGame = path.includes("spectate");
            this.joiningGame = path.includes("join");
            this.gameId = this.props.match.params.gameId;
            let userId = this.props.userDetails.userId;
            let subscriberId = this.props.eventSource.subscriberId;
            if (this.joiningGame) {
                this.props.dispatch(joinGame(userId, this.gameId, subscriberId))
            } else if (this.spectatingGame) {
                this.props.dispatch(spectateGame(subscriberId, this.gameId));
            } else {
                this.props.dispatch(createHumanGame(userId, subscriberId))
            }
        }

        console.log(spectatingGame, joiningGame, gameId);
        console.log(this.spectatingGame, this.joiningGame, this.gameId);
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

export default connect(mapStateToProps)(HumanGame)