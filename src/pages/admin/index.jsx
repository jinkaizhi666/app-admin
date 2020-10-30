import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from '../../components/header'
// 管理页面
import ProductionCategory from '../production/category'
import Production from '../production/goods-manage'
import GoodsDetail from '../production/goods-detail'
import GoodsEdit from '../production/GoodsEdit'
import User from '../user'
import Role from '../role'
import Home from '../home'
import Job from '../job'
import JobCategory from '../job/category'

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
          <Content style={{margin: '10px 0 10px 0', padding: '10px', backgroundColor: '#f0f2f5', overflowY: 'scroll'}}>
          <Switch>
                <Route path="/production/category-manage" component={ProductionCategory} />
                <Route path="/production/manage/detail" exact component={GoodsDetail} />
                <Route path="/production/manage" exact component={Production} />
                <Route path="/production/manage/edit" exact component={GoodsEdit} />
                <Route path="/role" component={Role} />
                <Route path="/user" component={User} />
                <Route path="/home" component={Home} />
                <Route path="/job" exact component={Job} />
                <Route path="/job/category-manage" component={JobCategory} />
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
