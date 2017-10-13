import React, {Component} from 'react';
import Process from './Process';
import {browserHistory} from 'react-router';

class Sidebar extends Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    toMain(){
        browserHistory.push('/main');
    }

    render(){
        return(
            <div className = "menu_area">
                <Logo onclick={this.toMain.bind(this)} />
                <Process 
                    moveClassification={this.props.moveClassification}
                    moveInfoinput={this.props.moveInfoinput}
                    moveGradeinput={this.props.moveGradeinput}
                    moveIntroduce={this.props.moveIntroduce}/>
            </div>
        );
    }
}

const Logo = (props) => {
    return (
        <div className="logo_area" onClick={props.onclick}>
            <img src= {require('../images/nav-logo.png')} alt="nav-logo" className="LogoImage" />
        </div>
    );
}

export default Sidebar;