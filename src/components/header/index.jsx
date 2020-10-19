import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './style.less'
import menuList from '../../config/menuConfig'
import {Modal, Breadcrumb } from 'antd'
import LinkButton from '../../components/link-button'

 class Header extends Component {
    getTitle() {
        let path = this.props.location.pathname
        let title
        menuList.forEach( item => {
            if(item.key == path) {
                title = item.title
            }else if(item.children) {
                    let citem = item.children.find(citem => citem.key == path) 
                        if(citem) {
                         title = citem.title
                        }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            title: '确认退出登录吗?',
            onOk: () => {
                localStorage.clear()
                console.log('logout', this.props.history.replace)
                this.props.history.replace('/login')
            }
        })
    }

    render() {
        let title = this.getTitle()
        return (
            <div  className="admin-header">
               <div className="header-line1">
                   <span>tom</span>
                   <LinkButton onClick={this.logout}>退出</LinkButton>
               </div> 
               <div className="header-line2">
                   <span>{title}</span>
               </div>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            </div>
        )
    }
}
export default withRouter(Header)