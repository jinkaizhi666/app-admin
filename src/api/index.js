import axios from './axios'

let preFix = axios.defaults.baseUrl

// let reqLogin = (data) => ajax('/login', data, 'POST')
let getTypes = (params = {type: 'goods'}) => {
    return axios.get(preFix + '/get-types', {
        params: {
            type: params.type 
        }
    })
}

let addType = (params = {
    parent: '',
    name: ''
}) => axios.post(preFix + '/type', params)
let putType = params => axios.post(preFix + '/type', params)
let delType = params => axios.post(preFix + '/type', params)

let getGoodsList = params => axios.get(preFix + '/search-goods', params)

let putGoods = goodsInfo => axios.put(preFix + '/put-goods', goodsInfo.data, {
    params: goodsInfo.params
})

let getRoles = () => axios.get(preFix + '/admin/role/list')
let addRole = role => axios.post(preFix + '/admin/role/add', role)
let delRole = roleId => axios.post(preFix +　'/admin/role/del', {roleId})

let getUsers = () => axios.get(preFix + '/admin/list')
let addUser = params => axios.post( preFix + '/admin/add', params)
let delUser = userId => axios.post(preFix + '/admin/del', {userId})

let login = params => axios.post(preFix + '/admin/login', params)

let getJobList = params => axios.get(preFix +'/search-job', params)
export default {
    getTypes,
    addType,
    putType,
    delType,
    getGoodsList,
    putGoods,
    getRoles,
    addRole,
    delRole,
    getUsers,
    addUser,
    delUser,
    login,
    getJobList
}