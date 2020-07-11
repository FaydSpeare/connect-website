import {backendURL} from "../other/constants";
import {userProfileError} from "./profileActions";

export const REQUEST_EVENT_SOURCE = "REQUEST_EVENT_SOURCE";
export const EVENT_SOURCE_ERROR = "EVENT_SOURCE_ERROR";
export const EVENT_SOURCE_SUCCESS = "EVENT_SOURCE_SUCCESS";

export function requestEventSource() {
    return {
        type: REQUEST_EVENT_SOURCE
    }
}

export function eventSourceError(error) {
    return {
        type: EVENT_SOURCE_ERROR,
        error: error
    }
}

export function eventSourceSuccess(subscriberId, eventSource) {
    return {
        type: EVENT_SOURCE_SUCCESS,
        subscriberId,
        eventSource
    }
}


export function subscribeToEventSource(userId) {

    return dispatch => {

        dispatch(requestEventSource());
        dispatch(_subscribeToEventSource(userId));

        /*

        console.log("Fetching Subscriber ID");
        fetch(backendURL + "/event/new-subscriber-id")
            .then(response => response.json())
            .then(json => {
                console.log("Received Subscriber ID: ", json);
                dispatch(_subscribeToEventSource(json.subscriberId));
            })
            .catch(() => {
                console.log("Error Fetching Subscriber ID");
                dispatch(eventSourceError("Error fetching subscriberId"))
            });

         */

    }
}

export const RECEIVE_CHAT_LINE = "RECEIVE_CHAT_LINE";
export const RECEIVE_BOARD_UPDATE = 'RECEIVE_BOARD_UPDATE';
export const RECEIVE_BOARD_INIT = 'RECEIVE_BOARD_INIT';

export function receiveBoardUpdate(board, outcome, turn, winCombination) {
    return {
        type: RECEIVE_BOARD_UPDATE,
        board,
        outcome,
        turn,
        winCombination
    }
}

export function receiveChatLine(username, chatLine) {
    return {
        type: RECEIVE_CHAT_LINE,
        chatLine: {
            username,
            chatLine
        }
    }
}

export function receiveBoardInit(players) {
    return {
        type: RECEIVE_BOARD_INIT,
        players
    }
}

export const UPDATE_ONLINE_COUNT = "UPDATE_ONLINE_COUNT";


export function updateOnlineCount(count) {
    return {
        type: UPDATE_ONLINE_COUNT,
        count
    }
}

export const PENDING_INVITE = "PENDING_INVITE";
export const INVITE_RESOLVED = "INVITE_RESOLVED";

export function inviteResolved() {
    return {
        type: INVITE_RESOLVED
    }
}

export function pendingInvite(url) {
    return {
        type: PENDING_INVITE,
        url
    }
}

function _subscribeToEventSource(subscriberId) {
    return async dispatch => {
        const eventSource = new EventSource(backendURL + "/event/subscribe/" + subscriberId);

        eventSource.onerror = event => {
            dispatch(eventSourceError("Error with EventSource"))
        };

        eventSource.addEventListener("OPEN", function(event) {
            dispatch(eventSourceSuccess(subscriberId, eventSource))
        });

        eventSource.addEventListener("CHAT", function (event) {
            console.log(event);
            let json = JSON.parse(event.data);
            let username = json.username;
            let chatLine = json.chatLine;
            dispatch(receiveChatLine(username, chatLine))
        });

        eventSource.addEventListener("UPDATE", function (event) {
            console.log(event);
            let json = JSON.parse(event.data);
            let board = json.board;
            let outcome = json.outcome;
            let turn = json.turn;
            let winCombination = json.winCombination;
            dispatch(receiveBoardUpdate(board, outcome, turn, winCombination))
        });

        eventSource.addEventListener("INIT", function (event) {
            console.log(event);
            let json = JSON.parse(event.data);
            let players = json.players;
            dispatch(receiveBoardInit(players))
        });

        eventSource.addEventListener("ONLINE", function (event) {
            console.log(event);
            let json = JSON.parse(event.data);
            let count = json.count;
            dispatch(updateOnlineCount(count))
        });

        eventSource.addEventListener("INVITE", function (event) {
            console.log(event);
            let json = JSON.parse(event.data);
            let join = json.join;
            let spectate = json.spectate;
            let gameId = json.gameId;
            let username = json.username;

            if (join) {
                let yes = window.confirm("You are being invited to join a game by "+username+". Would you like to join?");
                if (yes) {
                    dispatch(pendingInvite("/join/" + gameId))
                }

            } else if (spectate) {
                let yes = window.confirm("You are being invited to spectate a game by "+username+". Would you like to spectate?");
                if (yes) {
                    dispatch(pendingInvite("/spectate/" + gameId))
                }
            }
        });


        let didOpen = null;
        while (!didOpen) {
            console.log("Sending open request");
            const res = await fetch(backendURL + "/event/open/" + subscriberId);
            didOpen = await res.json();
            /*
            await fetch(backendURL + "/event/open/" + subscriberId)
                .then(response => response.json())
                .then(response => {
                    didOpen = response;
                    console.log("Received Open Response: ", response);
                });

             */
            console.log(didOpen);
        }

    }
}