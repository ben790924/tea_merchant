import axios from 'axios'

axios.interceptors.response.use(response => {
    return response
}, error => {
    alert(error)
})

export default axios;