import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from '../../components/header'
import store from 'store'
// 管理页面
import ProductionCategory from '../production/category'
import Production from '../production/goods-manage'
import GoodsDetail from '../production/goods-detail'
import GoodsEdit from '../production/GoodsEdit'
import User from '../user'
import Role from '../role'
import Home from '../home'
import Job from '../job/job-manage'
import JobCategory from '../job/category'
import JobEdit from '../job/job-edit'
import JobDetail from '../job/job-detail'
import UserInfo from '../webInfo/user'
import PlatformInfo from '../webInfo/platform'
import {connect} from 'react-redux'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super()
    let user = store.get('user')
    this.user = user
    props.dispatch({
      type: 'initUserInfo',
      payload: this.user
    })
  }

  render() {
    if(!this.user) return <Redirect to="/login" /> 
    // props.history.replace('/login')
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
                <Route path="/job/manage" exact component={Job} />
                <Route path="/job/manage/edit" exact component={JobEdit} />
                <Route path="/job/manage/detail" exact component={JobDetail} />
                <Route path="/job/category-manage" component={JobCategory} />
                <Route path="/web-info/user" component={UserInfo} />
                <Route path="/web-info/platform" component={PlatformInfo} />
                <Redirect to="/login" />
              </Switch>
          </Content>
          <Footer style={{padding: '10px'}}>
            copyright@karry.jin 2020/11/4
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(withRouter(Admin))
