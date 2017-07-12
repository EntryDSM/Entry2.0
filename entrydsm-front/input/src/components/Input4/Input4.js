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

        //미이수 여부 체크
        let buttons = Array.from(document.querySelectorAll('.select_grade > .btn_group_child'));
        let wholeNotPassCheck = document.getElementsByName('whole_checkbox');
        
        // function fadeIn(element){
        //     var i = 0.01;
        //     let intervalId = setInterval(() => {
        //         var num = 1 - i;
        //         element.opacity = num;
        //         i += 0.01
        //         if(num <= 0.5){
        //             clearInterval(intervalId);
        //         }
        //     }, 10)
        // }

        // function fadeOut(element){
        //     var i = 0.01;
        //     let intervalId = setInterval(() => {
        //         var num = 0.5 + i;
        //         element.opacity = num;
        //         i += 0.01
        //         if(num >= 1){
        //             clearInterval(intervalId);
        //         }
        //     }, 10)
        // }

        Array.from(wholeNotPassCheck).forEach((parentCheckbox, index) => {
            let num = 3;
            let childrenCheckboxs = [];
            let count = 0;

            for(num; num<10; num++){
                childrenCheckboxs.push(Array.from(document.querySelectorAll('#graduate_to_be_table > tr:nth-of-type(' + num + ') > td > div > input'))[index]);
            }

            parentCheckbox.addEventListener('click', () => {
                childrenCheckboxs.forEach((check) => {
                    if(parentCheckbox.checked){
                        check.checked = true;
                        check.parentElement.parentElement.style.background = "#d3d3d3";
                    } else {
                        check.checked = false;
                        check.parentElement.parentElement.style.background = "none";
                    }
                });
            })

            childrenCheckboxs.forEach((check) => {
                check.addEventListener('click', () => {
                    if(parentCheckbox.checked){
                        parentCheckbox.checked = false;
                    }
                    childrenCheckboxs.forEach((checkbox) => {
                        if(checkbox.checked === true){
                            checkbox.parentElement.parentElement.style.background = "#d3d3d3";
                            count++;
                        } else {
                            checkbox.parentElement.parentElement.style.background = "none";
                        }
                    })
                    if(count === 7) parentCheckbox.checked = true;
                    count = 0;
                })
            })
        })

        //버튼 눌렀을 시에 색상 변경
        buttons.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                let overlapCheck = false;
                if(btn.style.background == 'rgb(211, 211, 211)'){
                    overlapCheck = true;
                }
                Array.from(btn.parentElement.children).forEach((children) => {
                    children.style.background = "none";
                });
                if(overlapCheck === true){
                    btn.style.background = "none";
                } else {
                    btn.style.background = '#d3d3d3';
                }
            });
        });
    }
}

export default Input3;