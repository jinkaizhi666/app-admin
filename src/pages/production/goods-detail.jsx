import { Button, Tag, Affix } from 'antd'
import moment from 'moment';
import React, { Component } from 'react'

let left = {
    display: 'block',
    width: 200,
    fontSize: 16,
    paddingBottom: 10
}
let li = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0'
}
export default class GoodsDetail extends Component {
    render() {
        let {imgs, desc, tags, type, sellerId, title,created, removed} = this.props.location.query
        return (
            <div>
                <ul style={{marginLeft: 20}}>
                    <li style={li}>
                    <span style={left}>
                        商品标题
                    </span>
                    <span>{title}</span>
                    </li>
                    <li style={li}>
                    <span style={left}>
                        商品描述
                    </span>
                    <span>{desc}</span>
                    </li>
                    <li style={li}>
                    <span style={left}>
                        上架时间
                    </span>
        <span>{moment(Number(created)).format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                    <li style={li}>
                    <span style={left}>
                        商品状态
                    </span>
                    <span>{removed == 0 ? '售卖中' : '已下架'}</span>
                    </li>
                   
                    <li style={li}>
                    <span style={left}>
                        发布人
                    </span>
                    <span style={{paddingRight: 10}}>{sellerId.userName}</span>
                    <Button >查看详细信息</Button>
                    </li>
                    
                    <li style={li}>
                    <span style={left}>
                        标签
                    </span>
                     <span>{tags.map( (tag,index) => <Tag key={index}>{tag}</Tag>)}</span>
                    </li>

                    <li style={li}>
                    <span style={left}>
                        分类
                    </span>
                    <span>{type.name}</span>
                    </li>

                    <li style={li}>
                    <span style={left}>
                        商品图片
                    </span>
                    <div>  
                        {imgs.map( (img, index) => <img key={index} src={img} style={{width: 100, margin: 10}} />)}
                    </div>
                    </li>
                </ul>


            
            </div>
        )
    }
}
