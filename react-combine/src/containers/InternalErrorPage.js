import React, {Component} from 'react';
import '../css/InternalErrorPage.css';
import {browserHistory} from 'react-router';

class InternalErrorPage extends Component{
    render(){
        return(
            <div id = "internalError">
                <ErrorHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <ErrorMain text = "500"
                           textExplain = "Server Error"
                           alert = "서버 내부 에러입니다!"/>
            </div>
        );
    }
}

const ErrorHeader = (props) => {
    return(
        <div id = "errorHeader">
            <img src = {props.ImgUrl} alt = "logo" id = "logo" onClick = {browserHistory.push('/main')}/>
        </div>
    );
}

const ErrorMain = (props) => {
    return(
        <div>
            <h1> 
                {props.text}
                <span> {props.textExplain} </span>  
            </h1>
            <h2> {props.alert} </h2>
        </div>
    );
}

export default InternalErrorPage;