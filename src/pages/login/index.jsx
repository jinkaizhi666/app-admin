import React from "react";
import { Button, message, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from "../../assets/imgs/logo.png";
import moduleName from '../../assets/imgs/react.jpg'
import "./style.less";
import store from 'store'
import {user} from '../../utils/storeKey'
import api from "../../api";
import { connect } from "react-redux";

const rules= {
    userName: [
        {
            required: true,
            message: '用户名不能为空',
            validateTrigger: 'onChange'
        },
        {
            min: 4,
            max: 16,
            message: '长度要在四到十六位',
            validateTrigger: 'onChange'

        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            validateTrigger: 'onChange'
        },
        {
          min: 5,
          max: 20,
          message: '长度要在5到20位',
          validateTrigger: 'onChange'
      }
        // {
        //     pattern: /^[a-zA-Z0-9_]+$/,
        //     message: '密码必须是字母,数字,下划线组成',
        //     validateTrigger: 'onChange'
        // }
    ]
}

function Login (props) {
    const [form] = Form.useForm('basic')
    console.log(form)
    function submit ({userName, password}) {
      api.login({
        userName, password
      }).then( userInfo => {
        if(!userInfo._id) {
          return
        }
        props.dispatch({
          type: 'initUserInfo',
          payload: userInfo
        })
        store.set(user, userInfo)
        props.history.replace('/home')
        message.success('登录成功!')
      })
        
    }


    return (
        <div>
          <header className="header">
            <img className="logo" src={logo} />
            <h1>校享享校园平台管理系统</h1>
            <div className="react-based">
            <span>React-based construction</span>
            <img src={moduleName} alt=""/>
            </div>
          </header>
    
          <div className="content">
              <h2>用户登录</h2>
            <Form name="basic" onFinish={submit}>
              <Form.Item
                name="userName"
                // initialValue="tom"
                rules={rules.userName}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="account：karry"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={rules.password}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="password：11111111"
                />
              </Form.Item>
    
              <Form.Item>
                  <div className="submit-btn-wrap">
                      <Button type="primary"  htmlType="submit">
                      登录
                  </Button>
                  </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
}



export default connect()(Login)
