import {CLEAR_SEARCH, CLEAR_USER_DETAILS, SEARCH_RESULT} from "../actions/loginActions";

function userSearch(state={}, action) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {userId: action.userId};
        case CLEAR_SEARCH:
        case CLEAR_USER_DETAILS:
            return {userId: undefined};
        default:
            return state
    }
}

export default userSearch;