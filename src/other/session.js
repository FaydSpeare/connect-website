export function login(userId, username, rememberMe) {
    if (rememberMe) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", userId);
        localStorage.setItem("username",  username);
    }

    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("username",  username);

}

export function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
}

export function isLoggedIn(props=undefined) {
    if (props !== undefined) {
        return (props.userDetails.userId !== undefined) || (localStorage.getItem("loggedIn") === "true") || (sessionStorage.getItem("loggedIn") === "true")
    }
    return localStorage.getItem("loggedIn") === "true" || (sessionStorage.getItem("loggedIn") === "true")
}

export function getUserId() {
    let sessionUserId = sessionStorage.getItem("userId");
    if (sessionUserId == null) {
        return localStorage.getItem("userId");
    }
    return sessionUserId;
}

export function getUsername() {
    let sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername == null) {
        return localStorage.getItem("username");
    }
    return sessionUsername;
}

