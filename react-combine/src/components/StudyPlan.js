import React, {Component} from 'react';

class StudyPlan extends Component {
     render() {
        return(
            <div id="study_plan">
                <div id="introduce_header">
                    <span id="header">학업계획서</span>
                </div>
                <div id="userinfo">
                    <table id="userinfo_table">
                        <tbody>
                            <tr>
                                <td className="td_title" id="name">성 명</td>
                                <td className="td_content">{this.props.name}</td>
                            </tr>
                            <tr>
                                <td className="td_title">출신중학교</td>
                                <td className="td_content">{this.props.school}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="introduce_content">
                    <table id="content_table">
                        <tbody>
                            <tr id="content">
                                <td className="td_content">{this.props.selfintroduce}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StudyPlan;