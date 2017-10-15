import React, {Component} from 'react';
import Process from './Process';
import {browserHistory} from 'react-router';

class Sidebar extends Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){        
        return(
            <div className = "menu_area">
                <Logo />
                <Process />
            </div>
        );
    }
}

const Logo = () => {
    return (
        <div className="logo_area" onClick={() => {browserHistory.push('/main')}}>
            <img src= {require('../images/nav-logo.png')} alt="nav-logo" className="LogoImage" />
        </div>
    );
}

export default Sidebar;