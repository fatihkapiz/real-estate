import jwt_decode from 'jwt-decode';


export function isLoggedIn() {
    if (localStorage.getItem("token" === null)) {
        localStorage.clear();
        return false;
    }
    if (localStorage.getItem("expiration") < Date.now()) {
        localStorage.clear();
        return false;
    }
    return true;
}

export function config() {
    return {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    }
}

export function isAdmin() {
    // Assuming you have stored the JWT token in localStorage after login
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; // "role" should match the claim key in your token
        console.log(decodedToken);
        console.log(userRole);

        if (userRole.length === 2) {
            console.log("user is admin");
            return true;
        } else if (userRole === 'User') {
            console.log("user is not admin");
            return false;
        }
    } else {
        return false;
    }
}
