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
                semesters: [
                    [
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                    ],
                    [
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                    ],
                    [
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                    ],
                    [
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                    ],
                    [
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                        { pass: true, grade: null },
                    ]
                ]
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
        let scoreData = {
            semesters: [
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ],
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ],
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ],
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ],
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ],
                [
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                    { pass: true, grade: null },
                ]
            ]
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
                scoreData.semesters[semester][subject].grade = event.target.textContent;
                mThis.setState({
                    score: scoreData                
                })
            }
        }

        let did_Semesters = [[], [], [], [], [], []];
        let toBe_Semesters = [[], [], [], [], []];
        let did_GradeSelector = [[], [], [], [], [], []];
        let toBe_GradeSelector = [[], [], [], [], []];
        let did_NotPass = [[], [], [], [], [], []];
        let toBe_NotPass = [[], [], [], [], []];
        let did_SemesterNotPass = Array.from(document.querySelectorAll('#did_table tr:nth-of-type(1) td'));
        let toBe_SemesterNotPass = Array.from(document.querySelectorAll('#to_be_table tr:nth-of-type(1) td'));
        let did_semesterNotPass = new Array;

        for(let i = 0; i < 6; i++){
            let Mdid_SemesterNotPass = did_SemesterNotPass[i].children[0].children[1].children[0].children[0];
            for(let j = 0; j < 7; j++){
                did_Semesters[i][j] = document.querySelector('#did_table tr:nth-of-type('+ (j + 3) +') td:nth-of-type('+ (i + 2) +')');
                did_GradeSelector[i][j] = did_Semesters[i][j].children[1];
                did_NotPass[i][j] = did_Semesters[i][j].children[0].children[0].children[1].children[0].children[0];

                Array.from(did_GradeSelector[i][j].children).forEach((ele) => {
                    ele.addEventListener('click', (event) => {
                        if(!did_Semesters[i][j].classList.contains('notpassedArea')){
                            selectorToggle(ele, event, i, j);
                        }
                    })
                })

                did_NotPass[i][j].addEventListener('click', () => {
                    if(did_Semesters[i][j].classList.contains('notpassedArea')){
                        did_Semesters[i][j].classList.remove('notpassedArea');
                    } else {
                        did_Semesters[i][j].classList.add('notpassedArea');
                        scoreData.semesters[i][j].pass = false;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
                        Array.from(did_GradeSelector[i][j].children).forEach((ele) => {
                            ele.classList.remove('selectedGrade');
                        })
                    }
                    
                    let count = 0;
                    for(let k = 0; k < 7; k++){
                        if(did_NotPass[i][k].checked){
                            count++;
                        }
                    }

                    if(count === 7){
                        Mdid_SemesterNotPass.checked = true;
                    } else {
                        Mdid_SemesterNotPass.checked = false;
                    }
                })
            }
            Mdid_SemesterNotPass.addEventListener('click', () => {
                if(Mdid_SemesterNotPass.checked){
                    for(let j = 0; j < 7; j++){
                        did_Semesters[i][j].classList.add('notpassedArea');
                        scoreData.semesters[i][j].pass = false;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
                        did_NotPass[i][j].checked = true;
                        Array.from(did_GradeSelector[i][j].children).forEach((ele) => {
                            ele.classList.remove('selectedGrade'); 
                        })
                    }
                } else {
                    for(let j = 0; j < 7; j++){
                        did_Semesters[i][j].classList.remove('notpassedArea');
                        did_NotPass[i][j].checked = false;
                    }
                }
            })
        }

        for(let i = 0; i < 5; i++){
            let MtoBe_SemesterNotPass = toBe_SemesterNotPass[i].children[0].children[1].children[0].children[0];
            for(let j = 0; j < 7; j++){
                toBe_Semesters[i][j] = document.querySelector('#to_be_table tr:nth-of-type('+ (j + 3) +') td:nth-of-type('+ (i + 2) +')');
                toBe_GradeSelector[i][j] = toBe_Semesters[i][j].children[1];
                toBe_NotPass[i][j] = toBe_Semesters[i][j].children[0].children[0].children[1].children[0].children[0];

                Array.from(toBe_GradeSelector[i][j].children).forEach((ele) => {
                    ele.addEventListener('click', (event) => {
                        if(!toBe_Semesters[i][j].classList.contains('notpassedArea')){
                            selectorToggle(ele, event, i, j);
                        }
                    })
                })

                toBe_NotPass[i][j].addEventListener('click', () => {
                    if(toBe_Semesters[i][j].classList.contains('notpassedArea')){
                        toBe_Semesters[i][j].classList.remove('notpassedArea');
                    } else {
                        toBe_Semesters[i][j].classList.add('notpassedArea');
                        scoreData.semesters[i][j].pass = false;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
                        Array.from(toBe_GradeSelector[i][j].children).forEach((ele) => {
                            ele.classList.remove('selectedGrade');
                        })
                    }

                    let count = 0;
                    for(let k = 0; k < 7; k++){
                        if(toBe_NotPass[i][k].checked){
                            count++;
                        }
                    }
                    
                    if(count === 7){
                        MtoBe_SemesterNotPass.checked = true;
                    } else {
                        MtoBe_SemesterNotPass.checked = false;
                    }
                })
            }
            MtoBe_SemesterNotPass.addEventListener('click', () => {
                if(MtoBe_SemesterNotPass.checked){
                    for(let j = 0; j < 7; j++){
                        toBe_Semesters[i][j].classList.add('notpassedArea');
                        scoreData.semesters[i][j].pass = false;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            scoreData: scoreData
                        })
                        toBe_NotPass[i][j].checked = true;
                        Array.from(toBe_GradeSelector[i][j].children).forEach((ele) => {
                            ele.classList.remove('selectedGrade'); 
                        })
                    }
                } else {
                    for(let j = 0; j < 7; j++){
                        toBe_Semesters[i][j].classList.remove('notpassedArea');
                        toBe_NotPass[i][j].checked = false;
                    }
                }
            })
        }
    }
}

export default GradeInput;