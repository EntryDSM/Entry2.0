import React, {Component} from 'react';
import '../css/SignUp.css';
import classnames from 'classnames';

class Input1 extends Component{
    constructor(props){
        super(props);
        this.state = {
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
    }

    render(){
        return(
            <div className="inputContent">
                <InputHeader now={"기본 정보"} />
                <div className="inputPart">
                    <table id="inputTable">
                        <tbody>
                            <tr>
                                <td className="td_title">
                                    이름
                                </td>
                                <td className="td_content">
                                    <input className="input_style nameInput" type='text'/>
                                </td>
                            </tr>
                            <tr>
                                <td className="td_title">
                                    이메일
                                </td>
                                <td className="td_content">
                                    <input className="input_style emailInput" type='text'/>@
                                    <select className="emailSelect">
                                        {this.state.emails.map((email, index) => {
                                            return <Options name={email.name} key={index} />
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="td_title">
                                    비밀번호
                                </td>
                                <td className="td_content">
                                    <input className="input_style" type='password'/>
                                </td>
                            </tr>
                            <tr>
                                <td className="td_title">
                                    비밀번호 확인
                                </td>
                                <td className="td_content">
                                    <input className="input_style" type='password'/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id="nextBtn" type="button">인적 사항</button>
            </div>
        );
    }
}

const Options = () => {
    return (
        <option>{this.props.name}</option>
    );
}

export default Input1;