import React, {Component} from 'react';
import Menu from './Menu'

class Process extends Component{
    render(){
        return (
            <div>
                <div id="agenda_wrap">
                    <div className="agenda_container">
                        <Menu title={"기본 정보"}/>
                        <Menu title={"구분 선택"}/>
                        <Menu title={"인적 사항"}/>
                        <Menu title={"성적 입력"}/>
                        <Menu title={"자기소개서"} subtitle={"학업계획서"}/>
                    </div>
                </div>
            </div>
            // <div>
            //     <svg id="svg">
            //         <path d="M60 20 L60 500" stroke="white" strokeWidth="11"/>
            //         <circle className="point" cx="60" cy="20" r="16" stroke-width="3" />
            //         <circle className="point" cx="60" cy="120" r="16" stroke-width="3" />
            //         <circle className="point" cx="60" cy="220" r="16" stroke-width="3" />
            //         <circle className="point" cx="60" cy="320" r="16" stroke-width="3" />
            //         <circle className="point" cx="60" cy="420" r="16" stroke-width="3" />
            //         <text x="100" y="28" fill="white">기본정보</text>
            //         <text x="100" y="128" fill="white">구분선택</text>
            //         <text x="100" y="228" fill="white">인적사항</text>
            //         <text x="100" y="328" fill="white">성적입력</text>
            //         <text x="100" y="428" fill="white">자기소개서</text>
            //         <text x="100" y="450" fill="white">학업계획서</text>
            //     </svg>
            // </div>
        );        
    }
}

export default Process;