import axios from "axios";

axios.defaults.withCredentials = true; // 全局开启携带凭据

const instance = axios.create({
    timeout: 1000,
    withCredentials: true, // 跨域请求时发送Cookie

})

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})



export default instance