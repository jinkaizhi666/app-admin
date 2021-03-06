/*
    根组件
*/
import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/admin'

export default class App extends Component {
    render() {
        return <HashRouter>
            <Switch>
                 <Route path="/login"  component={Login} />
                <Route path="/" component={Admin} />
            </Switch>
        </HashRouter>
    }
}
