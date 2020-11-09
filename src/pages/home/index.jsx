import React, { Component } from 'react'
import {Card} from 'antd'
export default class Home extends Component {
    render() {
        return (
            <div>
                <Card title="实现的功能" style={{width: 700, margin: '0 auto'}}>
                   <p>1. 登录注册</p>
                   <p>2. 用户/角色管理</p>
                   <p>3. 根据不同用户权限动态渲染左侧菜单栏</p>
                   <p>4. 商品管理模块</p>
                   <p>5. 数据统计(echarts)</p>
                   <p>6. 前后端对接</p>
                </Card>
            </div>
        )
    }
}
