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
            isChecked: false,
            isPassword: false
        }
        this.getName = this.getName.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getDomain = this.getDomain.bind(this);
    }

    componentDidMount(){
        var point1 = document.getElementById("point_step1");
        var point2 = document.getElementById("point_step2");
        var point3 = document.getElementById("point_step3");
        var point4 = document.getElementById("point_step4");
        var point5 = document.getElementById("point_step5");
        var point6 = document.getElementById("point_step6");
        var point7 = document.getElementById("point_step7");
        point1.style.fill = "salmon";
        point1.style.stroke = "salmon";
        point2.style.fill = "#B9B4B4";
        point2.style.stroke = "#B9B4B4";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";
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
        console.log(e.target.value.length);
        if(e.target.value.length >= 8){
            this.setState({
                password: e.target.value,
                isPassword: true
            })
        } else {    
            this.setState({
                password: e.target.value,
                isPassword: false
            })
        }
    }

    getCertifyCode(e){
        this.setState({
            certifyCode: e.target.value
        })
    }

    checkPassword(e){
        console.log(e.target.value);
        let pwd = e.target.value + "";
        console.log(pwd.length);
        console.log(e.target.value.length);
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

    canclePersonalAgree(){
        this.setState({
            isChecked: false
        })
    }

    render(){
        return(
            <div id="contents">
                <div id="signUp">
                <InputHeader now={"지원자 정보"} />
                <div className="inputPart">
                    <table id="inputTable">
                        <SignUpInput inputs = {
                            [
                                {
                                    name: '지원자 성명',
                                    type: 'text',
                                    className: 'input_style nameInput',
                                    onchange: this.getName,
                                    value: this.state.name
                                },
                                {
                                    name: '지원자 이메일',
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
                        canclePersonalAgree={this.canclePersonalAgree.bind(this)}
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