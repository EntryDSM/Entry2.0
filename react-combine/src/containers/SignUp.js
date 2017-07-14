import React, {Component} from 'react';
import '../css/SignUp.css';
import SignUpInput from '../components/SignUpInput';
import InputHeader from '../components/InputHeader';

class Input1 extends Component{
    render(){
        return(
            <div id="contents">
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
                <button id="nextBtn" type="button">인적 사항</button>
            </div>
        );
    }
}

export default Input1;