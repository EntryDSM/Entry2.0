import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import PreviewHeader from '../components/PreviewHeader';
import PreviewContent from '../components/PreviewContent';
import Button from '../components/Button';
import '../css/Preview.css';
import '../css/Userinfo_table.css';

class Preview extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pageList: null
        };
        
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
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

        this.setState({
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
                            <PreviewHeader datas={this.state.pageList} setPage={this.setPage} />
                            <PreviewContent target={this.state.targetPage} />
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

export default Preview;

