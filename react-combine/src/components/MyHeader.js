import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class MyHeader extends Component{
    render(){
        return(
            <header>
                <div id = "pageTitle">
                    {this.props.PageTitle}
                </div>
                <LogoCover MyLogo = {require("../images/logo.png")}
                           LogoText = "DaeDeok SoftWare Meister HighSchool"/>
            </header>
        );
    }
}

const LogoCover = (props) => {
    return(
        <div id = "logoCover" onClick={() => {browserHistory.push("/main")}}>
            <img src = {props.MyLogo} id = "myLogo" alt = "myPageLogo"/>
            <div id = "logoText">
                {props.LogoText}
            </div>
        </div>
    );
}

export default MyHeader;