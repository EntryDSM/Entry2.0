import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import EmailCertifyModal from '../components/EmailCertifyModal';
import PersonalAgreeModal from '../components/PersonalAgreeModal';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'babel-polyfill';
import '../css/SignUp.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            emailDomain: "naver.com",
            password: "",
            certifyCode: "",
            emailModalIsOpen: false,
            personalAgreeModalIsOpen: false,
            isConfirm: false,
            isChecked: false
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

    getCertifyCode(e){
        this.setState({
            certifyCode: e.target.value
        })
    }

    confirmPassword(e){
        if(this.state.password === e.target.value){
            this.setState({
                isConfirm: true
            })
        } else {
            this.setState({
                isConfirm: false
            })
        }
    }

    closeModal(){
        this.setState({
            emailModalIsOpen: false
        })
    }

    paCheck(){
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    verifyCode(){
        axios({
            method: 'get',
            url: '/api/email/authentication/' + this.state.certifyCode,
            withCredentials: false
        }).then(response => {
            console.log(this.state.certifyCode);
            console.log(response);
            this.setState({
                emailModalIsOpen: false
            })
            browserHistory.push('/classification');
        }).catch(err => {
            this.setState({
                emailModalIsOpen: true
            })
        })
    }

    signUpSubmit(){
        if(this.state.isConfirm && this.state.isChecked){
            this.setState({
                emailModalIsOpen: true
            })        
            axios({
                method:'post',
                url:'/api/signup',
                data: {
                    name: this.state.name,
                    email: this.state.email + '@' + this.state.emailDomain,
                    password: this.state.password
                },
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "http://114.108.135.15",
                    "ContentType": "application/json"
                }
            }).then(response => {
                console.log(response)
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
                this.setState({
                    emailModalIsOpen: false
                })
            });
        } else if(!this.state.isChecked){
            alert("개인정보 활용 동의서에 동의해주세요.");
        } else if(!this.state.isConfirm){
            alert("비밀번호 재확인에 실패했습니다.");
        } else {
            alert("입력을 완료해주세요");
        }
    }

    render(){
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
                                    className: 'input_style',
                                    onchange: this.confirmPassword.bind(this)
                                }
                            ]
                        }/>
                    </table>
                    <EmailCertifyModal 
                        emailModalIsOpen={this.state.emailModalIsOpen}
                        closeModal={this.closeModal.bind(this)}
                        getCertifyCode={this.getCertifyCode.bind(this)}
                        verifyCode={this.verifyCode.bind(this)} />
                    <PersonalAgreeModal 
                        paCheck={this.paCheck.bind(this)}
                        isChecked={this.state.isChecked}/>
                </div>
                <Button onclick={this.signUpSubmit.bind(this)} buttonName="다음"/>
                </div>
            </div>
        );
    }
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

export default SignUp;
//submit = dispatch, SignUp = component