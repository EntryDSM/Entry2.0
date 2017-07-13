import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input4.css';
import GradeInput from './GradeInput/GradeInput';
import GED from './GradeInput/GED/GED';
import Volunteer from './Volunteer/Volunteer';
import Attend from './Attend/Attend';
import InputLayout from '../InputLayout/InputLayout';

class Input4 extends Component{
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
        let willSelectGradeBtn = Array.from(document.querySelectorAll('.will_select_grade > .will_select_grade_child'));
        let didSelectGradeBtn = Array.from(document.querySelectorAll('did_select_grade > .did_select_grade_child'));
        let willNotPass = Array.from(document.querySelectorAll('#will_not_pass > td'));
        let didNotPass = Array.from(document.querySelectorAll('#did_not_pass > td'));
        let willSubjects = Array.from(document.querySelectorAll('.will_subjects'));
        let didSubjects = Array.from(document.querySelectorAll('.did_subjects'));

        console.log(willSelectGradeBtn);
        willSelectGradeBtn.forEach((button, index) => {
            button.addEventListener('click', () => {
                
            });
        });
    }
}

export default Input4;