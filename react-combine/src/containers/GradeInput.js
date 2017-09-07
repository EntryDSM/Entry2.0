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
            postData: {

            },
            absence: 0,
            late: 0,
            leaving_early: 0,
            not_attendence: 0,
            graduated: null,
            graduate_to_be: "hide",
            black: null
        };
    }

    setAttendData(e){
        switch(e.target.name){
            case "absence": {
                this.setState({
                    absence: e.target.value
                })
                break;
            }
            case "late": {
                this.setState({
                    late: e.target.value
                })
                break;
            }
            case "leaving_early": {
                this.setState({
                    leaving_early: e.target.value
                })
                break;
            }
            case "not_attendence": {
                this.setState({
                    not_attendence: e.target.value
                })
                break;
            }
        }
    }

    render(){
        let attendData = [
            this.state.absence,
            this.state.late,
            this.state.leaving_early,
            this.state.not_attendence
        ];
        console.log(attendData);
        return(
            <div id="contents">
                <InputHeader now={"성적입력"}/>
                <div id="volunteerAttendWrapper">
                    <Volunteer />
                    <Attend 
                        setAttendData={this.setAttendData.bind(this)}
                        attendValue={attendData} />
                </div>
                <table id="grade_input_table">
                    <Graduate visible={this.state.graduate_to_be}/>
                    <Graduated visible={this.state.graduated}/>
                </table>
                <Button router="infoinput" buttonName="이전"/>
                <Button router="introduce" buttonName="다음"/>
            </div>
        );
    }
}

export default GradeInput;