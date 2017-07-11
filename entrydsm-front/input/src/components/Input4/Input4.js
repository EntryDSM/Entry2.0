import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input4.css';
import GradeInput from './GradeInput/GradeInput';
import GED from './GradeInput/GED/GED';
import Volunteer from './Volunteer/Volunteer';
import Attend from './Attend/Attend';
import InputLayout from '../InputLayout/InputLayout';

class Input3 extends Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div id={styles.contents}>
                <InputHeader now={"성적 입력"} />
                <div id={styles.volunteerAttendWrapper}>
                    <Volunteer />
                    <Attend />
                </div>
                <GradeInput />
                <GED />
                <div id={styles.move}>
                    <button className={styles.nextBtn} type="button">이전</button>
                    <button className={styles.nextBtn} type="button">다음</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        var buttons = document.querySelectorAll('.select_grade > div');
        Array.from(buttons).forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if(btn.children.length === 0){
                    Array.from(btn.parentElement.children).forEach((children) => {
                        children.style.background = "none";
                    });
                    btn.style.background = '#d3d3d3';   
                }
            });
        })
    }
}

export default Input3;