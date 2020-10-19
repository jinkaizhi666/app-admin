import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from '../../components/header'
// 管理页面
import Category from '../category'
import Production from '../production'
import User from '../user'
import Role from '../role'
import Home from '../home'
import Job from '../job'

import {Route, Switch, Redirect} from 'react-router-dom'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
            <LeftNav />
        </Sider>
        <Layout style={{backgroundColor: 'white'}}>
          <Header style={{backgroundColor: '#f0f2f5', padding: '10px'}} />
          <Content style={{margin: '10px 0 10px 0', padding: '10px', backgroundColor: '#f0f2f5'}}>
          <Switch>
                <Route path="/production/category-manage" component={Category} />
                <Route path="/role" component={Role} />
                <Route path="/production" component={Production} />
                <Route path="/user" component={User} />
                <Route path="/home" component={Home} />
                <Route path="/job" component={Job} />
                <Redirect to="/login" />
              </Switch>
          </Content>
          <Footer style={{padding: '10px'}}>
            ssss
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
