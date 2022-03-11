import axiosInstance from "../services/AxiosInstance";

export function getPost(){
    return axiosInstance.get(`post.json`);
}

export function createPost(postData){
    return axiosInstance.post(`post.json`, postData);
}
export function updatePost(post, postId){
    return axiosInstance.put(`post/${postId}.json`, post);
}
export function deletePost(postId){
    return axiosInstance.delete(`post/${postId}.json`);
}

export function formatePost(postData){
    let posts = [];
    for(let key in postData){
        posts.push({...postData[key], id: key});
    }
    return posts;


}
// import axiosInstance from "../services/AxiosInstance";

// export function getPost(token){
//     return axiosInstance.get(`https://react-f133d-default-rtdb.firebaseio.com/post.json?auth=${token}`);
// }

// export function createPost(postData, token){
//     return axiosInstance.post(`https://react-f133d-default-rtdb.firebaseio.com/post.json?auth=${token}`, postData);
// }
// export function updatePost(post, postId, token){
//     return axiosInstance.put(`https://react-f133d-default-rtdb.firebaseio.com/post/${postId}.json?auth=${token}`, post);
// }
// export function deletePost(postId, token){
//     return axios.delete(`https://react-f133d-default-rtdb.firebaseio.com/post/${postId}.json?auth=${token}`);
// }

// export function formatePost(postData){
//     let posts = [];
//     for(let key in postData){
//         posts.push({...postData[key], id: key});
//     }
//     return posts;


// }