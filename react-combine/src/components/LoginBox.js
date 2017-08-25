import React from 'react';
import styles from '../css/LoginBox.css';
import axios from 'axios';

class LoginBox extends React.Component {

    render() {
        return (
            <div id="LoginBox">
                <LoginForm />
            </div>
        );
    }
}


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputArray: [
                {
                    InfoTitle: "이름(Name)",
                    InputTitle: "이름을 입력해주세요.",
                    Type: "text"
                },
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
            ],
            formsValues: [

            ]
        };

        this.Authentication = this.Authentication.bind(this);
    }
    Authentication() {
        axios({
            method: "POST",
            url: "http://localhost:8080/signup",
            data: {
                name: this.state.inputArray[0],
                email: this.state.inputArray[1],
                password: this.state.inputArray[2]
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080"
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    }
    changeValues(number, event) {
        let val = this.state.formsValues;
        val[number] = event.target.value;
        this.setState({
            formsValues: val
        });
        console.log(this.state.formsValues);
    }

    render() {
        return (
            <div id="LoginForm">
                {this.state.inputArray.map((info, i) => {
                    return (
                        <div key={i}>
                            <h2>
                                {info.InfoTitle}
                                <a href="#">
                                    {info.aText}
                                </a>
                            </h2>
                            <input type={info.InputType} className="MainInput"
                                placeholder={info.InputTitle}
                                value={this.state.formsValues[i]}
                                onChange={this.changeValues.bind(this, i)} />
                        </div>
                    );
                })}
                <LoginButton onClick={this.Authentication} />
            </div>
        );
    }
}

const LoginButton = (props) => {
    return (
        <div id="LoginButton" onClick={props.onClick}>
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
export default LoginBox;