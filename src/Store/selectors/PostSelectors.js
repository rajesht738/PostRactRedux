import { createSelector } from "reselect";

export const getPostById = (state, postId) => state.postR.posts.find((p) => p.id === postId);

export const getPost = () => createSelector([getPostById], (post) => post ); 