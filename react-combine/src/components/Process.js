import React, {Component} from 'react';
import Menu from './Menu'

class Process extends Component{
    
    render(){
        return (
            // <div>
            //     <div id="agenda_wrap">
            //         <div className="agenda_container">
            //             <Menu title={"기본 정보"}/>
            //             <Menu title={"구분 선택"}/>
            //             <Menu title={"인적 사항"}/>
            //             <Menu title={"성적 입력"}/>
            //             <Menu title={"자기소개서"} subtitle={"학업계획서"}/>
            //         </div>
            //     </div>
            // </div>
            <div>
                <svg id="svg">
                    <path d="M60 18 L60 508" stroke="white" strokeWidth="10"/>
                    <circle className="point" id="point_step1" cx="60" cy="20" r="16" stroke-width="3" />
                    <circle className="point" id="point_step2" cx="60" cy="100" r="16" stroke-width="3" />
                    <circle className="point" id="point_step3" cx="60" cy="180" r="16" stroke-width="3" />
                    <circle className="point" id="point_step4" cx="60" cy="260" r="16" stroke-width="3" />
                    <circle className="point" id="point_step5" cx="60" cy="340" r="16" stroke-width="3" />
                    <circle className="point" id="point_step6" cx="60" cy="420" r="16" stroke-width="3" />
                    <circle className="point" id="point_step7" cx="60" cy="500" r="16" stroke-width="3" />
                    <text x="100" y="28" fill="white">기본정보</text>
                    <text x="100" y="108" fill="white">구분선택</text>
                    <text x="100" y="188" fill="white">인적사항</text>
                    <text x="100" y="268" fill="white">성적입력</text>  
                    <text x="100" y="348" fill="white">자기소개서</text>
                    <text x="100" y="370" fill="white">학업계획서</text>
                    <text x="100" y="428" fill="white">미리보기</text>
                    <text x="100" y="508" fill="white">최종제출</text>
                </svg>
            </div>
        );     
        
    }
}

export default Process;