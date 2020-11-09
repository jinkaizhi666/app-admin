import React, { Component } from "react";
import logo from "../../assets/imgs/logo.png";
import "./style.less";
import { Menu } from "antd";
import menuConfig from "../../config/menuConfig";
import {Link, withRouter} from 'react-router-dom'
import {
  UserSwitchOutlined,
  HomeOutlined,
  AccountBookOutlined,
  ReconciliationOutlined,
  KeyOutlined
} from '@ant-design/icons';
import {connect} from 'react-redux'
let { SubMenu } = Menu;

let iconMap = {
    HomeOutlined: <HomeOutlined />,
    AccountBookOutlined: <AccountBookOutlined />,
    UserSwitchOutlined: <UserSwitchOutlined />,
    ReconciliationOutlined: <ReconciliationOutlined />,
    KeyOutlined: <KeyOutlined />
}

function genMenu(menuList) {
  return menuList.map((item) => {
    if (!item.children) {
      return (
        <Menu.Item key={item.key} icon={iconMap[item.icon]}>
          <Link to={item.key}>
          <span>
            <span>{item.title}</span>
          </span>
          </Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu
          icon={iconMap[item.icon]}
          key={item.key}
          title={
            <span>
              <span>{item.title}</span>
            </span>
          }
        >
          {genMenu(item.children)}
        </SubMenu>
      )
    }
  });
}



 class LeftNav extends Component {
  componentWillMount() {
    this.menuNode = this.genMenuRedus(menuConfig)
  }

  hasAuth = (item, userInfo) => {
    let key = item.key
    if(userInfo.auth == 'admin' || item.isPublic) return true
    else if( !item.children &&  userInfo.menus.includes(key)) {
      return true
    }
    else if(item.children) {
      return !!item.children.find( children => userInfo.menus.includes(children.key))
    }
    else  {
      return false
    }
  }

   genMenuRedus = (menuList) => {
    let path = this.props.location.pathname
    let user = this.props.user
  
    return menuList.reduce((pre, item) => {
      
      if(!this.hasAuth(item, {
        menus: user.roleId.menus,
        auth: user.roleId.role
      })) return pre

      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={iconMap[item.icon]}>
            <Link to={item.key}>
            <span>
              <span>{item.title}</span>
            </span>
            </Link>
          </Menu.Item>
        ) 
      } else{
        let childRoute = item.children.find(item => path.startsWith(item.key) )
        if(childRoute) {
            this.openKey = item.key
        }
        pre.push(<SubMenu
          icon={iconMap[item.icon]}
          key={item.key}
          title={
            <span>
              <span>{item.title}</span>
            </span>
          }
        >
          {this.genMenuRedus(item.children)}
        </SubMenu>)
      }
      return pre
    }, []);
  }

  render() {
    let path = this.props.location.pathname
    let reg = /(\/.{1,}\/.)\//
    console.log(path, reg.test(path))
    return (
      <div>
        <header className="admin-header-logo">
          <img src={logo} alt="" />
          <span>校享享</span>
        </header>

        <Menu
          selectedKeys={[this.openKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNode}
          {console.log('22222222222222222',this.menuNode)}

        
        </Menu>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(withRouter(LeftNav))