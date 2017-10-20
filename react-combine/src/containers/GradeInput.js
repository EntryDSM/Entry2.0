import React, {Component} from 'react';
import Graduate from '../components/GraduateToBe';
import Graduated from '../components/Graduated';
import BlackExam from '../components/BlackExam';
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
            black: "none",
            avgScore: 0
        };
    }

    setVolunteer(e){
        if(e.target.value >= 0 && e.target.value !== NaN){    
            this.setState({
                volunteer: Number(e.target.value)
            })
        } else {
            this.setState({
                volunteer: Number(e.target.value)
            })
        }
    }

    setAttendData(e){
        if(e.target.value >= 0 && e.target.value !== NaN){
            switch(e.target.name){
                case "absence": {
                    this.setState({
                        absence: Number(e.target.value)
                    })
                    break;
                }
                case "late": {
                    this.setState({
                        lateness: Number(e.target.value)
                    })
                    break;
                }
                case "leaving_early": {
                    this.setState({
                        earlyLeave: Number(e.target.value)
                    })
                    break;
                }
                case "not_attendence": {
                    this.setState({
                        subjectEscape: Number(e.target.value)
                    })
                    break;
                }
            }
        }
    }

    componentWillUnmount(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            if(!response.data.applyStatus){
                let isBlack = response.data.isBlack;
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
                                subjectEscape: isBlack ? this.state.avgScore : this.state.subjectEscape
                            },
                            score: isBlack ? this.state.avgScore : this.state.score
                        }
                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    setAvgScore(e){
        if(e.target.value !== NaN && e.target.value >= 0 && e.target.value <= 100){
            this.setState({
                avgScore: Number(e.target.value)
            })
        }
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
            <div id = "contents">
                <InputHeader now = {"성적입력"}/>
                <div id = "volunteerAttendWrapper">
                    <Volunteer
                        visible = {this.state.black === 'table-row-group' ? "none" : "table-row-group"}
                        setVolunteer = {this.setVolunteer.bind(this)}
                        volunteer = {this.state.volunteer} />
                    <Attend
                        visible = {this.state.black === 'table-row-group' ? "none" : "table-row-group"}
                        setAttendData = {this.setAttendData.bind(this)}
                        attendValue = {attendData} />
                </div>
                <table id="grade_input_table">
                    <Graduate visible = {this.state.graduate_to_be}/>
                    <Graduated visible = {this.state.graduated}/>
                    <BlackExam
                        avgScore = {this.state.avgScore}
                        setAvgScore = {this.setAvgScore.bind(this)} 
                        visible = {this.state.black}/>
                </table>
                <Button router = "/infoinput" buttonName = "이전"/>
                <Button router = '/introduce' buttonName = "다음"/>
            </div>
        );
    }

    componentDidMount(){
        var point1 = document.getElementById("point_step1");
        var point2 = document.getElementById("point_step2");
        var point3 = document.getElementById("point_step3");
        var point4 = document.getElementById("point_step4");
        var point5 = document.getElementById("point_step5");
        var point6 = document.getElementById("point_step6");
        var point7 = document.getElementById("point_step7");
        point1.style.fill = "#B9B4B4";
        point1.style.stroke = "B9B4B4";
        point2.style.fill = "#B9B4B4";
        point2.style.stroke = "#B9B4B4";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "salmon";
        point4.style.stroke = "salmon";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";

        let scoreData;
        let graduateType;
        let mThis = this;
        let did_Semesters = [[], [], [], [], [], []];
        let toBe_Semesters = [[], [], [], [], []];
        let did_GradeSelector = [[], [], [], [], [], []];
        let toBe_GradeSelector = [[], [], [], [], []];
        let did_NotPass = [[], [], [], [], [], []];
        let toBe_NotPass = [[], [], [], [], []];
        let did_SemesterNotPass = Array.from(document.querySelectorAll('#did_table tr:nth-of-type(1) td'));
        let toBe_SemesterNotPass = Array.from(document.querySelectorAll('#to_be_table tr:nth-of-type(1) td'));
        let did_semesterNotPass = new Array;

        axios({
            method: 'get',
            url: '/api/user/classification',
            withCredentials: false
        }).then(response => {
            if(!response.data.applyStatus){
                graduateType = response.data.graduateType;
                if(!response.data.isBlack){
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

                    axios({
                        method: 'get',
                        url: '/api/user/grade'
                    }).then(response => {
                        this.setState({
                            volunteer: response.data.grade.volunteer,
                            absence: response.data.grade.attend.absence,
                            lateness: response.data.grade.attend.lateness,
                            earlyLeave: response.data.grade.attend.earlyLeave,
                            subjectEscape: response.data.grade.attend.subjectEscape,
                        })

                        response.data.grade.score.semesters.forEach((ele) => {
                            for(let i = 0; i < response.data.grade.score.semesters.length; i++){
                                console.log(graduateType)
                                let MtoBe_SemesterNotPass;
                                let Mdid_SemesterNotPass;

                                if(graduateType === 'DONE'){
                                    Mdid_SemesterNotPass = did_SemesterNotPass[i].children[0].children[1].children[0].children[0];
                                } else {
                                    MtoBe_SemesterNotPass = toBe_SemesterNotPass[i].children[0].children[1].children[0].children[0];
                                }

                                let count = 0;
                                for(let j = 0; j < 7; j++){
                                    if(graduateType === 'WILL'){
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
                                    } else if(graduateType === 'DONE') {
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
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    this.setState({
                        black: "table-row-group",
                        graduated: "hide",
                        graduate_to_be: "hide"
                    })
                }
            } else {
                browserHistory.push('/finalError');
            }
        }).catch(error => {
            console.log(error);
            browserHistory.push('/error');
        })

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
                        scoreData.semesters[i][j].pass = true;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
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
                        scoreData.semesters[i][j].pass = true;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
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
                        scoreData.semesters[i][j].pass = true;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
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
                        scoreData.semesters[i][j].pass = true;
                        scoreData.semesters[i][j].grade = null;
                        mThis.setState({
                            score: scoreData
                        })
                    }
                }
            })
        }
    }
}

export default GradeInput;