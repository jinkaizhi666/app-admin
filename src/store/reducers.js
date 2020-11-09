let user = (state = {}, {type, payload}) => {
    switch (type) {
        case 'initUserInfo':
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}
export default {
    user
}