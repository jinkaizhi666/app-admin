import React, { Component, } from "react";
import { Table, Modal, Input, Button, Form, message } from "antd";
import api from "../../api";
import LinkButton from "../../components/link-button";
// 更新类型弹出框
function UpdateModal(props) {
  let { typeName, typeId } = props;
  let [form] = Form.useForm()
  form.setFieldsValue({
    name: typeName
  })
  function handleOk() {
    form.validateFields().then( res =>{
      let name = form.getFieldValue('name')
      if(typeName === name) return
      api.putType({
        type: 'put',
        typeId,
        name
      }).then( res => {
       props.onOk && props.onOk(name);
      })
   
    })
  }
  function handleCancel() {
    props.onCancel && props.onCancel();
  }
  return (
    <Modal
      title="更新数据"
      visible={props.show === "update"}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} >
        <Form.Item name="name" rules={[{
          required: true,
          message: '分类名不能为空'
        }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

// 添加类型的弹出框
function AddModal(props) {
  let { typeName, parent } = props;
  let [form] = Form.useForm();
  function handleOk() {
      console.log(form.current)
        form.validateFields().then(  val => {
            props.onOk && props.onOk({
              name: form.getFieldValue('name'),
              parent
          });
        })
   
  }
  function handleCancel() {
    props.onCancel && props.onCancel();
  }
  return (
    <Modal
      title="添加分类"
      visible={props.show === "add"}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item name="name" rules={[{
            required: true,
            message: '分类名不能为空',
        }]}>
          <Input placeholder="请输入分类名" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default class Catagory extends Component {
  state = {
    data: [],
    modalShow: false,
    parent: "",
    typeName: "",
    typeId: ''
  };

  //表格列设置
  columns = [
    {
      title: "分类名",
      dataIndex: "name",
      key: "typeName",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (text, item) => {
        return (
          <div>
            {!item.parent ? <LinkButton
              onClick={() =>
                this.setState({
                  modalShow: "add",
                  parent: item.key,
                  typeName: item.name,
                })
              }
            >
              添加子分类
            </LinkButton> : null}
            {!item.children ? <LinkButton
              onClick={() =>
                this.setState({
                  typeId: item.key,
                  typeName: item.name,
                  modalShow: "update",
                })
              }
            >
              修改
            </LinkButton> : null}
            <LinkButton onClick={this.delType.bind(this, item)} color="red">删除</LinkButton>
          </div>
        );
      },
    },
  ];

  //获取所有类型
  getTypes() {
    let {category} = this.props
    api.getTypes({
      type: category,
    }).then( goodsTypes => {
        let data = goodsTypes.map( item => {
          return {
            name: item.name,
            parent: item.parent,
            key: item._id
          }
        })
        this.setState({
          data
        })

    });
  }

  componentDidMount() {
    this.getTypes();
  }

  closeModal() {
    this.setState({
      modalShow: ""
      
    });
  }

  //删除分类
  delType(item) {
   let typeId =  item.key
   let data = this.state.data
   let that = this
    function del() {
      api.delType({
        typeId,
        type: 'delete'
      }).then( res => {
          data.forEach( (item, index) =>{
            if(item.key === typeId) {
              data.splice(index, 1)
            }
          })
        that.setState({
          modalShow: '',
          data: [...this.state.data]
        })
      })
    }
    Modal.confirm({
      title: '确认删除?',
      onOk: () => del.call(this)
    })
  }

  //更新类型名字
  update(name) {
    let typeId = this.state.typeId
    function findAndUpdate(data) {
      data.forEach( item =>{
        if(item.key === typeId) {
          item.name = name
        }else if(item.children) {
          findAndUpdate(item.children)
        }
      })
    }
    findAndUpdate(this.state.data)
    this.setState({
       modalShow: ''
    })
    
  }

  // 添加新的类型
  add(formVals) {
    let {category} = this.props
    api.addType({
        type: 'add',
        name: formVals.name,
        parent: category
    }).then( res => {
        this.state.data.push({
            name: res.name,
            key: res._id,
            parent: res.parent
        })
        this.setState({
            modalShow: '',
            parent: '',
            name: '',
            data: [...this.state.data]
        })
        message.success('添加成功')
    })
  }

  render() {
    let { data, parent, typeName, typeId, modalShow } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({
          modalShow: 'add'
        })} type="primary">
          添加一级分类
        </Button>
        <Table columns={this.columns} dataSource={data} />
        <UpdateModal
          typeName={typeName}
          typeId={typeId}
          onCancel={this.closeModal.bind(this)}
          onOk={this.update.bind(this)}
          show={modalShow}
        />
        <AddModal
          parent={parent}
          typeName={typeName}
          onCancel={this.closeModal.bind(this)}
          onOk={this.add.bind(this)}
          show={modalShow}
        />
      </div>
    );
  }
}
