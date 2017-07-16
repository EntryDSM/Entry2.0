import React, {Component} from 'react';
import SignUpInput from '../components/SignUpInput';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/SignUp.css';

class SignUp extends Component{
    render(){
        return(
            <div id="contents">
                <div id="signUp">
                <InputHeader now={"기본 정보"} />
                <div className="inputPart">
                    <table id="inputTable">
                        <SignUpInput inputs={
                            [
                                {
                                    name: '이름',
                                    type: 'text',
                                    className: 'input_style nameInput'
                                },
                                {
                                    name: '이메일',
                                    type: 'text',
                                    className: 'input_style emailInput'
                                },
                                {
                                    name: '비밀번호',
                                    type: 'password',
                                    className: 'input_style'
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
                <Button router="/sendcomplete" buttonName="다음"/>
                </div>
            </div>
        );
    }
}

export default SignUp;