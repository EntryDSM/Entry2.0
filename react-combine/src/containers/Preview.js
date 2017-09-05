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
            getData: {
                sex: "",
                class: 0,
                parentsName: "",
                schoolCode: 0,
                schoolNmae: "",
                schoolTel: "",
                phoneNum: "",
                parentsTel: "",
                birth: "",
                address: "",
                name: "",
                resistration: 0,
                examine: 0
            }
        };
        
        this.setPage = this.setPage.bind(this);
    }

    setPage(target) {
        this.setState( {
            targetPage: target
        })
    }

    getPreviewData(){
        axios({
            method: 'get',
            url: '/preview',
        }).then(response => {
            
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
                            <PreviewContent target={this.props.targetPage} />
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
    ],
    targetPage: "principal"
}

export default Preview;

