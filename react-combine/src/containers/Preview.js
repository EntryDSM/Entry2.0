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

            targetPage: "userInfo",
        };
        
        this.setPage = this.setPage.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    getUserData(){
        axios({
            method: 'get',
            url: '/api/preview',
            withCredentials: false,
            headers : {
                "Access-Control-Allow-Origin" : "http://114.108.135.15"
            }
        }).then(response => {
            let totalSubjectGrade = response.data.grade.calculatedScore.score.total;
            let address = response.data.info.addressBase + response.data.info.addressDetail;
            let isSpecial = response.data.classification.applyDetailType.IS_EXCEPTIONEE;
            let submitNumber; 
            if(response.data.submitNumber > 0 && response.data.submitNumber < 10){
                submitNumber = '00' + response.data.submitNumber;
            } else if(response.data.submitNumber >= 10 && response.data.submitNumber < 100){
                submitNumber = '0' + response.data.submitNumber;
            } else {
                submitNumber = response.data.submitNumber;
            }
            console.log(response);

            if(response.data.classification.applyBaseType.type !== 'COMMON'){
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
                birth: response.data.info.birthday,
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
                isCountryMerit: response.data.classification.applyDetailType.IS_NATIONAL_MERIT,
                firstGrade: response.data.grade.calculatedScore.score.first,
                secondGrade: response.data.grade.calculatedScore.score.second,
                thirdGrade: response.data.grade.calculatedScore.score.third,
                totalSubjectGrade: response.data.grade.calculatedScore.score.total,
                attend: response.data.grade.calculatedScore.attendance,
                volunteer: response.data.grade.calculatedScore.volunteer,
                totalGrade: response.data.grade.calculatedScore.total,
                schoolName: response.data.info.schoolName,
                type: response.data.classification.applyBaseType.type,
                introduce: response.data.introduce.introduce.replace(/(\r\n|\n|\r)/gm, "\n"),
                plan: response.data.introduce.plan
            })
        }).catch(err => {
            console.log(err);
            browserHistory.push('error');
        })
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/validation'
        }).then(response => {
            if(response.data.classification.length === 0 && response.data.grade.length === 0 && response.data.info.length === 0 && response.data.introduce.length === 0){
                this.getUserData();
                this.setState({
                    targetPage: "userInfo"
                });
            } else {
                browserHistory.push('/validation');
            }
            console.log(document.getElementById('name_userinfo'));
            document.getElementById('name_userinfo').style.background = "#ddd";
        }).catch(err => {
            console.log(err);
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
        }
    }

    printHandler(e){
        console.log(this.state.targetPage);
        let green = Array.from(document.getElementsByClassName('printed'));
        switch(this.state.targetPage){
            case 'userInfo':
                green[0].style.visibility = 'visible';
                document.getElementById('name_userinfo').style.background = "inherit";
                document.getElementById('name_selfintroduce').style.background = "#ddd";
                this.setState({
                    targetPage: 'self'
                })
                window.scrollTo(0, 0);
                break;
            case 'self':
                green[1].style.visibility = 'visible';
                document.getElementById('name_selfintroduce').style.background = "inherit";
                document.getElementById('name_study_plan').style.background = "#ddd";
                this.setState({
                    targetPage: 'plan'
                })
                window.scrollTo(0, 0);
                break;
            case 'plan':
                green[2].style.visibility = 'visible';
                document.getElementById('name_study_plan').style.background = "inherit";
                document.getElementById('name_no_smoke').style.background = "#ddd";
                this.setState({
                    targetPage: 'noSmoke'
                })
                window.scrollTo(0, 0);
                break;
            case 'noSmoke':
                green[3].style.visibility = 'visible';
                if(this.state.type !== 'COMMON'){
                    document.getElementById('name_no_smoke').style.background = "inherit";
                    document.getElementById('name_principal').style.background = "#ddd";
                    this.setState({
                        targetPage: 'principal'
                    })
                }
                break;
            case 'principal':
                green[4].style.visibility = 'visible';
                break;
        }
        e.preventDefault();
        window.print();
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