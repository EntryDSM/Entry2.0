import React, {Component} from 'react';

class Attend extends Component{
    constructor(props){
        super(props);
        this.state = {
            unauthorizedDays: [
                {name: "전체 무단 결석 일수"},
                {name: "전체 무단 지각 일수"},
                {name: "전체 무단 조퇴 일수"},
                {name: "전체 무단 결과 일수"}
            ]
        }
    }

    render(){
        let attend_grades = [
            "absence",
            "late",
            "leaving_early",
            "not_attendence"
        ];
        return(
            <div id="attend_table">
                <div className="grade_table_title">출석성적</div>
                <table className="grade_table">
                    <tbody>
                        {this.state.unauthorizedDays.map((unauthorizedDays, index) => {
                            return <UnauthorizedDay 
                                        unauthorizedDayType={unauthorizedDays.name}
                                        setAttendData={this.props.setAttendData}
                                        value={this.props.attendValue[index]}
                                        name={attend_grades[index]} 
                                        key={index}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class UnauthorizedDay extends Component{
    render(){
        let value = this.props.value;
        if(this.props.value === ''){
            value = 0;
        }
        return(
            <tr>
                <td id="unauthorize_title" className="grade_td_title">
                    {this.props.unauthorizedDayType}
                </td>
                <td className="grade_td_content">
                    <input id="unauthorized_input" type="text" name={this.props.name} value={value} onChange={this.props.setAttendData} maxLength="3" />
                </td>
            </tr>
        );
    }
}

export default Attend;