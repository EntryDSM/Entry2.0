import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import {connect} from 'react-redux';
import {signInData} from '../actions';
import {browserHistory} from 'react-router';
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
        let store = this.context.store;
        store.dispatch(signInData(this.state));
        let storeData = store.getState().signIn.SIGN_IN_DATA;
        axios({
            method: 'post',
            url: '/api/signin',
            data: {
                email: storeData.email,
                password: storeData.password
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response)
            browserHistory.push('/classification');
        }).catch((error) => {
            console.log(error.config);
            console.log(error);
            console.log(error.response);
            console.log(error.request);
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
SignIn.contextTypes = {
    store: PropTypes.object
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
            <a href="#"> {props.aTitle} </a>
        </div>
    );
}

function signInSubmit(state){
    signInData: state.signInData
}

export default connect(signInSubmit)(SignIn);