import { createPost, deletePost, formatePost, getPost, updatePost } from "../../services/PostServeice";
import { CONFIRMED_CREATE_POST_ACTION, CONFIRMED_DELETE_POST_ACTION, CONFIRMED_EDIT_POST_ACTION, CONFIRMED_GET_POST } from "./PostTypes";




export function createPostAction(postData, history) {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.authR.auth.idToken;
        createPost(postData, token).then((response) => {
            console.log(response.data);
            const singlePost = {
                ...postData,
                id: response.data.name,
            };
            dispatch(confirmedCreatePostAction(singlePost));
            history.push('/posts');
        });
    }
}
export function confirmedCreatePostAction(singlePost) {
    return {
        type: CONFIRMED_CREATE_POST_ACTION,
        payload: singlePost
    }
}
export function getPostsAction() {
    return (dispatch, getState) => {

      //  console.log(getState());
        // const state = getState();
        // const token = state.authR.auth.idToken;
        getPost().then((response) => {


            let posts = formatePost(response.data);
            dispatch(confirmedGetPostsAction(posts));
            console.log(getState());
        })
    }
}
export function confirmedGetPostsAction(posts) {
    return {
        type: CONFIRMED_GET_POST,
        payload: posts,
    }
}
export function confirmedUpdatePostAction(post) {
    return {
        type: CONFIRMED_EDIT_POST_ACTION,
        payload: post,
    };
}
export function updatePostAction(post, history) {
    return (dispatch, getState) => {
     //   const state = getState();
       // const token = state.authR.auth.idToken;
        updatePost(post, post.id).then((response) => {
            dispatch(confirmedUpdatePostAction(post));
            history.push('/posts');

        });
    }
}
export function deletePostAction(postId, history) {
    return (dispatch, getState) => {
       // const state = getState();
       // const token = state.authR.auth.idToken;
        // here PostService called and it send postId with deletePost function and deleted data and get response
        deletePost(postId).then((response) => {
            dispatch(confirmedDeletePostAction(postId))
            history.push('/posts');
        })
    }
}
export function confirmedDeletePostAction(postId) {
    return {
        type: CONFIRMED_DELETE_POST_ACTION,
        payload: postId,
    }
}


