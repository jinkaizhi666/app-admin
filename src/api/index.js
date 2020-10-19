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

export default {
    getTypes,
    addType,
    putType,
    delType
}