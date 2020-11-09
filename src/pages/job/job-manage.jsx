import React, { PureComponent } from 'react'
import {Input, Select, Button, Table, Tag} from 'antd'
import {PlusCircleFilled} from '@ant-design/icons'
import api from '../../api/index'

export default class JobManage extends PureComponent {
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
            title: '工作描述',
            dataIndex: 'desc',
            key: 'desc',
          },
          {
            title: '工资',
            dataIndex: 'salary',
            key: 'salary',
            render(text) {
                return '￥' + text
            }
          },
          {
            title: '状态',
            dataIndex: 'removed',
            key: 'removed',
            render(text) {
                return <Tag>{text === 0 ? '进行中' : '已结束'}</Tag>
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (detail, record, index) => {
                return <>
                    <Button onClick={ () => this.props.history.push({
                        pathname: '/job/manage/detail',
                        query: this.state.data[index]
                    } )}>
                        详情
                    </Button>
                    <Button  type="primary" onClick={() => this.props.history.push({
                        pathname: '/job/manage/edit',
                        query: this.state.data[index]
                    } )}>
                    编辑信息
                    </Button>
                </>
            }
          }
    ]

    componentDidMount() {
        api.getJobList({
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

    searchJob = () => {
        api.getJobList({
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
                <Button type="primary" onClick={this.searchJob}>
                    搜索
                </Button>
                </div>
                {/* <Button onClick={() => this.props.history.push('/production/manage/edit')} type="primary">
                    <PlusCircleFilled />
                    添加商品
                </Button> */}
            </div>

            <Table rowKey="_id" dataSource={data} columns={columns} pagination={{ showQuickJumper: true, pageSize: 10, total: data.length}}>

            </Table>
            </>
        )
    }
}

