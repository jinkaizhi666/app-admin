/*
    入口文件
*/

import React from 'react'
import ReactDOM from 'react-dom'
import './App.less';
import {Provider} from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
    <Provider store={store}> 
        <App /> 
    </Provider>
, document.querySelector('#root'))
