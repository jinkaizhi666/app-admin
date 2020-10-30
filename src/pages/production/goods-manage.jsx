import React, { PureComponent } from 'react'
import {Input, Select, Button, Table, Tag} from 'antd'
import {PlusCircleFilled} from '@ant-design/icons'
import api from '../../api/index'
let {Option} = Select

export default class Production extends PureComponent {
    state = {
        data: [],
        keyword: ''
    }

    columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
          },
          {
            title: '产品图',
            dataIndex: 'imgs',
            key: 'imgs',
            render(imgs) {
                return <img style={{width: '100px'}} src={imgs[0]} />
            }
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render(text) {
                return '￥' + text
            }
          },
          {
            title: '状态',
            dataIndex: 'removed',
            key: 'removed',
            render(text) {
                return <Tag>{text === 0 ? '在售' : '已下架'}</Tag>
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (detail, record, index) => {
                return <>
                    <Button onClick={ () => this.props.history.push('/production/manage/detail', this.state.data[index])}>
                        详情
                    </Button>
                    <Button  type="primary" onClick={() => this.props.history.push('/production/manage/edit', this.state.data[index])}>
                    编辑信息
                    </Button>
                </>
            }
          }
    ]

    componentDidMount() {
        api.getGoodsList({
            params: {
                admin: true
            }
        }).then( res => {
            // let data =  res.map(item => ({
            //     imgs: item.imgs,
            //     price: item.price,
            //     title: item.title,
            //     desc: item.desc,
            //     status: item.removed,
            //     key: item._id
            // }))
            this.setState({
                data: res
            })
        })
       
    }

    setKeyword = e => {
        console.log(e)
        this.setState(
            {
                keyword: e.target.value
            }
        )
    }

    searchGoods = () => {
        api.getGoodsList({
            params: {
                keyword: this.state.keyword,
                admin: true
            }
        }).then( res => {
            this.setState({
                data: res
            })
        })
    }

    // shouldComponentUpdate(state) {
    //     if(this.state.data)
    //     return true
    // }

    render() {
        let {data } = this.state
        let columns = this.columns
        return (
            <>
            <div style={{display: 'flex', paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={this.state.keyword} onChange={this.setKeyword} placeholder="请输入搜索内容" />
                <Button type="primary" onClick={this.searchGoods}>
                    搜索
                </Button>
                </div>
                <Button onClick={() => this.props.history.push('/production/manage/edit')} type="primary">
                    <PlusCircleFilled />
                    添加商品
                </Button>
            </div>

            <Table rowKey="_id" dataSource={data} columns={columns} pagination={{ showQuickJumper: true, pageSize: 10, total: data.length}}>

            </Table>
            </>
        )
    }
}

