import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/SignUp.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        }
        this.getName = this.getName.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.submit = this.submit.bind(this);
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

    getPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    submit(){
        axios({
            method:'post',
            url:'http://114.108.135.15:8080/signup',
            data: {
                name: this.state.name,
                email: this.state.email +"@naver.com",
                password: this.state.password
            },
            withCredentials: false,
            headers: {"Access-Control-Allow-Origin": "http://114.108.135.15"}
        }).then(response => {console.log(response)})
        .catch(response => {console.log(response)});
    }

    render(){
        const {dispatch} = this.props;
        const {store} = this.context;
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
                                    onchange: this.getName
                                },
                                {
                                    name: '이메일',
                                    type: 'text',
                                    className: 'input_style emailInput',
                                    onchange: this.getEmail
                                },
                                {
                                    name: '비밀번호',
                                    type: 'password',
                                    className: 'input_style',
                                    onchange: this.getPassword
                                },
                                {
                                    name: '비밀번호 확인',
                                    type: 'password',
                                    className: 'input_style'
                                }
                            ]
                        }/>
                    </table>
                </div>
                <Button onclick={this.submit} router="/SignupSendComplete" buttonName="다음"/>
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
                                        <input type={input.type} className={input.className} onChange={input.onchange}/>@
                                        <select className="emailSelect">
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
                                <input type={input.type} className={input.className} onChange={input.onchange}/>
                            </td>
                        </tr>
                    }
                })}
            </tbody>
        );
}

SignUpInput.defaultProps = {
    emails: [
        {name: "gmail.com"},
        {name: "naver.com"},
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
//signUp = dispatch, SignUp = component