import {
    ADD_COMMENT,
    INVALIDATE_USER_PROFILE,
    REQUEST_USER_PROFILE, UPLOAD_IMAGE,
    USER_PROFILE_ERROR,
    USER_PROFILE_SUCCESS
} from "../actions/profileActions";
import {LOG_OUT} from "../actions/loginActions";

function addComment(state, comment) {
    let comments = [...state.comments];
    comments.push(comment);
    return {...state, comments: comments};
}

function addImage(state, image) {
    return {...state, image: image};
}

function userProfile(state={}, action) {
    switch(action.type) {
        case REQUEST_USER_PROFILE:
            return {...state, isFetching: true, didInvalidate: false};
        case USER_PROFILE_ERROR:
            console.log("error");
            return {...state, isFetching: false, errorMessage: action.error};
        case USER_PROFILE_SUCCESS:
            console.log("success");
            return {...state, isFetching: false, profile: action.profile};
        case INVALIDATE_USER_PROFILE:
            return {...state, isFetching: false, didInvalidate: true};
        case ADD_COMMENT:
            return {...state, profile: addComment(state.profile, action.comment)};
        case LOG_OUT:
            return {isFetching: false, didInvalidate: false, profile: undefined, errorMessage: undefined};
        case UPLOAD_IMAGE:
            return {...state, profile: addImage(state.profile, action.image)};
        default:
            return state
    }
}

export default userProfile