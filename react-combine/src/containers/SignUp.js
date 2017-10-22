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
            confirmPassword: "",
            certifyCode: "",
            emailModalIsOpen: false,
            personalAgreeModalIsOpen: false,
            isConfirm: false,
            isChecked: false,
            isPassword: false,
            selected: true
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
        if(!/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi.test(e.target.value)){
            this.setState({
                name: e.target.value
            })
        } else {
            alert("특수문자는 입력할 수 없습니다.")
        }
    }

    getEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    getDomain(e){
        if(e.target.value === "직접입력"){
            document.querySelector('.emailSelect').style.display = 'none';
            document.getElementById('email_typing').style.display = 'inline-block';
            document.getElementById('email_typing_cancel').style.display = 'inline-block';
            this.setState({
                emailDomain: "",
                selected: false
            })
        } else {
            this.setState({
                emailDomain: e.target.value
            })
        }
    }

    cancelTyping(){
        this.setState({
            emailDomain: "naver.com",
            selected: true
        })
        document.querySelector('.emailSelect').style.display = 'inline-block';
        document.getElementById('email_typing').style.display = 'none';
        document.getElementById('email_typing_cancel').style.display = 'none';
    }

    typingResult(e){
        this.setState({
            emailDomain: e.target.value
        })
    }

    getPassword(e){
        if(e.target.value.length >= 8){
            if(e.target.value !== this.state.confirmPassword){
                this.setState({
                    password: e.target.value,
                    isPassword: true,
                    isConfirm: false
                })
            } else {
                this.setState({
                    password: e.target.value,
                    isPassword: true,
                    isConfirm: true
                })
            }
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

    confirmPassword(e){
        if(this.state.password === e.target.value){
            this.setState({
                confirmPassword: e.target.value,
                isConfirm: true
            })
        } else {
            this.setState({
                confirmPassword: e.target.value,
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
            this.setState({
                emailModalIsOpen: false
            })
            browserHistory.push('/classification');
        }).catch(error => {
            if(error.response.status === 500){
                browserHistory.push('/internalError');
            } else {
                this.setState({
                    emailModalIsOpen: true
                })
            }
        })
    }

    signUpSubmit(){
        if(this.state.isConfirm && this.state.isChecked && this.state.isPassword){
            axios({
                method: 'get',
                url: '/api/email/validation/' + this.state.email + '@' + this.state.emailDomain
            }).then(response => {
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
                    }
                }).then(response => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error);
                    if(error.response.status === 500){
                        browserHistory.push('/internalError');
                    } else {
                        this.setState({
                            emailModalIsOpen: false
                        })
                    }
                });
            }).catch(error => {
                console.log(error);
                if(error.response.status === 400){
                    alert('이미 가입한 이메일입니다. 로그인을 해주세요');
                } else if(error.response.status === 500) {
                    browserHistory.push('/internalError');
                }
            })
        } else if(!this.state.isChecked){
            alert("개인정보 활용 동의서에 동의해주세요.");
        } else if(!this.state.isConfirm){
            alert("비밀번호와 비밀번호 확인에 입력한 값이 다릅니다");
        } else if(!this.state.isPassword){
            alert("비밀번호는 8자리 이상으로 설정해주세요");
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
        console.log(this.state);
        return(
            <div id="contents">
                <div id="signUp">
                <InputHeader now={"지원자 정보"} />
                <p style={{
                    marginLeft: 20,
                    marginBottom: 5,
                    fontSize: 12
                }}>이 정보는 원서수정 및 조회시에 사용되며 수정이 불가능합니다.</p>
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
                                    getDomain: this.getDomain,
                                    typingResult: this.typingResult.bind(this),
                                    cancelTyping: this.cancelTyping.bind(this)
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
                        }
                        typingResult={this.typingResult.bind(this)}
                        cancelTyping={this.cancelTyping.bind(this)}
                        selected={this.state.selected} />
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
    console.log(props);
    let selected = props.selected;
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
                                                if(!selected && index === 0){                                                 
                                                    return <Options name={email.name} key={index} selected={true}/>
                                                } else {
                                                    return <Options name={email.name} key={index} selected={false}/>
                                                }
                                            })}
                                        </select>
                                        <input type="text" id="email_typing" onChange={props.typingResult}/>
                                        <button id="email_typing_cancel" onClick={props.cancelTyping}>X</button>
                                    </td>
                                </tr>
                    } else if(index === 2) {
                        return  <tr key={index}>
                            <td className="td_title">{input.name}</td>
                            <td className="td_content">
                                <input type={input.type} className={input.className} onChange={input.onchange} value={input.value}/>
                                <span style={{fontSize: 5}}>8자리 이상 입력</span>
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
        {name: "korea.com"},
        {name: "직접입력"}
    ]
}

const Options = (props) => {
    return (
        <option selected={props.selected}>{props.name}</option>
    );
}

export default SignUp;
//submit = dispatch, SignUp = component