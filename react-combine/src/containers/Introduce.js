import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import WritingArea from '../components/WritingArea';
import Button from '../components/Button';
import '../css/Introduce.css';

class Introduce extends Component {
    render(){
        return(
            <div id="contents">
                <InputHeader now={"자기소개서 및 학업계획서"} />
                <div id="area">
                    <h4 className="h4_style">자기소개서</h4>
                    <WritingArea />
                    <h4 className="h4_style">학업계획서</h4>
                    <WritingArea />
                </div>
                <Button router="gradeinput" buttonName="이전"/>
                <Button router="preview" buttonName="다음"/>
            </div>
        );
    }
}

export default Introduce;