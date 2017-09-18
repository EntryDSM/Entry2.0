import React, { Component } from 'react';
import '../css/ErrorPage.css';

class ErrorPage extends Component{
    render(){
        return(
            <div id = "error-page">
                <ErrorHeader ImgUrl = {require('../images/DSM Logo.png')}/>
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

export default ErrorPage;