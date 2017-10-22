import React, {Component} from 'react';

class Volunteer extends Component{
    render(){
        return (
            <div id="volunteer_div" style={{display: this.props.visible}}>
                <div className="grade_table_title">봉사시간</div>
                <table className="grade_table">
                    <tbody>
                        <tr>
                            <td id="volunteer_title">시간</td>
                            <td id="volunteer_content">
                                <input id="volunteer_input" type="text" value={this.props.volunteer} onChange={this.props.setVolunteer} maxLength="3"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Volunteer;