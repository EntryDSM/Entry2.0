import React, { Component } from 'react';

class NavigationBar extends Component {
    render() {
        return (
            <nav id="navigation-bar">
                {console.log(this.props.menuList)}
                {this.props.menuList.map((menu, i) => {
                    return <span key={i}>{ menu }</span>
                })}
        </nav>
        )
    }
}

export default NavigationBar;