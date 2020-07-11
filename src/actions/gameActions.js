import {backendURL, frontEndURL} from "../other/constants";

export const REQUEST_CREATE_HUMAN_GAME = 'REQUEST_CREATE_HUMAN_GAME';
export const CREATE_HUMAN_GAME_SUCCESS = 'CREATE_HUMAN_GAME_SUCCESS';
export const CREATE_HUMAN_GAME_ERROR = 'CREATE_HUMAN_GAME_ERROR';

export const REQUEST_CREATE_COMP_GAME = 'REQUEST_CREATE_COMP_GAME';
export const CREATE_COMP_GAME_SUCCESS = 'CREATE_COMP_GAME_SUCCESS';
export const CREATE_COMP_GAME_ERROR = 'CREATE_COMP_GAME_ERROR';

export const REQUEST_JOIN_GAME = 'REQUEST_JOIN_GAME';
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS';
export const JOIN_GAME_ERROR = 'JOIN_GAME_ERROR';

export const REQUEST_SPECTATE_GAME = 'REQUEST_SPECTATE_GAME';
export const SPECTATE_GAME_SUCCESS = 'SPECTATE_GAME_SUCCESS';
export const SPECTATE_GAME_ERROR = 'SPECTATE_GAME_ERROR';

export function requestCreateHumanGame() {
    return {
        type: REQUEST_CREATE_HUMAN_GAME,
    }
}

export function createHumanGameSuccess(gameId, player, elo) {
    return {
        type: CREATE_HUMAN_GAME_SUCCESS,
        gameId,
        player,
        elo
    }
}

export function createHumanGameError(error) {
    return {
        type: CREATE_HUMAN_GAME_ERROR,
        error: error
    }
}

export function createHumanGame(userId, subscriberId) {
    return dispatch => {
        console.log("Creating New Human Game");
        dispatch(requestCreateHumanGame());
        fetch(backendURL + "/game/new-human-game/" + userId)
            .then(response => response.json())
            .then(response => {
                console.log("Create Human Game Response: ", response);
                if (response.success) {
                    let gameId = response.gameId;
                    let player = response.playerNumber;
                    let elo = response.elo;
                    dispatch(createHumanGameSuccess(gameId, player, elo));
                    dispatch(subscribeToGame(subscriberId, gameId));
                    //dispatch(addSystemChatLine("Join link: " + frontEndURL + "/join/" + gameId));
                    //dispatch(addSystemChatLine("Spectate link: " + frontEndURL + "/spectate/" + gameId));
                } else {
                    dispatch(createHumanGameError("Error creating human game"))
                }
            })
            .catch(error => {
                dispatch(createHumanGameError("Error creating human game"))
            })
    }
}

export function subscribeToGame(subscriberId, gameId) {
    return dispatch => {
        console.log("Subscribing to Game");
        fetch(backendURL + "/event/subscribe/" + subscriberId + "/to/" + gameId)
            .then(response => {
                console.log("Subscribe to Game Response: ", response);
            })
            .catch(error => {
                dispatch(createHumanGameError("Error subscribing to human game"))
            })

    }
}

export function requestCreateCompGame() {
    return {
        type: REQUEST_CREATE_COMP_GAME,
    }
}

export function createCompGameSuccess(gameId, player, elo) {
    return {
        type: CREATE_COMP_GAME_SUCCESS,
        gameId,
        player,
        elo
    }
}

export function createCompGameError(error) {
    return {
        type: CREATE_COMP_GAME_ERROR,
        error: error
    }
}

export function createCompGame(userId, subscriberId) {
    return dispatch => {
        console.log("Creating New Comp Game");
        dispatch(requestCreateCompGame());
        fetch(backendURL + "/game/new-ai-game/" + userId)
            .then(response => response.json())
            .then(response => {
                console.log("Create Comp Game Response: ", response);
                if (response.success) {
                    let gameId = response.gameId;
                    let player = response.playerNumber;
                    let elo = response.elo;
                    dispatch(createCompGameSuccess(gameId, player, elo));
                    dispatch(subscribeToGame(subscriberId, gameId));
                    //dispatch(addSystemChatLine("Spectate link: " + backendURL + "/spectate/" + gameId));
                } else {
                    dispatch(createCompGameError("Error creating comp game"))
                }
            })
            .catch(error => {
                dispatch(createCompGameError("Error creating comp game"))
            })
    }
}

export function requestJoinGame() {
    return {
        type: REQUEST_JOIN_GAME
    }
}

export function joinGameSuccess(gameId, player) {
    return {
        type: JOIN_GAME_SUCCESS,
        gameId,
        player
    }
}

export function joinGameError(error) {
    return {
        type: JOIN_GAME_ERROR,
        error: error
    }
}

export function joinGame(userId, gameId, subscriberId) {
    return async dispatch => {
        await dispatch(subscribeToGame(subscriberId, gameId));
        console.log("Joining Game");
        dispatch(requestJoinGame());
        fetch(backendURL + "/game/" + userId + "/join/" + gameId)
            .then(response => response.json())
            .then(response => {
                console.log("Join Game Response: ", response);
                if (response.success) {
                    let gameId = response.gameId;
                    let player = response.playerNumber;
                    dispatch(joinGameSuccess(gameId, player));
                    //dispatch(addSystemChatLine("Spectate link: " + backendURL + "/spectate/" + gameId));
                } else {
                    dispatch(joinGameError("Error joining game"))
                }
            })
            .catch(error => {
                dispatch(joinGameError("Error joining game"))
            })
    }
}

export function requestSpectateGame() {
    return {
        type: REQUEST_SPECTATE_GAME
    }
}

export function spectateGameSuccess(gameId, players, board) {
    return {
        type: SPECTATE_GAME_SUCCESS,
        gameId: gameId,
        players: players,
        board
    }
}

export function spectateGameError(error) {
    return {
        type: SPECTATE_GAME_ERROR,
        error: error
    }
}

export function spectateGame(subscriberId, gameId) {
    return dispatch => {
        fetch(backendURL + "/game/spectate/" + gameId)
            .then(response => response.json())
            .then(response => {
                console.log("Spectate Game Response: ", response);
                let players = response.players;
                dispatch(spectateGameSuccess(gameId, players, response.board));
                dispatch(subscribeToGame(subscriberId, gameId));
                dispatch(addSystemChatLine("Spectate link: " + backendURL + "/spectate/" + gameId));
            })
            .catch(error => {
                dispatch(spectateGameError("Error spectating game"))
            })

    }
}

export const PLACE_TILE = 'PLACE_TILE';
export const SEND_BOARD_UPDATE = 'SEND_BOARD_UPDATE';

export function placeTile(row, column) {
    return {
        type: PLACE_TILE,
        row,
        column
    }
}

function areBelowTilesFilled(state, row, col) {
    for (let irow = 0; irow < row; irow++) {
        if (state[irow][col] === 0) {
            return false;
        }
    }
    return true;
}

function isTileEmpty(state, row, col) {
    return state[row][col] === 0
}

function positionIsValid(state, row, col) {
    return isTileEmpty(state, row, col) && areBelowTilesFilled(state, row, col)
}

function isMyTurn(state) {
    return state.player === state.turn;
}

function isGameOver(state) {
    return state.outcome === undefined || state.outcome == null
}

export function sendBoardUpdate(gameId, state, row, col) {
    return dispatch => {
        let board = state.board;
        console.log(state)
        if (positionIsValid(board, row, col) && isMyTurn(state) && isGameOver(state)) {
            dispatch(placeTile(row, col));
            console.log("Sending Board Update");
            fetch(backendURL + '/game/update',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId,
                    board
                })
            }).then(response => {
                console.log(response);
            }).catch(e => {
                console.log(e);
            })
        }
    }
}

export function sendChatLine(userId, gameId, chatLine) {
    console.log("Sending Chat Line to Game");
    fetch(backendURL + "/chat/chatLine/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            gameId,
            chatLine
        })})
        .then(response => {
            console.log("Chat Line Response: ", response);
        })
        .catch(error => {
            console.log("Error sending chat line")
        })
}

export const CLEAR_GAME = "CLEAR_GAME";

export function clearGame() {
    return {
        type: CLEAR_GAME
    }
}

export const SYSTEM_CHAT_LINE = "SYSTEM_CHAT_LINE";

export function addSystemChatLine(chatLine) {
    return {
        type: SYSTEM_CHAT_LINE,
        chatLine: {
            username: "SYSTEM",
            chatLine
        }
    }
}


