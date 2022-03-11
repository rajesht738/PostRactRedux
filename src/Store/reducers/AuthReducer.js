import { CONFIRMED_LOGIN_ACTION, LOADING_TOGGLE_ACTION, LOGIN_FAILED_ACTION, LOGOUT_ACTION, SINGUP_CONFIRMED_ACTION, SINGUP_FAILED_ACTION } from "../actions/AuthActions";

const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refresToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};
export function AuthReducer(state = initialState, actions) {
    if (actions.type === SINGUP_CONFIRMED_ACTION) {
        // debugger;
        return {
            ...state,
            auth: actions.payload,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
        };
    }
    if(actions.type === CONFIRMED_LOGIN_ACTION){
        return {
            ...state,
            auth: actions.payload,
            errorMessage: '',
            successMessage: 'Login Successfully!',
            showLoading: false,
        }
    }
    if(actions.type === LOGOUT_ACTION){
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
            auth: {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refresToken: '',
            }
        }
    }
    if (actions.type === SINGUP_FAILED_ACTION || actions.type === LOGIN_FAILED_ACTION) {
        // debugger;
        return {
            ...state,
            errorMessage: actions.payload,
            successMessage: '',
            showLoading: false,
        };
    }
    if (actions.type === LOADING_TOGGLE_ACTION){
        return{
            ...state,
            showLoading: actions.payload

        }
    }
    return state;
}