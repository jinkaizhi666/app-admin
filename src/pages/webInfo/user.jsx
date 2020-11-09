import React, { Component } from 'react'
import Chart from 'echarts-for-react'
export default class User extends Component {
   
    state = {
        option: {}
    }
    init() {
        let option = {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: ['userHot', '日活跃', '月活跃'],
                source: [
                    {userHot: '第一季度', '日活跃': 3300, '月活越': 6722},
                    {userHot: '第二季度', '日活跃': 4300, '月活越': 8722},
                    {userHot: '第三季度', '日活跃': 5600, '月活越': 1022},
                    {userHot: '第四季度', '日活跃': 6600, '月活越': 11122},
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        };
        this.setState({
            option
        })
    }
    componentDidMount() {
        this.init()
    }
    render() {
        return (
            <div>
                <Chart option={this.state.option} />
            </div>
        )
    }
}
