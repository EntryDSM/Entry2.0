import React, {Component} from 'react';
import SelfIntroduce from './SelfIntroduce';
import StudyPlan from './StudyPlan';
import UserInfo from './UserInfo';
import Principal from './Principal';
 
class NoSmoke extends Component {

    constructor() {
        super();
    }
 
     render() {
        return(
            <div id="no_smoke">
                <div id="smoke_header">
                    <span>금연서약서</span>
                </div>
                
                <div id="table_area">
                    <table id="table_info">
                        <tbody>
                            <tr>
                                <td rowSpan="3" id="promise">서약서</td>
                                <td className="table_title">성&nbsp;&nbsp;명</td>
                                <td className="table_input"></td>
                                <td className="table_title">수험번호</td>
                                <td className="table_input"></td>
                            </tr>
                            <tr>
                                <td className="table_title">연락처</td>
                                <td className="table_input"></td>
                                <td className="table_title">출신학교</td>
                                <td className="table_input"></td>
                            </tr>
                            <tr>
                                <td class="table_title">주&nbsp;&nbsp;소</td>
                                <td colSpan="3" id="address"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="swear_content">
                    Hello!!!!!!!
                </div>
            </div>
        )
    }
}

export default NoSmoke;