import {backendURL} from "../other/constants";
import {subscribeToEventSource} from "./eventActions";
import {getUserId} from "../other/session";

export const REQUEST_LOG_IN = 'REQUEST_LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export function requestLogin() {
    return {
        type: REQUEST_LOG_IN
    }
}

export function loginSuccess(userId, username, rememberMe) {
    return {
        type: LOG_IN_SUCCESS,
        userId: userId,
        username: username,
        rememberMe: rememberMe
    }
}

export function loginError(error) {
    return {
        type: LOG_IN_ERROR,
        error: error
    }
}

export function logUserOut() {
    return {
        type: LOG_OUT
    }
}

export function logout() {
    return dispatch => {
        if (getUserId() == null) {
            dispatch(logUserOut())
        } else {
            console.log("Fetching Close EventSource Response");
            return fetch(backendURL + "/event/close/" + getUserId())
                .then(() => {
                    dispatch(logUserOut())
                })
                .catch(() => {
                    console.log("Error in Close EventSource Response");
                });
        }
    }
}

export function loginUser(username, password, rememberMe) {
    return async dispatch => {
        console.log("Fetching Login Response");
        dispatch(requestLogin());
        fetch(backendURL + "/user/" + username + "/" + password + "/validate")
            .then(response => response.json())
            .then(json => {

                if (json.valid) {
                    console.log("Received Valid Login Response: ", json);
                    let userId = json.user;
                    dispatch(loginSuccess(userId, username, rememberMe));
                    dispatch(subscribeToEventSource(getUserId()))
                } else {
                    console.log("Received Invalid Login Response: ", json);
                    let error = json.errorMessage;
                    dispatch(loginError(error))
                }

            })
            .catch(() => {
                console.log("Error Fetching Login Response");
                dispatch(loginError("Server Error"))
            });
    }
}

export const CLEAR_USER_DETAILS = "CLEAR_USER_DETAILS";

export function clearUserDetails() {
    return {
        type: CLEAR_USER_DETAILS
    }
}

export function sendResetPasswordEmail(username) {
    return dispatch => {
        console.log("Fetching Send Reset Email Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/email/password-reset/" + username)
            .then(response => response.json())
            .then(json => {
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Reset Password Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export const SHOW_SEND_RESET_EMAIL_RESULT = "SHOW_SEND_RESET_EMAIL_RESULT";

export function sendResetEmailMessage(message) {
    return {
        type: SHOW_SEND_RESET_EMAIL_RESULT,
        message: message
    }
}

export function updatePassword(password, code) {
    return dispatch => {
        console.log("Fetching Update Password Response", backendURL + "/user/reset-password/" + password + "?code=" + code);
        dispatch(requestLogin());
        return fetch(backendURL + "/user/reset-password/" + password + "?code=" + code)
            .then(response => response.json())
            .then(json => {
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Update Password Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export const SEARCH_RESULT = "SEARCH_RESULT";

export function searchResult(userId) {
    return {
        type: SEARCH_RESULT,
        userId
    }
}


export function doesUserExist(username) {
    return dispatch => {
        console.log("Fetching Does User Exist Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/user/username/" + username)
            .then(response => response.json())
            .then(json => {
                dispatch(searchResult(json.userId));
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Does User Exist Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export const CLEAR_SEARCH = "CLEAR_SEARCH";

export function clearSearch() {
    return {
        type: CLEAR_SEARCH
    }
}

export const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

export function clearErrorMessage() {
    return {
        type: CLEAR_ERROR_MESSAGE
    }
}