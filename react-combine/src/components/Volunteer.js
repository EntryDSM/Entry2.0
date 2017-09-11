import React, {Component} from 'react';

class Volunteer extends Component{
    constructor(props){
        super(props);
        this.state = {
            volGrade: 0
        }
        this.gradeChange = this.gradeChange.bind(this);
    }

    gradeChange(e){
        let grade = e.target.value;
        if(isNaN(grade) === true){
            grade = 0;
        }
        this.setState({
            volGrade: grade
        });
    }

    render(){
        return (
            <div id="volunteer_div">
                <div className="grade_table_title">봉사시간</div>
                <table className="grade_table">
                    <tbody>
                        <tr>
                            <td id="volunteer_title">시간</td>
                            <td id="volunteer_content">
                                <input id="volunteer_input" type="number"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Volunteer;