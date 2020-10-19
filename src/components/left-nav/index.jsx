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

   genMenuRedus = (menuList) => {
     console.log(this.props)
    let path = this.props.location.pathname
  
    return menuList.reduce((pre, item) => {
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
      } else {
        let childRoute = item.children.find(item => item.key == path)
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
    return (
      <div>
        <header className="admin-header-logo">
          <img src={logo} alt="" />
          <span>校享享</span>
        </header>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNode}

        
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav)