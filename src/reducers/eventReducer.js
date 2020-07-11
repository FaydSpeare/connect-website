import {
    EVENT_SOURCE_ERROR,
    EVENT_SOURCE_SUCCESS, INVITE_RESOLVED, PENDING_INVITE,
    REQUEST_EVENT_SOURCE,
    UPDATE_ONLINE_COUNT
} from "../actions/eventActions";
import {LOG_OUT} from "../actions/loginActions";

function eventSource(state={}, action) {
    switch(action.type) {
        case UPDATE_ONLINE_COUNT:
            return {...state, onlineCount: action.count};
        case REQUEST_EVENT_SOURCE:
            return {...state, isFetching: true};
        case LOG_OUT:
            if (state.eventSource !== undefined) {
                state.eventSource.close();
            }
            return {...state, eventSource: undefined, subscriberId: undefined};
        case EVENT_SOURCE_SUCCESS:
            return {...state, eventSource: action.eventSource, subscriberId: action.subscriberId, isFetching: false};
        case EVENT_SOURCE_ERROR:
            return {...state, isFetching: false};
        case PENDING_INVITE:
            return {...state, pendingInvite: action.url};
        case INVITE_RESOLVED:
            return {...state, pendingInvite: null};
        default:
            return state;
    }
}

export default eventSource