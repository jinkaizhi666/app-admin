import React, { PureComponent } from "react";
import { Button, Tree, Table, Popconfirm, Modal, Input, Form, message } from "antd";
import moment from 'moment'
import api from "../../api";
import menus from '../../config/menuConfig'

export default class Role extends PureComponent {
  state = {
      data: [],
      authKeys: [],
      currentRole: {}
  };
  constructor() {
    super()
    this.roleName = React.createRef()
  }
  columns = [
    {
      title: "角色名称",
      dataIndex: "role",
      key: "role",
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

  addRole = () => {
    this.roleName.current.validateFields().then( values => {
        api.addRole({
            menus: this.state.authKeys,
            role: values.role
        }).then( res => {
            message.success('添加角色成功')
            this.setState({
                data: this.state.data.concat([res])
            })
            this.closeModal()
        }).catch( err => {
            message.error('操作失败')
        })
    })
  };

  delRole = () => {
      let roleId = this.state.currentRole._id
      api.delRole(roleId).then( res => {
          let index = this.state.data.findIndex( role => role._id === roleId)
          this.state.data.splice(index, 1)
          index > -1 && this.setState({
              data: [...this.state.data]
          })
          message.success('删除成功')
      })
  };

  componentDidMount() {
    this.getRoles();
  }

  getRoles = () => {
    api.getRoles().then((rolesList) => {
      this.setState({
        data: rolesList,
      });
    });
  };

  closeModal = () => {
    this.setState({
      showModal: "",
    });
  };

  onSelect = (checkedKeys) => {

  }

  onSelectRow = (rowKey, rowInfo) => {
      console.log(rowKey, rowInfo)
      this.setState({
          currentRole: {...rowInfo[0]}
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
                    currentRole: role
                })
            }
        }
    }

  render() {
    let { data, currentRole } = this.state;
    let defaultMenus = this.state.currentRole.menus
    let { columns } = this;
    console.log(defaultMenus)
    return (
      <div>
        <Button type="primary" onClick={() => this.setState({
            showModal: 'addRole'
        })}>
          创建角色
        </Button>
        <Button disabled={this.state.currentRole._id ? false : true} style={{ marginLeft: 10 }} onClick={() => this.setState({
            showModal: 'watchAuth'
        })}>
           查看权限
        </Button>
        <Popconfirm
          title="确认删除吗?"
          onConfirm={this.delRole}
          okText="确认"
          cancelText="取消"
          placement="rightTop"
          disabled={this.state.currentRole._id ? false : true}
        >
          <Button disabled={this.state.currentRole._id ? false : true} style={{ marginLeft: 10 }} >
          删除角色
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
            selectedRowKeys: [currentRole._id]
          }}
        ></Table>

        <Modal
          onOk={this.addRole}
          visible={this.state.showModal == "addRole"}
          onCancel={this.closeModal.bind(this)}
          title="添加角色"
        >
            <Form ref={this.roleName} name="form" wrapperCol={7}>
                <Form.Item label="角色名" name="role" rules={[
                    {
                        required: true,
                        message: '角色名不能为空'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '角色名长度要在3到12'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <h2>为该角色分配权限</h2>
                <Form.Item>
                <Tree
                checkable
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                treeData={menus}
                />
                </Form.Item>
            </Form>
        </Modal>
        
        <Modal
          onOk={this.closeModal.bind(this)}
          visible={this.state.showModal == "watchAuth"}
          onCancel={this.closeModal.bind(this)}
          title="查看角色权限"
        >
                <Tree
                checkable
                disableCheckbox={true}
                expandedKeys={defaultMenus}
                checkedKeys={defaultMenus}
                treeData={menus}
                />
        </Modal>
        
      </div>
    );
  }
}
