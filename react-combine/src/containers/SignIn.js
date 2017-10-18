import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import {signInData} from '../actions';
import {browserHistory, Link} from 'react-router';
import 'babel-polyfill';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../css/FormIndex.css';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    setEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    setPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    signInSubmit(){
        axios({
            method: 'post',
            url: '/api/signin',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response)
            browserHistory.push('/mypage');
        }).catch(error => {
            if(error.response.status === 401){
                alert("잘못된 정보를 입력하셨습니다.");
            } else if(error.response.status === 500) {
                alert("서버에 에러가 발생했습니다. 잠시후에 재접속해주세요.");
            }
        })
    }

    render(){
        return(
            <div id="login-form">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "Sign-In Page"/>
                <div id="LoginBox">
                    <LoginForm
                        inputArray = {this.props.inputArray}
                        setEmail = {this.setEmail.bind(this)}
                        setPassword = {this.setPassword.bind(this)}
                        onclick = {this.signInSubmit.bind(this)}/>
                </div>
                <LoginSubBox hTitle = "아직 원서접수를 안하셨나요?"
                             aTitle = "원서접수 하러 가기"/>
            </div>
        );  
    }
}
SignIn.defaultProps = {
    inputArray: [
        {
            InfoTitle: "이메일(Email)",
            InputTitle: "이메일을 입력해주세요.",
            Type: "email"
        },
        {
            InfoTitle: "비밀번호(Password)",
            InputTitle: "비밀번호를 입력해주세요.",
            InputType: "password",
            aText: "Forgot Password?"
        }
    ]
}

const LoginForm = (props) => {
    let setEvent = function(index){
        switch(index){
            case 0: return props.setEmail;
            case 1: return props.setPassword;
            default: break;
        }
    }
    return (
        <div id="LoginForm">
            {props.inputArray.map((info, i) => {
                return (
                    <div key={i}>
                        <h2>
                            {info.InfoTitle}
                            <a href="#">
                                {info.aText}
                            </a>
                        </h2>
                        <input 
                            type={info.InputType} 
                            className="MainInput"
                            placeholder={info.InputTitle}
                            onChange={setEvent(i)}/>
                    </div>
                );
            })}
            <LoginButton onclick = {props.onclick} />
        </div>
    );
}

const LoginButton = (props) => {
    return (
        <div id="LoginButton" onClick={props.onclick}>
            <LoginText text="Sign In" />
        </div>
    );
}

const LoginText = (props) => {
    return (
        <div id="LoginText">
            {props.text}
        </div>
    );
}

const LoginSubBox = (props) => {
    return(
        <div id="LoginSubBox">
            <h3> {props.hTitle} </h3>
            <Link to="/signup">
                {props.aTitle}
            </Link>
            <a href="#">  </a>
        </div>
    );
}

export default SignIn;