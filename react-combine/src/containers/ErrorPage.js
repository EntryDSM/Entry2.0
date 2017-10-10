import React, { Component } from 'react';
import '../css/ErrorPage.css';
import {Link} from 'react-router';
import 'babel-polyfill';

class ErrorPage extends Component{
    render(){
        return(
            <div id = "error-page">
                <ErrorHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <ErrorMain ImgUrl1 = {require('../images/warning.png')}
                           ImgUrl2 = {require('../images/monitor.png')}
                           title1 = "Error!"
                           title2 = " 잘못된 접근입니다! "
                           title3 = "로그인 혹은 회원가입을 해주세요."/>
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
            <h3> -{props.title3}- </h3>
            <LoginOrSignUp ImgUrl = {require('../images/login.png')}
                           links = {
                               [
                                   {
                                       "linkName" : "로그인",
                                       "router" : "/signin"
                                   },
                                   {
                                       "linkName" : "회원가입",
                                       "router" : "/signup"
                                   }
                               ]
                           }/>
        </div>
    );
}

const LoginOrSignUp = (props) => {
    return(
        <div id = "routerCover">
            <img src = {props.ImgUrl} alt = "img"/>
            {props.links.map((info, i) => {
                return(
                    <Link to = {info.router} key = {i} className = "links">
                        {info.linkName}
                    </Link>
                );
            })}
        </div>
    );
}

export default ErrorPage;