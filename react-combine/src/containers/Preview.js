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
            firstGrade: "",
            secondGrade: "",
            thirdGrade: "",
            totalSubjectGrade: "",
            attend: "",
            volunteer: "",
            totalGrade: "",
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
            console.log(response);
            this.setState({
                submitNumber: "",
                schoolCode: response.data.schoolCode,
                class: response.data.info.class,
                name: response.data.user.name,
                birth: response.data.info.birth,
                sex: response.data.info.sex,
                address: response.data.info.address,
                parentsTel: response.data.info.parentsTel,
                parentsName: response.data.info.parentsName,
                schoolTel: response.data.info.schoolTel,
                phoneNum: response.data.info.phoneNum,
                graduation: response.data.classification.graduation,
                local: response.data.classification.local,
                isSpecial: response.data.classification.isSpecial,
                isCountryMerit: response.data.classification.isCountryMerit,
                firstGrade: "",
                secondGrade: "",
                thirdGrade: "",
                totalSubjectGrade: "",
                attend: "",
                volunteer: "",
                totalGrade: "",
                schoolName: response.data.info.schoolName,
                type: response.data.classification.type
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