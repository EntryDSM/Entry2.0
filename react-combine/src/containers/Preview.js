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
    }

    componentDidMount() {
        this.setState({
            pageList: [
                {
                    name: "입학 원서",
                    url: ""
                },
                {
                    name: "자기 소개서",
                    url: ""
                },
                {
                    name: "학업 계획서",
                    url: ""
                },
                {
                    name: "금연 서약서",
                    url: ""
                },
                {
                    name: "학교장 추천서",
                    url: ""
                }
            ],
            targetPage: null
        });
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
                            <PreviewHeader datas={this.state.pageList} />
                            <PreviewContent target={this.props.targetPage} />
                        </div>
                        <button className="printButton" onClick={printHandler}>출력하기</button>                        
                    </div>
                    <Button router='/introduce' buttonName="이전"/>
                    <Button router='/' buttonName="다음"/>
                </div>
            </div>
        );
    }

}

export default Preview;

