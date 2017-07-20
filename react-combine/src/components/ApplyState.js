import React, { Component } from 'react';
import GoogleChart from 'google-chart-react';

class ApplyState extends Component {
    constructor() {
        super();
        window.googleChartReactPackages = ['corechart'];
        this.state={
            chartIDs : []
        }

        this.drawPieChart = this.drawPieChart.bind(this);
    }

    componentDidMount(){
        setTimeout(function(){
            console.log('Hello world');
        },5000)
    }

    drawPieChart(chartID) {
        var typeData = [
            ['전형', '지원자 수'],
            ['일반전형', 189],
            ['마이스터 인재 전형', 53],
            ['사회 통합 전형', 43],
            ['국가 유공자 전형', 6]
        ];

        var options = {
            title: '전형별 지원자 수',
            fontSize: 30,
            legend: { position: '', textStyle: { color: '#999', fontSize: 16 } },
            chartArea: { width: "80%", height: "80%", left: "10%", top: "5%" },
            colors: ['#1fcecb', '#ec4863', '#ffda66', '#a73e5c'],
        };

        console.log(this.state.chartIDs.length);

        if(this.state.chartIDs.length < 2){
            this.setState({
                chartIDs : this.state.chartIDs.push(chartID)
            })
        }

        console.log(this.state.chartIDs);

        var data = new window.google.visualization.arrayToDataTable(typeData);
        var chart = new window.google.visualization.PieChart(document.getElementById(chartID));
        chart.draw(data, options);
    }

    render() {
        return (
            <section id="apply-state">
                <div id="charts" style={{ backgroundColor: "#cadeff" }}>
                    <h1>접수 현황</h1>
                    <GoogleChart drawChart={this.drawPieChart} className="charts"/>
                    <GoogleChart drawChart={this.drawPieChart} className="charts"/>
                    
                    {/* <div id="piechart" style={{ width: "calc(100vw / 2)", height: 80 + "vh", display: "inline-block" }}></div> */}
                    {/* <div id="hometown-chart" style={{ width: "calc(100vw / 2)", height: 80 + "vh", display: "inline-block" }}></div> */}
                </div>
            </section>
        )
    }
}

export default ApplyState;