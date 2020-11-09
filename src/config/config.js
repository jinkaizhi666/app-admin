export let ENV = 'prod'
if(ENV == 'dev') {
var uploadUrl = 'http://localhost:7001/upload'
var baseUrl = 'http://localhost:7001'
}
 else {
var uploadUrl = '/api/upload'
var baseUrl = '/api'
console.log('当前是prod环境')
}

export default {
    uploadUrl,
    baseUrl
}
