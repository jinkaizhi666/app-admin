import axios from 'axios'
import store from 'store'
import {message} from 'antd'
import config from '../config/config'

let {baseUrl} = config
let token = store.get('token')

axios.defaults.baseUrl = baseUrl
console.log(axios.defaults.baseUrl)
axios.defaults.headers.token = token || ''
axios.defaults.headers.admin = true

axios.interceptors.request.use(function(config) {
    console.log('request')
    return config
})

axios.interceptors.response.use(function(res) {
    console.log('请求成功')
    let data = res.data
    if(data.code == 200) {
        return data.data
    }else if(data.code == 400) {
        message.error(data.msg)
        return Promise.reject(data.msg)
    }
}, function(err) {
        message.error('网络出错了')
        return err
})
export default axios