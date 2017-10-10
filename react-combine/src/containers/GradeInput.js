import React, {Component} from 'react';
import Graduate from '../components/GraduateToBe';
import Graduated from '../components/Graduated';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import Volunteer from '../components/Volunteer';
import Attend from '../components/Attend';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import PropTypes from 'prop-types';
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
            lateness: 0,
            earlyLeave: 0,
            subjectEscape: 0,
            volunteer: 0,
            graduated: null,
            graduate_to_be: null,
            black: null
        };
    }

    setVolunteer(e){
        if(e.target.value >= 0){    
            this.setState({
                volunteer: e.target.value
            })
        }
    }

    setAttendData(e){
        if(e.target.value >= 0){
            switch(e.target.name){
                case "absence": {
                    this.setState({
                        absence: e.target.value
                    })
                    break;
                }
                case "late": {
                    this.setState({
                        lateness: e.target.value
                    })
                    break;
                }
                case "leaving_early": {
                    this.setState({
                        earlyLeave: e.target.value
                    })
                    break;
                }
                case "not_attendence": {
                    this.setState({
                        subjectEscape: e.target.value
                    })
                    break;
                }
            }
        }
    }

    gradeInputSubmit(){
        axios({
            method: 'put',
            url: '/api/user/grade',
            data: {
                grade: {
                    volunteer: this.state.volunteer,
                    attend: {
                        absence: this.state.absence,
                        lateness: this.state.lateness,
                        earlyLeave: this.state.earlyLeave,
                        subjectEscape: this.state.subjectEscape
                    },
                    score: this.state.score
                }
            }
        }).then(response => {
            console.log(response);
            browserHistory.push('/introduce');
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        let attendData = [
            this.state.absence,
            this.state.lateness,
            this.state.earlyLeave,
            this.state.subjectEscape
        ];
        console.log(this.state);
        return(
            <div id="contents">
                <InputHeader now={"성적입력"}/>
                <div id="volunteerAttendWrapper">
                    <Volunteer
                        setVolunteer={this.setVolunteer.bind(this)}
                        volunteer={this.state.volunteer} />
                    <Attend 
                        setAttendData={this.setAttendData.bind(this)}
                        attendValue={attendData} />
                </div>
                <table id="grade_input_table">
                    <Graduate visible={this.state.graduate_to_be}/>
                    <Graduated visible={this.state.graduated}/>
                </table>
                <Button router="infoinput" buttonName="이전"/>
                <Button onclick={this.gradeInputSubmit.bind(this)} buttonName="다음"/>
            </div>
        );
    }

    componentDidMount(){
        let scoreData;

        axios({
            method: 'get',
            url: '/api/user/classification',
            withCredentials: false
        }).then(response => {
            console.log(response.data);
            switch(response.data.graduateType){
                case "WILL": 
                    this.setState({
                        graduated: "hide"
                    })
                    scoreData = {
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
                    }
                    break;
                case "DONE":
                    this.setState({
                        graduate_to_be: "hide"
                    })
                    scoreData = {
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
                default: break;
            }
        }).catch(err => {
            console.log(err);
        })

        let mThis = this;

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
                scoreData.semesters[semester][subject].pass = true;
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
                            score: scoreData
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
                        mThis.setState({
                            score: scoreData
                        })
                    }
                }
            })
        }

        axios({
            method: 'get',
            url: '/api/user/grade',
            withCredentials: false
        }).then(response => {
            console.log(response.data);
            this.setState({
                volunteer: response.data.grade.volunteer,
                absence: response.data.grade.attend.absence,
                lateness: response.data.grade.attend.lateness,
                earlyLeave: response.data.grade.attend.earlyLeave,
                subjectEscape: response.data.grade.attend.subjectEscape,
            })
            response.data.grade.score.semesters.forEach((ele) => {
                console.log(response.data.grade.score.semesters.length);
                for(let i = 0; i < response.data.grade.score.semesters.length; i++){
                    let MtoBe_SemesterNotPass = toBe_SemesterNotPass[i].children[0].children[1].children[0].children[0];
                    let Mdid_SemesterNotPass = did_SemesterNotPass[i].children[0].children[1].children[0].children[0];
                    let count = 0;
                    for(let j = 0; j < 7; j++){
                        if(response.data.grade.score.semesters.length === 5){
                            Array.from(toBe_GradeSelector[i][j].children).forEach((ele) => {
                                if(response.data.grade.score.semesters[i][j].grade === ele.textContent){
                                    ele.classList.add('selectedGrade');
                                    scoreData.semesters[i][j].grade = ele.textContent;
                                    this.setState({
                                        score: scoreData
                                    })
                                }
                            })
                            toBe_NotPass[i][j] = toBe_Semesters[i][j].children[0].children[0].children[1].children[0].children[0];
                            if(!response.data.grade.score.semesters[i][j].pass){
                                toBe_NotPass[i][j].checked = true;
                                toBe_Semesters[i][j].classList.add('notpassedArea');
                                scoreData.semesters[i][j].pass = false;
                                ++count;
                                if(count === 7){
                                    MtoBe_SemesterNotPass.checked = true;
                                } else {
                                    MtoBe_SemesterNotPass.checked = false;
                                }
                                this.setState({
                                    score: scoreData
                                })
                            }
                        } else if(response.data.grade.score.semesters.length === 6) {
                            Array.from(did_GradeSelector[i][j].children).forEach((ele) => {
                                if(response.data.grade.score.semesters[i][j].grade === ele.textContent){
                                    ele.classList.add('selectedGrade');
                                    scoreData.semesters[i][j].grade = ele.textContent;
                                    this.setState({
                                        score: scoreData
                                    })
                                }
                            })
                            did_NotPass[i][j] = did_Semesters[i][j].children[0].children[0].children[1].children[0].children[0];
                            if(!response.data.grade.score.semesters[i][j].pass){
                                did_NotPass[i][j].checked = true;
                                did_Semesters[i][j].classList.add('notpassedArea');
                                scoreData.semesters[i][j].pass = false;
                                ++count;
                                if(count === 7){
                                    Mdid_SemesterNotPass.checked = true;
                                } else {
                                    Mdid_SemesterNotPass.checked = false;
                                }
                                this.setState({
                                    score: scoreData
                                })
                            }
                        }
                    }
                }
            })
        }).catch(err => {
            browserHistory.push('error');
        })
    }
}

export default GradeInput;