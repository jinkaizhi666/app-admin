import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducers from './reducers'
// import reduxThunk from 'redux-thunk'
// import {composeWithDevTools } from 'redux-devtools-extension'

// export default createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(reduxThunk)) )
export default createStore(combineReducers(reducers))