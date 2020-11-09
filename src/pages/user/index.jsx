import React, { PureComponent } from "react";
import { Button, Table, Popconfirm, Modal, Input, Form, message, Select } from "antd";
import moment from 'moment'
import api from "../../api";

export default class User extends PureComponent {
  state = {
      data: [],
      currentUser: {},
      roleList: null
      
  };
  constructor() {
    super()
    this.form = React.createRef()
  }
  columns = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
    },
    {
        title: "所属角色",
        dataIndex: "roleId",
        key: "roleId",
      },
    {
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      render: time => {
        return moment(Number(time)).format('YYYY-MM-DD HH:mm')
      }
    },
   
  ];

  rules = {
    userName: [
        {
            required: true,
            message: '用户名不能为空'
          }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空'
      },
      {
        min: 8,
        max: 20,
        message: '密码长度要在8到20位'
      },
      {
        partten: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
        message: '密码必须要有数字和字母'
      }
    ],
    repeatPassword: [
       ({getFieldValue }) => ({
        validator(rules, value) {
          if(value === getFieldValue('password')) {
            return Promise.resolve()
          }else {
            return Promise.reject('两次输入的密码不一致')
          }
         }
       }),
       {
        required: true,
        message: '密码不能为空'
      }
    ],
    roleId: [
        {
            required: true,
            message: '所属角色不能为空'
          }
    ]
  }

  addUser = () => {
    this.form.current.validateFields().then( value => {
        api.addUser(value).then( res => {
            message.success('创建用户成功')
            this.closeModal()
            let index = this.state.roleList.findIndex( role => role._id === res.roleId)
            let role = this.state.roleList[index].role
            res.roleId = {
                role
            }
            this.setState({
                data: this.state.data ? this.state.data.concat([this.formatData(res)]) : [this.formatData(res)]
            })
        })

    })
  };

  formatData = data => {
    if(Array.isArray(data)) {
        return data.map( user => ({
            ...user,
            key: user._id,
            roleId: user.roleId.role
        }))
    } else {
        return {
            ...data,
            key: data._id,
            roleId: data.roleId.role
        }
    }
  }

  delUser = () => {
     api.delUser(this.state.currentUser._id).then(res => {
         message.success('删除成功')
         let index = this.state.data.findIndex( user => user._id === this.state.currentUser._id)
         this.state.data.splice(index, 1)
         this.setState({
             data: [...this.state.data]
         })
     })
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    api.getUsers().then( (userList) => {
      this.setState({
        data: this.formatData(userList),
      });
    });
    api.getRoles().then( roleList => {
        this.setState({
            roleList
        })
    })
  };

  closeModal = () => {
    this.setState({
      showModal: "",
    });
  };

  onSelectRow = (rowKey, rowInfo) => {
      console.log(rowKey, rowInfo)
      this.setState({
          currentUser: {...rowInfo[0]}
      })
  }

  onCheck = (checkedKeys) => {
    console.log('checkout', checkedKeys)
    this.setState({
        authKeys: checkedKeys
    })
    }

    onRow = role => {
        return {
            onClick: () => {
                this.setState({
                    currentUser: role
                })
            }
        }
    }

  render() {
    let { data, currentUser } = this.state;
    let { columns } = this;
    return (
      <div>
        <Button type="primary" onClick={() => this.setState({
            showModal: 'addUser'
        })}>
          创建用户
        </Button>
        <Popconfirm
          title="确认删除吗?"
          onConfirm={this.delUser}
          okText="确认"
          cancelText="取消"
          placement="rightTop"
          disabled={this.state.currentUser._id ? false : true}
        >
          <Button disabled={this.state.currentUser._id ? false : true} style={{ marginLeft: 10 }} >
          删除用户
        </Button>
        </Popconfirm>
        
        <Table
          onRow={this.onRow}
          rowKey="_id"
          dataSource={data}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            total: data.length,
          }}
          rowSelection={{
            type: 'radio',
            onChange: this.onSelectRow,
            selectedRowKeys: [currentUser._id]
          }}
        ></Table>

        <Modal
          onOk={this.addUser}
          visible={this.state.showModal == "addUser"}
          onCancel={this.closeModal.bind(this)}
          title="添加用户"
        >
          <Form ref={this.form} wrapperCol={7} >
              <Form.Item label="用户名" rules={this.rules.userName}  name="userName" >
                <Input />
              </Form.Item>
              <Form.Item label="密码" rules={this.rules.password} name="password" >
              <Input type="password" />
              </Form.Item>
              <Form.Item label="确认密码" rules={this.rules.repeatPassword} name="repeatPassword" >
              <Input type="password" />
              </Form.Item>
              <Form.Item name="roleId" rules={this.rules.roleId} initialValue={this.state.roleList && this.state.roleList[0]._id}  label="所属角色">
                <Select >
                    { this.state.roleList && this.state.roleList.map( role => (
                        <Select.Option value={role._id} key={role._id}>
                            {role.role}
                        </Select.Option>
                    ) ) }
                   
                </Select>
              </Form.Item>
          </Form>
        </Modal>
      
        
      </div>
    );
  }
}
