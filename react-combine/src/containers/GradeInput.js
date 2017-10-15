import React, {Component} from 'react';
import Graduate from '../components/GraduateToBe';
import Graduated from '../components/Graduated';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import Volunteer from '../components/Volunteer';
import Attend from '../components/Attend';
import '../css/InputHeader.css';
import '../css/GradeInput.css';

class GradeInput extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            graduated: null,
            graduate_to_be: "hide",
            black: null
        };
    }

    componentDidMount(){
        var pointbefore = document.getElementById("point_step3");
        var pointnow = document.getElementById("point_step4");
        var pointnext = document.getElementById("point_step5");
        pointnow.style.fill = "salmon";
        pointbefore.style.fill = "#B9B4B4";
        pointnext.style.fill = "#B9B4B4";
    }

    render(){
        return(
            <div id="contents">
                <InputHeader now={"성적입력"}/>
                <div id="volunteerAttendWrapper">
                    <Volunteer />
                    <Attend />
                </div>
                <table id="grade_input_table">
                    <Graduate visible={this.state.graduate_to_be}/>
                    <Graduated  visible={this.state.graduated}/>
                </table>
                <Button router="infoinput" buttonName="이전"/>
                <Button router="introduce" buttonName="다음"/>
            </div>
        );
    }
}

export default GradeInput;