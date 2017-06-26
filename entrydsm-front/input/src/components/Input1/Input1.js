import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import InputLayout from '../InputLayout/InputLayout';
import styles from './Input1.css';

class Input1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            InputForms : [
                {title : "이름"},
                {title : "이매일"},
                {title : "비밀번호"},
                {title : "비밀번호 확인"}
            ]
        }
    }

    render(){
        return(
            <div>
                <InputLayout  />
                <div>
                    <InputHeader now={"기본 정보"} />
                    {this.state.InputForms.map((inputForm, index)=>{
                        return <GeneralInputForm inputname={inputForm.title} key={index}/>
                    })}
                    <button type="button">이메일 인증</button>
                    <button type="button">인적 사항</button>
                </div>
            </div>
        );
    }
}

class GeneralInputForm extends Component{
    render(){
        return (
            <div className={styles.generalInput}>{this.props.inputname}<input className={styles.InputTitle} type='text'/></div>
        );
    }
}

export default Input1;