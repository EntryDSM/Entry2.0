import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input3.css';
import GradeInput from './GradeInput/GradeInput';
import Volunteer from './Volunteer/Volunteer';
import Attend from './Attend/Attend';
import GTinfo from './GTinfo/GTinfo';
import InputLayout from '../InputLayout/InputLayout';

class Input3 extends Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div id={styles.wrapper}>
                <InputLayout id={styles.sidebar}/>
                <div id={styles.contents}>
                    <div className={styles.inputTitle}>
                        <InputHeader now={"성적 입력"} />
                    </div>
                    <GTinfo />
                    <GradeInput />
                    <Volunteer />
                    <Attend />
                </div>
            </div>
        );
    }

    componentDidMount(){
        var buttons = document.querySelectorAll('table > tbody > tr > td > div');
        Array.from(buttons).forEach((btn, index) => {
            btn.addEventListener('click', () => {
                Array.from(btn.parentElement.children).forEach((children) => {
                    children.style.background = "none";
                });
                btn.style.background = '#87CEEB';
            });
        })
    }
}

export default Input3;