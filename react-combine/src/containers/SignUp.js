import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import EmailCertifyModal from '../components/EmailCertifyModal';
import {signUpData} from '../actions.js';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/SignUp.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            emailDomain: "naver.com",
            password: ""
        }
        this.getName = this.getName.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getDomain = this.getDomain.bind(this);
    }

    getName(e){
        this.setState({
            name: e.target.value
        })
    }

    getEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    getDomain(e){
        this.setState({
            emailDomain: e.target.value
        })
    }

    getPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    render(){
        const {dispatch} = this.props;
        const {store} = this.context;
        let state = this.state;
        let signUpSubmit = function(){
            console.log('hello');
            if(state.name !== "" && state.email !== "" && state.password !== ""){
                store.dispatch(signUpData(state));
                let storeData = store.getState().signUp.SIGN_UP_DATA;
                axios({
                    method:'post',
                    url:'/api/signup',
                    data: {
                        name: storeData.name,
                        email: storeData.email + "@" + storeData.emailDomain,
                        password: storeData.password
                    },
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "http://114.108.135.15",
                        "ContentType": "application/json"
                    }
                }).then(response => {
                    console.log(response)
                    browserHistory.push('/SignUpSendComplete');
                }).catch((error) => {
                    console.log(error);
                    if(error.response){
                        console.log(error.response);
                    } else if(error.request){
                        console.log(error.request);
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });
            } else if(state.name === "") {
                console.log('enter name');
            } else if(state.email === ""){
                console.log('enter email');
            } else if(state.password === ""){
                console.log('enter password');
            }
        }
        return(
            <div id="contents">
                <div id="signUp">
                <InputHeader now={"기본 정보"} />
                <div className="inputPart">
                    <table id="inputTable">
                        <SignUpInput inputs = {
                            [
                                {
                                    name: '이름',
                                    type: 'text',
                                    className: 'input_style nameInput',
                                    onchange: this.getName,
                                    value: this.state.name
                                },
                                {
                                    name: '이메일',
                                    type: 'text',
                                    className: 'input_style emailInput',
                                    onchange: this.getEmail,
                                    getDomain: this.getDomain
                                },
                                {
                                    name: '비밀번호',
                                    type: 'password',
                                    className: 'input_style',
                                    onchange: this.getPassword,
                                    value: this.state.password
                                },
                                {
                                    name: '비밀번호 확인',
                                    type: 'password',
                                    className: 'input_style'
                                }
                            ]
                        }/>
                    </table>
                    <EmailCertifyModal />
                </div>
                <Button onclick={signUpSubmit} buttonName="다음"/>
                </div>
            </div>
        );
    }
}

SignUp.contextTypes = {
    store: PropTypes.object
}

const SignUpInput = (props) => {
        return(
            <tbody>
                {props.inputs.map((input, index) => {
                    if(index === 1){
                        return  <tr key={index}>
                                    <td className="td_title">{input.name}</td>
                                    <td className="td_content">
                                        <input type={input.type} className={input.className} onChange={input.onchange} value={input.value}/>@
                                        <select className="emailSelect" onChange={input.getDomain}>
                                            {props.emails.map((email, index) => {
                                                return <Options name={email.name} key={index} />
                                            })}
                                        </select>
                                    </td>
                                </tr>
                    } else {
                        return  <tr key={index}>
                            <td className="td_title">{input.name}</td>
                            <td className="td_content">
                                <input type={input.type} className={input.className} onChange={input.onchange} value={input.value}/>
                            </td>
                        </tr>
                    }
                })}
            </tbody>
        );
}

SignUpInput.defaultProps = {
    emails: [
        {name: "naver.com"},
        {name: "gmail.com"},
        {name: "hanmail.net"},
        {name: "hotmail.com"},
        {name: "hanmir.com"},
        {name: "nate.com"},
        {name: "empar.com"},
        {name: "korea.com"}
    ]
}

const Options = (props) => {
    return (
        <option>{props.name}</option>
    );
}

function submit(state){
    return {
        signUp: state.signUp
    }
}

export default connect(submit)(SignUp);
//submit = dispatch, SignUp = component