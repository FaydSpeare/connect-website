import React, {Component} from "react";
import {connect} from "react-redux";
import Board from "./Board";
import {Player} from "./Player";
import LiveChat from "../chat/LiveChat";
import {addSystemChatLine} from "../../actions/gameActions";
import {backendURL} from "../../other/constants";

class Game extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let editableBoard = !this.spectatingGame;
        let players = this.props.currentGame.players;
        let playerOneTurn = this.props.currentGame.turn === 1;
        //console.log("editable: ", editableBoard, "players", players);

        let p1Username = players[1] == null ? "Waiting for Players" : players[1].username;
        return (
            <div style={{marginTop: "120px"}}>
                <div style={{textAlign: "center"}}>

                    <div style={{display: "inline-block", verticalAlign: "top"}}>
                        <div>
                            <Player width={600} username={players[1].username} elo={players[1].elo} turn={!playerOneTurn}/>
                        </div>
                        <div>
                            <Board width={600} editable={editableBoard}/>
                        </div>
                        <div>
                            <Player width={600} username={players[0].username} elo={players[0].elo} turn={playerOneTurn}/>
                        </div>
                    </div>

                    <div style={{display: "inline-block", verticalAlign: "top"}}>
                        <LiveChat />
                    </div>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Game)