import React from 'react';
import styles from '../css/LoginBox.css';

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
                    Type: "text"
                },
                {
                    InfoTitle: "비밀번호(Password)",
                    InputTitle: "비밀번호를 입력해주세요.",
                    InputType: "password"
                }
            ],
            formsValues: [

            ]
        };

    }
    
    changeValues( number,event ) {
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
                            <h2> {info.InfoTitle} </h2>
                            <input type={info.InputType} className="MainInput"
                                placeholder={info.InputTitle}
                                value={this.state.formsValues[i]}
                                onChange={this.changeValues.bind(this,i)} />
                        </div>
                    );
                })}
                <LoginButton/>
            </div>
        );
    }
}

const LoginButton = () => {
    return (
        <div id="LoginButton">
            <LoginText text="Sign In"/>
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