import axios from 'axios'
import store from 'store'
import {message} from 'antd'

const ENV = 'dev'

let baseURL
if(ENV == 'dev') {
    baseURL = 'http://localhost:7001/admin'
}else {
    baseURL = 'app.vksure.com/admin'
}
let token = store.get('token')

axios.defaults.baseURL = baseURL
axios.defaults.headers.token = token || ''

axios.interceptors.request.use(function(config) {
    console.log('request')
    return config
})

axios.interceptors.response.use(function(res) {
    let data = res.data
    if(data.code == 200) {
        return data.data
    }
}, function(err) {
    message.error('网络出错了')
})
export default axios