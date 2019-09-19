import axios from 'axios';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log('response error', error);
    
})

axios.interceptors.request.use(request => {
    return request
}, error => {
    console.log('request error', error)
})

export default axios