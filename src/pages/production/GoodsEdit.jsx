import {Button, Form, Input, message, Select, Tag, Upload} from 'antd'
import React from 'react'
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import api from '../../api';
import config from '../../config/config'
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import {EditorState, convertToRaw, ContentState} from 'draft-js'
// import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
let Item = Form.Item

let rules = {
    title: [
        {
            required: true,
            message: '内容不能为空'
        }
    ],
    desc: [
        {
            required: true,
            message: '内容不能为空'
        }
    ],
    price: [
        {
            required: true,
            message: '内容不能为空'
        },
        {
            validator(rule, val) {
                if(Number(val) > 0) {
                    return Promise.resolve()
                } else {
                    return Promise.reject('价格要为正数')
                }
            }
        }
    ],
    
}

export default class GoodsEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: '',
            types: [],
            imgList: [],
            submitImgList: [],
            previewImg: '',
            editorState: ''
        }
        let state = this.state
        // var html = '<p>html!!!</p>'
        // if(html) {
        //     let contentBlock = htmlToDraft(html)
        //     let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        //     let editorState = EditorState.createWithContent(contentState)
        //     state.editorState = editorState
        // } else {
        //         state.editorState = EditorState.createEmpty()
        // }
    }

    statusChange(value) {
        // this.set
    }

    

    addTag() {
        this.setState({
            showModal: 'addTag'
        })
    }

    closeModal() {
        this.setState({
            showModal: '',
            previewImg: ''
        })
    }

    uploadChange = ({fileList, file, event}) => {
        if(file.status == 'removed') {
            let index = this.state.submitImgList.findIndex( url => url == file.url)
            index > -1 && this.state.submitImgList.splice(index, 1)
            this.setState({
                imgList: [...fileList],
            })
            return
        }
        let newFile = fileList[fileList.length - 1]
        if(newFile.status === 'done') {
            let url = newFile.response.data
            this.state.submitImgList.push(url)
            this.setState({
                imgList: [...this.state.imgList, {
                    status: 'done',
                    url,
                    uid: url
                }]
            })
        }
       
    }

    removeImg(img) {
        console.log(img)
    }

    componentDidMount() {
        api.getTypes({
            params: {
                type: 'goods'
            }
        }).then( res => {
            this.setState({
                types: res
            })
        })
        let imgs = this.props.location.query.imgs
        this.initImgList(imgs)
       

    }

    initImgList(imgs) {
        let imgList = imgs.map( img => ({
            status: 'done',
            url: img,
            uid: img
        }))
        this.setState({
            imgList,
            submitImgList: imgs
        })
    }

    submitForm = (form) => {
        let {_id} = this.props.location.state
        console.log(this.state.submitImgList, form)        
        let data = {
            title: form.title,
            desc: form.desc,
            price: form.price,
            tags: form.tags,
            type: form.type,
            imgs: this.state.submitImgList,
            removed: form.removed
        }
        api.putGoods({
            data,
            params: {
                goodsId: _id
            }
        }).then( res => {
            message.success('修改成功')
        })
        // console.log(this.getRichText())
    }

    previewImg = (file) => {
        this.setState({
            showModal: 'previewImg',
            previewImg: file.url || file.thumbUrl
        })
    }

    // getRichText() {
    //     return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    // }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    render() {
        
        let {tags, price, title, desc, created, imgs, removed, type} = this.props.location.query
        let {imgList, editorState} = this.state
        return (
            <div>
              <Form onFinish={this.submitForm} labelCol={ {span: 2} }
  wrapperCol={ {span: 10} } >
                <Item name="title" rules={rules.title} initialValue={title} label="商品名称">
                    <Input />
                </Item>
                <Item  rules={rules.desc} name="desc" initialValue={desc} label="商品描述">
                    <Input.TextArea />
                </Item>
                <Item name="created" initialValue={moment(Number(created)).format('YYYY-MM-DD HH:mm')} label="上架时间">
                    <Input disabled />
                </Item>
                <Item name="removed" initialValue={Number(removed)} label="商品状态">
                    <Select onChange={this.statusChange} >
                        <Select.Option  value={0}>
                            售卖中
                        </Select.Option>
                        <Select.Option value={1}>
                            下架
                        </Select.Option>
                    </Select>
                </Item>
                <Item initialValue={price} rules={rules.price} label="价格" name="price">
                    <Input suffix="￥" />
                </Item>
                <Item name="tags" initialValue={tags} label="标签">
                    {tags.map( (tag, index) => <Tag key={index} closable onClose={this.delTag}>
                        {tag}
                    </Tag>)}
                    <Tag style={{cursor: 'pointer'}} color="blue" onClick={this.addTag.bind(this)}>
                        +添加标签
                    </Tag>
                </Item>
                <Item name="type" label="分类" initialValue={type._id}>
                   <Select initialValue={type.name}>
                        {this.state.types.map( type => (
                            <Select.Option key={type._id} value={type._id}>
                            {type.name}
                        </Select.Option>
                        ))}
                    </Select>
                </Item>
                <Item name="imgs" initialValue={imgs} label="商品图片">
                    <Upload onPreview={this.previewImg} listType="picture-card" fileList={imgList}
                    onChange={this.uploadChange} onRemove={this.removeImg} action={config.uploadUrl}>
                           <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                              <span style={{fontSize: 40}}>
                                +
                              </span>
                              <span>
                                  添加图片
                              </span>
                           </div>
                    </Upload>
                </Item>
               
                {/* <Item label="商品描述" rules={rules.desc}  initialValue={desc}>
                <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid black', padding: 10, minHeight: 200}}
                onEditorStateChange={this.onEditorStateChange}
                />
                </Item>       */}

                <Item >
                    <Button htmlType="submit">
                        保存修改
                    </Button>
                </Item>
              </Form>

              <Modal visible={this.state.showModal == 'previewImg'} onCancel={this.closeModal.bind(this)} footer={false}>
                  <img  src={this.state.previewImg} style={{width: '100%', height: 'auto'}} alt=""/>
                  </Modal>           
              <Modal title="新建标签" onCancel={this.closeModal.bind(this)} visible={this.state.showModal == 'addTag'}>
                    <Input placeholder="请输入标签名" />
              </Modal>
            </div>
        )
    }
}
