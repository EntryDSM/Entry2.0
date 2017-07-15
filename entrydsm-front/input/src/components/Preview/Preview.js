import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Preview.css';
import InputLayout from '../InputLayout/InputLayout';
import PreviewHeader from './PreviewHeader/PreviewHeader';
import PreviewContent from './PreviewContent/PreviewContent';

class Preview extends Component {

    constructor() {
        super();
        
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
            <div id={styles.contents}>
                <div id="menu-area">
                    <div id="header-area">
                        <InputHeader now={"미리보기"} />
                    </div>

                    <div id="section-to-print">
                        <PreviewHeader datas={this.state.pageList} />
                        <PreviewContent target={this.props.targetPage} />
                    </div>

                    <button className={styles.printButton} onClick={printHandler}>출력하기</button>
                </div>
            </div>
        );
    }

}

export default Preview;

