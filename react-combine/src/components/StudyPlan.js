import React, {Component} from 'react';

class StudyPlan extends Component {
     render() {
        return(
            <div id="studyplan">
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
                            <tr>
                                <td id="content_explain"><span id="big_text">◎ 학업계획서</span>는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위해 생각하는 학업계획을 상세하게 기술하십시오.</td>
                            </tr>
                            <tr>
                                <td id="content_texts"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StudyPlan;