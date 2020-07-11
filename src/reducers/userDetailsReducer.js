import {
    REQUEST_LOG_IN,
    LOG_IN_ERROR,
    LOG_IN_SUCCESS,
    LOG_OUT,
    CLEAR_USER_DETAILS,
    SHOW_SEND_RESET_EMAIL_RESULT, CLEAR_ERROR_MESSAGE, CLEAR_SEARCH
} from "../actions/loginActions";
import {login, logout} from "../other/session";
import {REQUEST_SIGN_UP, SIGN_UP_ERROR, SIGN_UP_SUCCESS} from "../actions/signupActions";

function loginActions(state, action) {
    switch (action.type) {
        case REQUEST_LOG_IN:
            return {...state, isFetching: true, errorMessage: undefined};
        case LOG_IN_SUCCESS:
            login(action.userId, action.username, action.rememberMe);
            return {...state, userId: action.userId, username: action.username, isFetching: false, errorMessage: undefined};
        case LOG_IN_ERROR:
            return {...state, errorMessage: action.error, isFetching: false};
        case LOG_OUT:
            logout();
            return {username: undefined, userId: undefined, isFetching: false, errorMessage: undefined};
        default:
            return state;
    }
}

function signUpActions(state, action) {
    switch (action.type) {
        case REQUEST_SIGN_UP:
            return {...state, isFetching: true, errorMessage: undefined};
        case SIGN_UP_SUCCESS:
            return {...state, userId: action.userId, username: action.username, isFetching: false, errorMessage: undefined};
        case SIGN_UP_ERROR:
            return {...state, errorMessage: action.error, isFetching: false};
        default:
            return state;
    }
}

function userDetails(state={}, action) {
    switch (action.type) {
        case CLEAR_SEARCH:
        case CLEAR_ERROR_MESSAGE:
            return {...state, isFetching: false, errorMessage: undefined};
        case CLEAR_USER_DETAILS:
            return {username: undefined, userId: undefined, isFetching: false, errorMessage: undefined};
        case REQUEST_SIGN_UP:
        case SIGN_UP_SUCCESS:
        case SIGN_UP_ERROR:
            return signUpActions(state, action);
        case REQUEST_LOG_IN:
        case LOG_IN_SUCCESS:
        case LOG_IN_ERROR:
        case LOG_OUT:
            return loginActions(state, action);
        case SHOW_SEND_RESET_EMAIL_RESULT:
            return {...state, isFetching: false, errorMessage: action.message};
        default:
            return state;
    }
}

export default userDetails