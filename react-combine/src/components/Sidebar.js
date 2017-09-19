import React from 'react';
import Process from './Process';

class Sidebar extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div className = "menu_area">
                <Logo />
                <Process 
                    moveClassification={this.props.moveClassification}
                    moveInfoinput={this.props.moveInfoinput}
                    moveGradeinput={this.props.moveGradeinput}
                    moveIntroduce={this.props.moveIntroduce}/>
            </div>
        );
    }
}

const Logo = () => {
    return (
        <div className="logo_area">
            <img src= {require('../images/nav-logo.png')} alt="nav-logo" className="LogoImage" />
        </div>
    );
}

export default Sidebar;