import axios from "axios";
import { Store } from "../Store/Store";

const axiosInstance = axios.create({
    baseURL: `https://react-f133d-default-rtdb.firebaseio.com/`,
});

axiosInstance.interceptors.request.use((config) => {
    const state = Store.getState();
    const token = state.authR.auth.idToken;
   // console.log(state);
    config.params = config.params || {}
    config.params['auth'] = token;
    // console.log(config);
return config;
});

export default axiosInstance;