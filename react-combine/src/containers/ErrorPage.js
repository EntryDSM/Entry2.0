import React, { Component } from 'react';
import '../css/ErrorPage.css';

class ErrorPage extends Component{
    render(){
        return(
            <div id = "error-page">
                <ErrorHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <ErrorMain ImgUrl1 = {require('../images/warning.png')}
                           ImgUrl2 = {require('../images/monitor.png')}
                           title1 = "Error!"
                           title2 = " 잘못된 접근입니다! "/>
            </div>
        );
    }
}

const ErrorHeader = (props) => {
    return(
        <div id = "errorHeader">
            <img src = {props.ImgUrl} alt = "logo" id = "logo"/>
        </div>
    );
}

const ErrorMain = (props) => {
    return(
        <div>
            <img src = {props.ImgUrl1} alt = "img" id = "warningImg"/>
            <h1> {props.title1} </h1>
            <h2> "{props.title2}" </h2>
        </div>
    );
}

export default ErrorPage;