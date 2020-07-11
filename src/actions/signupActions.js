import {backendURL} from "../other/constants";

export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export function requestSignUp() {
    return {
        type: REQUEST_SIGN_UP
    }
}

export function signUpSuccess(userId, username) {
    return {
        type: SIGN_UP_SUCCESS,
        userId: userId,
        username: username
    }
}

export function signUpError(error) {
    return {
        type: SIGN_UP_ERROR,
        error: error
    }
}

export function signUpUser(username, password, email) {
    return dispatch => {
        console.log("Creating New User");
        dispatch(requestSignUp());
        return fetch(backendURL + "/user/create-user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })})
            .then(response => response.json())
            .then(json => {

                if (json.valid) {
                    console.log("Received Valid Sign Up Response: ", json);
                    let userId = json.userId;
                    dispatch(signUpSuccess(userId, username, email))
                } else {
                    console.log("Received Invalid Sign Up Response: ", json);
                    let error = json.errorMessage;
                    dispatch(signUpError(error))
                }

            })
            .catch(() => {
                console.log("Error Fetching Sign Up Response");
                dispatch(signUpError("Server Error"))
            })
    }
}