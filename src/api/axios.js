import axios from 'axios'
import store from 'store'
import {message} from 'antd'
import config from '../config/config'

let {baseUrl} = config
let token = store.get('token')

axios.defaults.baseUrl = baseUrl
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
    return err
})
export default axios