import axios from 'axios'
import router from './router'

axios.interceptors.request.use(config => {
  if (document.cookie) {
    config.headers.Authorization = document.cookie.split('=')[1]
  }
  return config
}, error => {
  Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  const { status } = error.response
  if (status === 401) {
    deleteCookie('sid')
    alert('Token過期，重新登入')
    router.push('/login')
  }
  alert(error)
})

function deleteCookie (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
export default axios
