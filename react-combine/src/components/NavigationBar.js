import React, { Component } from 'react';

class NavigationBar extends Component {
    constructor(){
        super();
        this.state ={
            Dday : ''
        }
    }
    componentDidMount(){
        var day = new Date('October 27, 2017 11:59:59');
        var now = new Date();
        this.setState({
            Dday : Math.floor(((parseInt(day.getTime())-parseInt(now.getTime()))/(24*60*60*1000)))
        });
        console.log(((parseInt(day.getTime())-parseInt(now.getTime()))/(24*60*60*1000))/1);
    }
    render() {
        return (
            <nav id="navigation-bar">
                {console.log(this.state.Dday)}
                <span>D - {this.state.Dday}</span>
                {this.props.menuList.map((menu, i) => {
                    return <span key={i}>{ menu }</span>
                })}
        </nav>
        )
    }
}

export default NavigationBar;