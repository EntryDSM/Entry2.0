import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import PreviewHeader from '../components/PreviewHeader';
import PreviewContent from '../components/PreviewContent';
import Button from '../components/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import '../css/Preview.css';
import '../css/Userinfo_table.css';

class Preview extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pageList: null,
            submitNumber: "",
            schoolCode: "",
            class: "",
            name: "",
            birth: "",
            sex: "",
            address: "",
            parentsTel: "",
            parentsName: "",
            schoolTel: "",
            phoneNum: "",
            graduation: "",
            isSpecial: "",
            isCountryMerit: "",
            firstGrade: 0,
            secondGrade: 0,
            thirdGrade: 0,
            totalSubjectGrade: 0,
            attend: 0,
            volunteer: 0,
            totalGrade: 0,
            type: "",
            schoolName: "",
            targetPage: "userInfo",
            printCheck: ["", "", "", "", ""]
        };
        
        this.setPage = this.setPage.bind(this);
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
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "salmon";
        point6.style.stroke = "salmon";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: '/api/validation'
        }).then(response => {
            if(response.data.classification.length !== 0 || response.data.grade.length !== 0 || response.data.info.length !== 0 || response.data.introduce.length !== 0){
                browserHistory.push('/validation');
            } else {
                axios({
                    method: 'get',
                    url: '/api/preview'
                }).then(response => {
                    let address = response.data.info.addressBase + response.data.info.addressDetail;
                    let submitNumber; 
                    if(response.data.submitNumber > 0 && response.data.submitNumber < 10){
                        submitNumber = '00' + response.data.submitNumber;
                    } else if(response.data.submitNumber >= 10 && response.data.submitNumber < 100){
                        submitNumber = '0' + response.data.submitNumber;
                    } else {
                        submitNumber = response.data.submitNumber;
                    }

                    let birth = response.data.info.birthday.split('-');
                    let birthMonth;
                    let birthDay;
                    if(Number(birth[1]) < 10){
                        birthMonth = '0' + birth[1];
                    } else {
                        birthMonth = birth[1];
                    }

                    if(Number(birth[2]) < 10){
                        birthDay = '0' + birth[2];
                    } else {
                        birthDay = birth[2];
                    }

                    if(response.data.classification.applyBaseType.type !== 'COMMON' && !response.data.classification.isBlack){
                        this.props.pageList = [
                            {
                                name: "입학 원서",
                                target: "userInfo",
                                id: 'name_userinfo'
                            },
                            {
                                name: "자기 소개서",
                                target: "self",
                                id: 'name_selfintroduce'
                            },
                            {
                                name: "학업 계획서",
                                target: "plan",
                                id: 'name_study_plan'
                            },
                            {
                                name: "금연 서약서",
                                target: "noSmoke",
                                id: 'name_no_smoke'
                            },
                            {
                                name: '학교장 추천서',
                                target: 'principal',
                                id: 'name_principal'
                            }
                        ]
                    }

                    this.setState({
                        submitNumber: submitNumber,
                        schoolCode: response.data.info.schoolCode,
                        class: response.data.info.class,
                        name: response.data.user.name,
                        birth: birth[0] + ' - ' +  birthMonth + ' - ' + birthDay,
                        sex: response.data.info.sex,
                        address: address,
                        parentsTel: response.data.info.parentsTel,
                        parentsName: response.data.info.parentsName,
                        schoolTel: response.data.info.schoolTel,
                        phoneNum: response.data.info.tel,
                        graduation: response.data.classification.graduateType,
                        graduateYear: response.data.classification.graduateYear,
                        local: response.data.classification.regionType,
                        isSpecial: response.data.classification.applyDetailType.IS_EXCEPTIONEE,
                        isBlack: response.data.classification.isBlack,
                        isCountryMerit: response.data.classification.applyDetailType.IS_NATIONAL_MERIT,
                        firstGrade: response.data.grade.calculatedScore.score.first,
                        secondGrade: response.data.grade.calculatedScore.score.second,
                        thirdGrade: response.data.grade.calculatedScore.score.third,
                        totalSubjectGrade: response.data.grade.calculatedScore.score.total,
                        attend: response.data.grade.calculatedScore.attendance,
                        volunteer: response.data.grade.calculatedScore.volunteer,
                        totalGrade: response.data.grade.calculatedScore.total,
                        schoolName: response.data.classification.isBlack ? "해당없음" : response.data.info.schoolName,
                        type: response.data.classification.applyBaseType.type,
                        cause: response.data.classification.applyBaseType.cause,
                        introduce: response.data.introduce.introduce,
                        plan: response.data.introduce.plan
                    })
                }).catch(error => {
                    console.log(error);
                    if(error.response.status === 500){
                        browserHistory.push('/internalError');
                    } else {
                        browserHistory.push('error');
                    }
                })
                this.setState({
                    targetPage: "userInfo"
                });
                document.getElementById('name_userinfo').style.background = "#ddd";
            }
        }).catch(error => {
            console.log(error);
            if(error.response.status === 500){
                browserHistory.push('/internalError');
            } else {
                browserHistory.push('/error');
            }
        })
    }

    setPage(target) {
        this.setState( {
            targetPage: target
        })

        Array.from(document.getElementsByClassName('tabButton')).forEach(ele => {
            ele.style.background = "inherit";
        })

        switch(target){
            case 'userInfo':
                document.getElementById('name_userinfo').style.background = "#ddd";
                break;
            case 'self':
                document.getElementById('name_selfintroduce').style.background = "#ddd";
                break;
            case 'plan':
                document.getElementById('name_study_plan').style.background = "#ddd";
                break;
            case 'noSmoke':
                document.getElementById('name_no_smoke').style.background = "#ddd";
                break;
            case 'principal':
                document.getElementById('name_principal').style.background = "#ddd";
                break;
            default:
                break;
        }
    }

    printHandler(e){
        let green = Array.from(document.getElementsByClassName('printed'));
        let checkArr = this.state.printCheck;

        green.forEach(ele => {
            ele.style.visibility = ""
        })

        e.preventDefault();
        window.print();

        switch(this.state.targetPage){
            case 'userInfo':
                green[0].style.visibility = 'visible';        
                document.getElementById('name_userinfo').style.background = "inherit";
                document.getElementById('name_selfintroduce').style.background = "#ddd";
                checkArr[0] = "visible";
                this.setState({
                    printCheck: checkArr,
                    targetPage: 'self'
                })
                window.scrollTo(0, 0);
                break;
            case 'self':
                green[1].style.visibility = 'visible';
                document.getElementById('name_selfintroduce').style.background = "inherit";
                document.getElementById('name_study_plan').style.background = "#ddd";
                checkArr[1] = "visible";
                this.setState({
                    printCheck: checkArr,
                    targetPage: 'plan'
                })
                window.scrollTo(0, 0);
                break;
            case 'plan':
                green[2].style.visibility = 'visible';
                document.getElementById('name_study_plan').style.background = "inherit";
                document.getElementById('name_no_smoke').style.background = "#ddd";
                checkArr[2] = "visible";
                this.setState({
                    printCheck: checkArr,
                    targetPage: 'noSmoke'
                })
                window.scrollTo(0, 0);
                break;
            case 'noSmoke':
                green[3].style.visibility = 'visible';
                document.getElementById('name_no_smoke').style.background = "inherit";
                checkArr[3] = "visible";
                if(this.state.type !== 'COMMON'){
                    document.getElementById('name_principal').style.background = "#ddd";
                    this.setState({
                        printCheck: checkArr,
                        targetPage: 'principal'
                    })
                    window.scrollTo(0, 0);                    
                } else {
                    this.setState({
                        printCheck: checkArr
                    })
                }
                break;
            case 'principal':
                green[4].style.visibility = 'visible';
                checkArr[4] = "visible";
                this.setState({
                    printCheck: checkArr
                })
                break;
            default:
                break;
        }

        if(this.state.type === 'COMMON'){
            for(let i=0; i<4; i++){
                green[i].style.visibility = this.state.printCheck[i];
            }
        } else {
            for(let i=0; i<5; i++){
                green[i].style.visibility = this.state.printCheck[i];
            }
        }
    }

    render(){
        return(
            <div id="contents">
                <div id="preview">
                    <div id="menu-area">
                        <div id="header-area">
                            <InputHeader now={"미리보기"} />
                        </div>

                        <div id="section-to-print">
                            <PreviewHeader datas={this.props.pageList} setPage={this.setPage} />
                            <PreviewContent 
                                target={this.state.targetPage} 
                                datas={this.state}/>
                        </div>
                        <button className="printButton" onClick={this.printHandler.bind(this)}>출력하기</button>                        
                    </div>
                    <Button router='/introduce' buttonName="이전"/>
                    <Button router='/finalsubmit' buttonName="다음"/>
                </div>
            </div>
        );
    }
}
Preview.defaultProps = {
    pageList: [
        {
            name: "입학 원서",
            target: "userInfo",
            id: 'name_userinfo'
        },
        {
            name: "자기 소개서",
            target: "self",
            id: 'name_selfintroduce'
        },
        {
            name: "학업 계획서",
            target: "plan",
            id: 'name_study_plan'
        },
        {
            name: "금연 서약서",
            target: "noSmoke",
            id: 'name_no_smoke'
        }
    ]
}

export default Preview;