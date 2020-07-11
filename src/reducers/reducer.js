import {combineReducers} from "redux";
import userDetails from "./userDetailsReducer";
import userProfile from "./userProfileReducer";
import currentGame from "./gameReducer";
import eventSource from "./eventReducer";
import userSearch from "./userSearchReducer";

const rootReducer = combineReducers({
    userDetails,
    currentGame,
    userProfile,
    eventSource,
    userSearch
});

export default rootReducer