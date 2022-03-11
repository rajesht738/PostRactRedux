import axios, { Axios } from "axios";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { formatePost, getPost } from "../services/PostServeice";
// import { confirmedGetPostsAction, GET_POST } from "../Store/actions/PostActions";
import { CounterReducer } from "../Store/reducers/CounterReducer";
import { PostReducer } from "../Store/reducers/PostReducer";
import { AuthReducer } from "./reducers/AuthReducer";

// export const Store = createStore(CounterReducer);

// Middleware 
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('dispatching action', action);
    console.log('Before Dispatching action', store.getState());
    let result = next(action);
    setTimeout(() => {
        console.log('Time out called');
    }, 4000)
    console.log('next state', store.getState());
    return result;

};
// const fetchDataMiddleware = (store) => (next) => (action) => {
//     if (action.type === GET_POST) {
//         // ajax call 
        
//         // axios.get('https://react-f133d-default-rtdb.firebaseio.com/post.json')
//         // .then((response) => {
//         //     console.log(response.data);
//         //     let posts = [];
//         //     for(let key in response.data){
//         //         posts.push({...response.data[key], id: key})
//         //     }
//         //     store.dispatch(confirmedGetPostsAction(posts));

//         // })
//     };
//     return next(action);
// }
// const middleware = applyMiddleware(loggerMiddleware, fetchDataMiddleware );
// Here we use thunk library 

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    postR: PostReducer,
    authR: AuthReducer
})
// export const Store = createStore(PostReducer, composeEnhancers(middleware));
export const Store = createStore(reducers, composeEnhancers(middleware));


