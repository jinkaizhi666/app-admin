import axios from './axios'

// let reqLogin = (data) => ajax('/login', data, 'POST')
let getTypes = (params = {type: 'goods'}) => {
    return axios.get('/get-types', {
        params: {
            type: params.type 
        }
    })
}

let addType = (params = {
    parent: '',
    name: ''
}) => axios.post('/type', params)
let putType = params => axios.post('/type', params)
let delType = params => axios.post('/type', params)

let getGoodsList = params => axios.get('/search-goods', params)

let putGoods = goodsInfo => axios.put('/put-goods', goodsInfo.data, {
    params: goodsInfo.params
})

let getRoles = () => axios.get('/admin/role/list')
let addRole = role => axios.post('/admin/role/add', role)
let delRole = roleId => axios.post('/admin/role/del', {roleId})
export default {
    getTypes,
    addType,
    putType,
    delType,
    getGoodsList,
    putGoods,
    getRoles,
    addRole,
    delRole
}