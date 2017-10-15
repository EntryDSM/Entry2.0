import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import WritingArea from '../components/WritingArea';
import Button from '../components/Button';
import '../css/Introduce.css';

class Introduce extends Component {

    componentDidMount(){
        var pointbefore = document.getElementById("point_step4");
        var pointnow = document.getElementById("point_step5");
        var pointnext = document.getElementById("point_step6");
        pointnow.style.fill = "salmon";
        pointbefore.style.fill = "#B9B4B4";
        pointnext.style.fill = "#B9B4B4";
    }
    
    render(){
        return(
            <div id="contents">
                <InputHeader now={"자기소개서 및 학업계획서"} />
                <div id="area"> 
                    <h5 className="h5_style"><span className="title_style">◎ 자기소개서</span> 내용은 특별한 형식은 없으며 개인의 특성 및 성장 과정, 취미/특기, 학교생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완/발전시켜야 할 단점에 대하여 기술하십시오.</h5>
                    <WritingArea />
                    <h5 className="h5_style"><span className="title_style">◎ 학업계획서</span> 는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위해 생각하는 학업계획을 상세하게 기술하십시오.</h5>
                    <WritingArea />
                </div>
                <Button router="gradeinput" buttonName="이전"/>
                <Button router="preview" buttonName="다음"/>
            </div>
        );
    }
}

export default Introduce;