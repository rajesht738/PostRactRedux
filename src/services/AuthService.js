import axios from "axios";
import { confirmedLoginAction, logoutAction } from "../Store/actions/AuthActions";

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    }

    return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC69oHlJ0yVTamx7bxxGFQYGsHni6prepM`, postData,)
}
export function login(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    }

    return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC69oHlJ0yVTamx7bxxGFQYGsHni6prepM`, postData,)
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email Not Found';
        case 'INVALID_PASSWORD':
            return 'Password is Invalid!';
        case 'USER_DISABLED':
            return 'User has disbled';
        default:
            return '';
    }
}
// function to save token in local storage

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(new Date().getTime() + tokenDetails.expiresIn * 1000);
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));

}
export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        // dispatch logoutAction with timer
        dispatch(logoutAction(history));
    }, timer)
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        // call logout when tokenDetails not present in localstorage on browser
        dispatch(logoutAction(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();
    if(todaysDate > expireDate) {
        // call logout on date comparison
        dispatch(logoutAction(history));
        return;
    }
    dispatch(confirmedLoginAction(tokenDetails));
    const timer = expireDate.getTime() - todaysDate.getTime();
    // call logout function on remaining time
    runLogoutTimer(dispatch, timer);

}
