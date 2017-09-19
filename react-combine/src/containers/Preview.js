import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import PreviewHeader from '../components/PreviewHeader';
import PreviewContent from '../components/PreviewContent';
import Button from '../components/Button';
import axios from 'axios';
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
            let totalGrade = totalSubjectGrade + response.data.grade.calculatedScore.attendance + response.data.grade.calculatedScore.volunteer;
            let address = response.data.info.addressBase + response.data.info.addressDetail;
            let isSpecial = response.data.classification.applyDetailType.IS_EXCEPTIONEE;
            console.log(response);
            this.setState({
                submitNumber: "",
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
                local: response.data.classification.regionType,
                isSpecial: response.data.classification.applyDetailType.IS_EXCEPTIONEE,
                isCountryMerit: response.data.classification.applyDetailType.IS_NATIONAL_MERIT,
                firstGrade: response.data.grade.calculatedScore.score.first,
                secondGrade: response.data.grade.calculatedScore.score.second,
                thirdGrade: response.data.grade.calculatedScore.score.third,
                totalSubjectGrade: response.data.grade.calculatedScore.score.total,
                attend: response.data.grade.calculatedScore.attendance,
                volunteer: response.data.grade.calculatedScore.volunteer,
                totalGrade: totalGrade,
                schoolName: response.data.info.schoolName,
                type: response.data.classification.applyBaseType.type,
                introduce: response.data.introduce.introduce,
                plan: response.data.introduce.plan
            })
        }).catch(err => {
            console.log(err.config);
        })
    }

    componentDidMount() {
        this.getUserData();
        this.setState({
            targetPage: "userInfo"
        });
    }

    setPage(target) {
        this.setState( {
            targetPage: target
        })
    }

    render(){
        function printHandler(e) {
            e.preventDefault();
            window.print();
        }

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
                        <button className="printButton" onClick={printHandler}>출력하기</button>                        
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
            target: "userInfo"
        },
        {
            name: "자기 소개서",
            target: "self"
        },
        {
            name: "학업 계획서",
            target: "plan"
        },
        {
            name: "금연 서약서",
            target: "noSmoke"
        },
        {
            name: "학교장 추천서",
            target: "principal"
        }
    ]
}

export default Preview;