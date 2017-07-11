import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import InputLayout from '../InputLayout/InputLayout';
import styles from './Input1.css';
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
                {name: "korea.com"},
            ]
        }
    }

    render(){
        return(
            <div className={styles.inputContent}>
                <InputHeader now={"기본 정보"} />
                <div className={styles.inputPart}>
                    <table id={styles.inputTable}>
                        <tbody>
                            <tr>
                                <td className={styles.td_title}>
                                    이름
                                </td>
                                <td className={styles.td_content}>
                                    <input className={classnames(styles.input_style, styles.nameInput)} type='text'/>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.td_title}>
                                    이메일
                                </td>
                                <td className={styles.td_content}>
                                    <input className={classnames(styles.input_style, styles.emailInput)} type='text'/>@
                                    <select className={styles.emailSelect}>
                                        {this.state.emails.map((email, index) => {
                                            return <Options name={email.name} key={index} />
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.td_title}>
                                    비밀번호
                                </td>
                                <td className={styles.td_content}>
                                    <input className={styles.input_style} type='password'/>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.td_title}>
                                    비밀번호 확인
                                </td>
                                <td className={styles.td_content}>
                                    <input className={styles.input_style} type='password'/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id={styles.nextBtn} type="button">인적 사항</button>
            </div>
        );
    }
}

class Options extends Component{
    render(){
        return (
            <option>{this.props.name}</option>
        );
    }
}

export default Input1;