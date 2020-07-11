import {backendURL} from "../other/constants";
import {logout, requestLogin, sendResetEmailMessage} from "./loginActions";
import {getUserId} from "../other/session";

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_ERROR = 'USER_PROFILE_ERROR';
export const INVALIDATE_USER_PROFILE = 'INVALIDATE_USER_PROFILE';

export function invalidateUserProfile() {
    return {
        type: INVALIDATE_USER_PROFILE
    }
}

export function requestUserProfile() {
    return {
        type: REQUEST_USER_PROFILE
    }
}

export function userProfileSuccess(profile) {
    return {
        type: USER_PROFILE_SUCCESS,
        profile: profile
    }
}

export function userProfileError(error) {
    return {
        type: USER_PROFILE_ERROR,
        error: error
    }
}

export function fetchUserProfile(userId) {
    return dispatch => {
        console.log("Fetching User Profile");
        dispatch(requestUserProfile());
        return fetch(backendURL + "/user/user-profile/" + userId)
            .then(response => response.json())
            .then(json => {
                console.log("Received User Profile: ", json);
                dispatch(userProfileSuccess(json))
            })
            .catch(() => {
                console.log("Error Fetching User Profile");
                dispatch(userProfileError("Server Error"))
            });
    }
}

export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment: comment
    }
}

export function sendVerifyEmail(userId) {
    return dispatch => {
        console.log("Fetching Send Verify Email Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/email/verify-email/" + userId)
            .then(response => response.json())
            .then(json => {
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Send Verify Email Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export function verifyEmail(code) {
    return dispatch => {
        console.log("Fetching Verify Email Password Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/user/verify-email?code=" + code)
            .then(response => response.json())
            .then(json => {
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Verify Email Password Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export function uploadImage(image) {
    return {
        type: UPLOAD_IMAGE,
        image
    }
}

export function sendImage(e) {
    return dispatch => {
        let file = e.files[0];
        let image = URL.createObjectURL(file);
        let data = new FormData();
        data.append("file", file);
        console.log("Sending Profile Picture to Server", file);
        fetch(backendURL + '/user/user-image/' + getUserId(),{
            method: 'POST',
            body: data
        }).then(json => {
            console.log(json);
            dispatch(uploadImage(image));
        }).catch(e => {
            console.log(e);
        })
    }
}

export function updatePassword(userId, password) {
    return dispatch => {
        console.log("Fetching Update Password Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/user/" + userId + "/update-password/" + password)
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

export function updateEmail(userId, email) {
    return dispatch => {
        console.log("Fetching Update Email Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/user/" + userId + "/update-email/" + email)
            .then(response => response.json())
            .then(json => {
                dispatch(sendResetEmailMessage(json.errorMessage))
            })
            .catch(() => {
                console.log("Error in Update Email Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}

export function deleteAccount(userId, password) {
    return dispatch => {
        console.log("Fetching Delete Account Response");
        dispatch(requestLogin());
        return fetch(backendURL + "/user/delete-account/" + userId + "/" + password)
            .then(response => response.json())
            .then(valid => {
                if (valid) {
                    console.log("Deleted Account");
                    window.alert("Your account has been deleted");
                    dispatch(logout())
                } else {
                    window.alert("Invalid password");
                }
            })
            .catch(() => {
                console.log("Error in Delete Account Response");
                dispatch(sendResetEmailMessage("Server Error"))
            });
    }
}
