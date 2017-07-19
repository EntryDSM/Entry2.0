import React, {Component} from 'react';
import Graduate from '../components/Graduate';
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
            graduated: "hide",
            graduate_to_be: null,
            black: null
        };
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