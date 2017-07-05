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
                {title : "이메일"},
                {title : "비밀번호"},
                {title : "비밀번호 확인"}
            ]
        }
    }

    componentDidMount(){
        document.querySelector("div > button").addEventListener('click', (event) => {
            event.target.style.background = "lightseagreen";
            event.target.style.color = "white";  
        });
    }

    render(){
        return(
            <div className={styles.inputContent}>
                <InputHeader now={"기본 정보"} />
                {this.state.InputForms.map((inputForm, index)=>{
                    return <GeneralInputForm inputname={inputForm.title} key={index}/>
                })}
                <button id={styles.nextBtn} type="button">인적 사항</button>
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