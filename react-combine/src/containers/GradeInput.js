import React, {Component} from 'react';
import Graduate from '../components/GraduateToBe';
import Graduated from '../components/Graduated';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import Volunteer from '../components/Volunteer';
import Attend from '../components/Attend';
import '../css/InputHeader.css';
import '../css/GradeInput.css';

class GradeInput extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            score: {
                firstGrade_firstSemester: ["", "", "", "", "", "", "",],
                firstGrade_secondSemester: ["", "", "", "", "", "", "",],
                secondGrade_firstSemester: ["", "", "", "", "", "", "",],
                secondGrade_secondSemester: ["", "", "", "", "", "", "",],
                thirdGrade_firstSemester: ["", "", "", "", "", "", "",],
                thirdGrade_secondSemester: ["", "", "", "", "", "", "",]
            },
            absence: 0,
            late: 0,
            leaving_early: 0,
            not_attendence: 0,
            graduated: null,
            graduate_to_be: null,
            black: null
        };
    }

    setAttendData(e){
        switch(e.target.name){
            case "absence": {
                this.setState({
                    absence: e.target.value
                })
                break;
            }
            case "late": {
                this.setState({
                    late: e.target.value
                })
                break;
            }
            case "leaving_early": {
                this.setState({
                    leaving_early: e.target.value
                })
                break;
            }
            case "not_attendence": {
                this.setState({
                    not_attendence: e.target.value
                })
                break;
            }
        }
    }

    render(){
        let attendData = [
            this.state.absence,
            this.state.late,
            this.state.leaving_early,
            this.state.not_attendence
        ];
        return(
            <div id="contents">
                <InputHeader now={"성적입력"}/>
                <div id="volunteerAttendWrapper">
                    <Volunteer />
                    <Attend 
                        setAttendData={this.setAttendData.bind(this)}
                        attendValue={attendData} />
                </div>
                <table id="grade_input_table">
                    <Graduate visible={this.state.graduate_to_be}/>
                    <Graduated visible={this.state.graduated}/>
                </table>
                <Button router="infoinput" buttonName="이전"/>
                <Button router="introduce" buttonName="다음"/>
            </div>
        );
    }

    componentDidMount(){
        let mThis = this;
        let score = {
            firstGrade_firstSemester: ["", "", "", "", "", "", "",],
            firstGrade_secondSemester: ["", "", "", "", "", "", "",],
            secondGrade_firstSemester: ["", "", "", "", "", "", "",],
            secondGrade_secondSemester: ["", "", "", "", "", "", "",],
            thirdGrade_firstSemester: ["", "", "", "", "", "", "",]
        }
        let selectorToggle = (nodes, event, semester, subject) => {
            Array.from(nodes.parentElement.children).forEach((ele) => {
                if(ele.textContent !== event.target.textContent){
                    ele.classList.remove('selectedGrade');
                }
            })
            if(event.target.classList.contains('selectedGrade')){
                event.target.classList.remove('selectedGrade');
            } else {
                event.target.classList.add('selectedGrade');
                switch(semester + '' + subject){
                    case '00': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '01': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '02': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '03': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '04': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '05': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '06': 
                        score.firstGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '10': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '11': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '12': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '13': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '14': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '15': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '16': 
                        score.firstGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '20': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '21': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '22': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '23': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '24': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '25': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '26': 
                        score.secondGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '30': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '31': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '32': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '33': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '34': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '35': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '36': 
                        score.secondGrade_secondSemester[subject] = event.target.textContent;
                        break;
                    case '40': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '41': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '42': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '43': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '44': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '45': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                    case '46': 
                        score.thirdGrade_firstSemester[subject] = event.target.textContent;
                        break;
                }
                mThis.setState({
                    score: score
                })
            }
        }

        //졸업예정 GraduateToBe
        let toBe_Rows = Array.from(document.getElementsByClassName('to_be_subjects'));
        //toBe_Semester[] > 1차원 배열 > 학기별 성적 > Ex. [0] = 1학기 성적 * 7
        //toBe_Semester[][] > 2차원 배열 > 과목벽 성적 > Ex. [0][0] = 1학년 1학기 성적 = A 
        let toBe_Semester = new Array;
        let toBe_notPass = document.querySelectorAll('#to_be_table .switchArea .unFinCheckArea .switch input');
        for(let i=0; i<6; i++){
            if(i > 0){
                let semester = i + 1;
                toBe_Semester[i - 1] = Array.from(document.querySelectorAll('.to_be_subjects .to_be_select_grade:nth-of-type(' + semester + ')'));
            }
        }

        toBe_Semester.forEach((ele, index) => {
            toBe_Semester[index].forEach((ele, mIndex) => {
                toBe_Semester[index][mIndex] = Array.from(ele.children[1].children);
                toBe_Semester[index][mIndex].forEach((selector) => {
                    selector.addEventListener('click', (event) => {
                        if(!selector.parentElement.parentElement.classList.contains('notpassedArea')){
                            selectorToggle(selector, event, index, mIndex);
                        }
                    })
                })
            })
        })
        
        Array.from(toBe_notPass).forEach((ele) => {
            ele.addEventListener('click', () => {
                let selectorArea = ele.parentElement.parentElement.parentElement.parentElement.parentElement; 
                if(!selectorArea.classList.contains('notpassedArea')){
                    selectorArea.classList.add('notpassedArea');
                } else {
                    selectorArea.classList.remove('notpassedArea');
                }
                Array.from(ele.parentElement.parentElement.parentElement.parentElement.parentElement.children).forEach((ele) => {
                    if(!ele.classList.contains('is_pass_check')){
                        console.log(ele.children);
                        Array.from(ele.children).forEach((ele) => {
                            ele.classList.remove('selectedGrade');
                        })
                    }
                })
            })
        })
    }
}

export default GradeInput;