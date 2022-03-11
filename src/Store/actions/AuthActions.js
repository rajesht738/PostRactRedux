import { formatError, login, runLogoutTimer, saveTokenInLocalStorage, signUp } from "../../services/AuthService"

export const SINGUP_CONFIRMED_ACTION = '[singup action] confirmed signup';
export const SINGUP_FAILED_ACTION = '[singup action] failed signup';
  
export const CONFIRMED_LOGIN_ACTION = '[login action] confirmed login action';
export const LOGIN_FAILED_ACTION = '[login action] failed login';

export const LOGOUT_ACTION = '[logout action] logout action';

export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading '

export function signupAction(email, password, history) {
    return (dispatch) => {
        // database ajax call 
        signUp(email, password).then((res) => {
            // console.log(res);
            saveTokenInLocalStorage(res.data);
            runLogoutTimer(dispatch, res.data.expiresIn, history);
            dispatch(confirmedSignupAction(res.data));
            history.push('/');

        }).catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
           // console.error(error.response);
        });
    };
}
export function loginAction(email, password, history){
    return (dispatch)=> {
        login(email, password).then((response) => {
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
            dispatch(confirmedLoginAction(response.data));
            history.push('/');
         
        }).catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(failedLoginAction(errorMessage));
        })
    }
}
export function logoutAction(history){
    localStorage.removeItem('userDetails');
    history.push('/login');
     return {
        type: LOGOUT_ACTION,
    }
    
}
export function confirmedLoginAction(message){
    return {
        type: CONFIRMED_LOGIN_ACTION,
        payload: message,
    }
}
 export function failedLoginAction(data){
     return {
         type: LOGIN_FAILED_ACTION,
         payload: data,
     }
 }   
    

export function confirmedSignupAction(payload) {
    return {
        type: SINGUP_CONFIRMED_ACTION,
        payload,
    }
}
export function signupFailedAction(message){
    return {
        type: SINGUP_FAILED_ACTION,
        payload: message
    }
}

export function loadingToggleAction(status){
    return {
        type : LOADING_TOGGLE_ACTION,
        payload: status,
    }
}

