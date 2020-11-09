import React, { Component } from 'react'
import Chart from 'echarts-for-react'

export default class Platform extends Component {
    constructor() {
        super()
        this.state = {
            option: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['h5', '安卓', '小程序', 'ios']
                },
                series: [
                    {
                        name: '流量来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 335, name: 'h5'},
                            {value: 310, name: '小程序'},
                            {value: 234, name: '安卓'},
                            {value: 214, name: 'ios'},
                        ]
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div>
                <Chart option={this.state.option} />
            </div>
        )
    }
}
