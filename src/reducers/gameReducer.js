import {
    CLEAR_GAME,
    CREATE_COMP_GAME_SUCCESS,
    CREATE_HUMAN_GAME_ERROR,
    CREATE_HUMAN_GAME_SUCCESS, JOIN_GAME_SUCCESS,
    PLACE_TILE,
    REQUEST_CREATE_HUMAN_GAME, SEND_CHAT_LINE, SPECTATE_GAME_SUCCESS, SYSTEM_CHAT_LINE
} from "../actions/gameActions";
import {RECEIVE_BOARD_INIT, RECEIVE_BOARD_UPDATE, RECEIVE_CHAT_LINE} from "../actions/eventActions";
import {getUsername} from "../other/session";
import {emptyGame} from "../other/initialStore";

function newBoard() {
    return [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
}

function updateBoard(state, row, col, turn) {
    let board = [...state];
    board[row][col] = turn;
    return board;
}

function createPlayers(elo) {
    return [
        {
            username: getUsername(),
            elo
        },
        {
            username: "Celestial",
            elo: "2000",
        }
    ]
}

function currentGame(state={}, action) {

    switch(action.type) {
        case PLACE_TILE:
            return {...state, board: updateBoard(state.board, action.row, action.column, state.turn), turn: (3 - state.turn)};
        case CLEAR_GAME:
            return emptyGame();
        case CREATE_COMP_GAME_SUCCESS:
            return {...state, board: newBoard(), turn: 1, gameId: action.gameId, player: action.player, players: createPlayers(action.elo)};
        case SPECTATE_GAME_SUCCESS:
            return {...state, board: action.board, turn: 1, gameId: action.gameId, players: action.players == null ? state.players : action.players};
        case JOIN_GAME_SUCCESS:
        case CREATE_HUMAN_GAME_SUCCESS:
            return {...state, board: newBoard(), turn: 1, gameId: action.gameId, player: action.player};
        case SYSTEM_CHAT_LINE:
        case RECEIVE_CHAT_LINE:
            return {...state, chat: [...state.chat, action.chatLine]};
        case RECEIVE_BOARD_UPDATE:
            return {...state, board: action.board, turn: action.turn, winCombination: action.winCombination, outcome: action.outcome};
        case RECEIVE_BOARD_INIT:
            return {...state, players: action.players};
        case REQUEST_CREATE_HUMAN_GAME:
        case CREATE_HUMAN_GAME_ERROR:
        default:
            return state;
    }

}

export default currentGame