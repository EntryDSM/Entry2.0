import React, {Component} from 'react';
import '../css/Principal.css'
class Principal extends Component {

    constructor() {
        super();
    }
 
     render() {
         return(
            <div id="principal">
                <div id="principal_box">
                    <div id="title_box">
                        학 교 장 추 천 서
                    </div>
                    <div id="content_box">
                        <div id="header_box">
                            [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;] 중학교 <br/>
                            3학년 &nbsp;&nbsp;&nbsp;반 <br/>
                            성 명 :
                        </div>
                        <table id="type_box">
                            <tbody>
                                <tr>
                                    <td colSpan="4">
                                        특별전형 추천분야(해당란에 O표)
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan="2">전형 유형</td>
                                    <td rowSpan="2">마이스터 인재전형</td>
                                    <td colSpan="2">사회통합 전형</td>
                                </tr>
                                <tr>
                                    <td>기회 균등</td>
                                    <td>사회 다양성</td>
                                </tr>
                                <tr>
                                    <td>대전시 교육청 관내</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>대전시 교육청 관외</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="explain_box">
                            &nbsp;&nbsp;위 학생은 소프트웨어 분야 마이스터로 성장할 수 있는 잠재력이 있으며,
                            2018학년도 대덕소프트웨어마이스터 고등학교 신입생 입학전형(특별전형) 지원 자격을 갖추었으므로 귀교의 특별전형 대상자로 추천합니다.
                        </div>
                        <div id="date_box">
                            2017 년 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일
                        </div>
                        <div id="teacher_box">
                            <div id="teacher_name">
                                작성자 담임 : 
                            </div>
                            <div id="sign_box">
                                (인)
                            </div>
                        </div>
                        <div id="principal_name">
                            [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;] 중학교장
                        </div>
                        <div id="stamp_box">
                            출신중학교장<br/>
                            직인
                        </div>
                        <div id="footer">
                            대덕소프트웨어마이스터고등학교장 귀하
                        </div>
                    </div>
                </div>
            </div>
         )
    }
}

export default Principal;