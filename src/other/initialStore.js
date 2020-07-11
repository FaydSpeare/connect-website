import {getUserId, getUsername, isLoggedIn} from "./session";

export function emptyGame() {
    return {
        isFetching: false,
        gameId : undefined,
        player: undefined,
        players : [
            {
                username : undefined,
                elo : undefined
            },
            {
                username : undefined,
                elo : undefined
            }
        ],
        board : undefined,
        turn : 1,
        chat : [],
        winCombination: [],
        outcome: undefined
    }
}

export default function initialStore() {

    let username = isLoggedIn() ? getUsername() : undefined;
    let userId = isLoggedIn() ? getUserId() : undefined;

    return {
        userDetails : {
            isFetching: false,
            username : username,
            userId : userId,
            errorMessage: undefined
        },
        userProfile : {
            isFetching: false,
            didInvalidate: false,
            profile: undefined,
            errorMessage: undefined
        },
        currentGame : emptyGame(),
        eventSource: {
            eventSource : undefined,
            subscriberId: undefined,
            isFetching: false,
            onlineCount: null,
            pendingInvite: undefined
        },
        userSearch : {
            userId: undefined,
            profile: undefined
        }
    };

}
