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
                                <td className="table_title">주&nbsp;&nbsp;소</td>
                                <td colSpan="3" id="address"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="swear_content">
                    <div id="swear_text">
                        하나, 나 자신의 건강을 위해서 흡연을 하지 않겠습니다. <br/> 
                        하나, 주위의 흡연의 유혹에도 절대로 흔들리지 않겠습니다. <br/>
                        하나, 주위의 흡연을 하는 친구가 있으면 충고하여 금연을 할 수 있도록 하겠습니다. <br/>
                        하나, 흡연은 만병의 근원임을 알고 입에도 대지 않겠습니다. <br/>
                        하나, 상기의 조항을 위반할 경우 어떠한 처벌에도 이의를 제기하지 않겠습니다.
                    </div>
                    <div id="swear_my">
                        나 <span id="blank">(</span>)은(는) 장차 소프트웨어 분야를 선도할 지도자로 성장하기 위하여 <br/>
                        그리고 자신과 미래의 배우자 및 자녀의 건강을 배려 하여 흡연을 하지 않겠습니다. <br/>
                        보호자 및 담임교사는 서약자가 금연을 하는데 용기와 도움을 줄 것을 약속하겠습니다.
                    </div>
                    <div id="swear_date">
                        2017년 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일
                    </div>
                    <div id="swear_sign">
                        서 약 자<span id="space">:</span> ( 서&nbsp;&nbsp;명 ) <br/>
                        보 호 자<span id="space">:</span> ( 서&nbsp;&nbsp;명 ) <br/>
                        담임교사<span id="space">:</span>( 서&nbsp;&nbsp;명 ) <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoSmoke;