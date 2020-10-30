export let ENV = 'dev'
if(ENV == 'dev') {
var uploadUrl = 'http://localhost:7001/upload'
var baseUrl = 'http://localhost:7001'
}
 else {
var uploadUrl = 'http://localhost:7001/upload'
var baseUrl = 'app.vksure.com'
}
export default {
    uploadUrl,
    baseUrl
}
