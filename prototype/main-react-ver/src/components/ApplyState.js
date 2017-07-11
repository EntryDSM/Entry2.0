import React, { Component } from 'react';

class ApplyState extends Component {
    componentDidMount() {
        // google.charts.load('current', { 'packages': ['corechart'] });
        // google.charts.setOnLoadCallback(this.drawChart);
    }

    render() {
        return (
            <section id="apply-state">
                <div id="charts" style={{ backgroundColor: "#cadeff" }}>
                    <h1>접수 현황</h1>
                    <div id="piechart" style={{ width: "calc(100vw / 2)", height: 80+ "vh", display: "inline-block" }}></div>
                    <div id="hometown-chart" style={{ width: "calc(100vw / 2)", height: 80+ "vh", display: "inline-block" }}></div>
                </div>
            </section>
        )
    }
}

export default ApplyState;