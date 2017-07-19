import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import PreviewHeader from '../components/PreviewHeader';
import PreviewContent from '../components/PreviewContent';
import Button from '../components/Button';
import '../css/Preview.css';

class Preview extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pageList: null
        };
        
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
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

