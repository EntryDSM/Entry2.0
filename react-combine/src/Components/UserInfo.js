import React, {Component} from 'react';
 
class UserInfo extends Component {
     render() {
        return(
            <div id="userinfo">
                <div id="header">
                    <h2 id="title">
                        2018학년도 대덕소프트웨어마이스터고등학교 입학원서
                    </h2>
                </div>
                <div id="content">
                    <table id="userinfo_table_1">
                        <tbody>
                            <tr>
                                <td>접수번호</td>
                                <td colSpan="2"></td>
                                <td>중학교 코드</td>
                                <td></td>
                                <td>반</td>
                                <td></td>
                                <td colSpan="2">수험번호</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowSpan="2">지원자<br/>인적사항</td>
                                <td>성명</td>
                                <td></td>
                                <td>생년월일</td>
                                <td colSpan="3"></td>
                                <td>성별</td>
                                <td colSpan="2">
                                    <input type="checkbox"/>
                                    남
                                    &nbsp;&nbsp;&nbsp;<input type="checkbox"/>
                                    여
                                </td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td colSpan="8"></td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_2">
                        <tbody>
                            <tr>
                                <td rowSpan="3">전화<br/>연락처</td>
                                <td>보호자</td>
                                <td></td>
                                <td rowSpan="3">졸업<br/>구분</td>
                                <td>
                                    <input type="checkbox"/>
                                    &nbsp;&nbsp;&nbsp;2018년 중학교 졸업예정
                                </td>
                            </tr>
                            <tr>
                                <td>학교</td>
                                <td></td>
                                <td>
                                    <input type="checkbox"/>
                                    &nbsp;&nbsp;&nbsp;2017년 중학교 졸업
                                </td>
                            </tr>
                            <tr>
                                <td>학생</td>
                                <td></td>
                                <td>
                                    <input type="checkbox"/>
                                    &nbsp;&nbsp;&nbsp;2017년 고입 검정고시 합격
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_3">
                        <tbody>
                            <tr>
                                <td rowSpan="4">전형유형</td>
                                <td colSpan="2">
                                    <input type="checkbox"/>
                                    일반전형
                                </td>
                                <td rowSpan="4">지원자<br/>특기<br/>사항</td>
                                <td rowSpan="2">
                                    <input type="checkbox"/>
                                    국가유공자자녀
                                </td>
                                <td rowSpan="4">지역</td>
                                <td rowSpan="2">
                                    <input type="checkbox"/>
                                    대전
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="2">
                                    <input type="checkbox"/>
                                    마이스터인재전형
                                </td>
                                <td rowSpan="3">특별<br/>전형</td>
                            </tr>
                            <tr>
                                <td rowSpan="2">
                                    <input type="checkbox"/>
                                    특례입학대상자
                                </td>
                                <td rowSpan="2">
                                    <input type="checkbox"/>
                                    전국
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox"/>
                                    사회통합전형
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_4">
                        <tbody>
                            <tr>
                                <td rowSpan="3">내신성적</td>
                                <td colSpan="4">교과성적</td>
                                <td rowSpan="2">출석<br/>점수</td>
                                <td rowSpan="2">봉사활동<br/>점수</td>
                                <td rowSpan="2">총점</td>
                            </tr>
                            <tr>
                                <td>1학년<br/>평균평점</td>
                                <td>2학년<br/>평균평점</td>
                                <td>3학년<br/>평균평점</td>
                                <td>교과성적<br/>환산점수</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>50</td>
                                <td>50</td>
                                <td>150</td>
                                <td>15</td>
                                <td>15</td>
                                <td>180</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_5">
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        보훈번호:( 123456 )
                                        <br/>
                                        위는 국가유공자
                                        <br/>
                                        자녀임을 확인함
                                        <br/>
                                        2017. 10. 31.
                                        <br/>
                                        작성자: 정근철 (인)
                                    </p>
                                </td>
                                <td>
                                    <p>본인은 귀 고등학교에 입학하고자 소정의 소류를 갖추어 지원합니다.</p>
                                    <p>2017년 10월 31일</p>
                                    <p>지원자:&nbsp; 정근철 (인)&nbsp;&nbsp;&nbsp; 보호자:&nbsp; 정근철 (인)</p>
                                    <p>대덕소프트웨어마이스터고등학교장 귀하</p>
                                </td>
                                <td>
                                    <p>
                                        사진<br/>
                                        (3cm *  4cm)
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_6">
                        <tbody>
                            <tr>
                                <td>
                                    <p>추천서</p>
                                    <p>
                                        본 입학원서의 내용은 사실과 다름이 없으며 상기자는 귀교에 입학 적격자로 인정되었으므로 추천합니다.
                                        <br/>
                                        2017년&nbsp;&nbsp;&nbsp;10월&nbsp;&nbsp;&nbsp;31일
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="privacy">
                    <div id="title">
                        개인정보 활용 동의서
                    </div>
                    <div id="content">
                        본 입학원서에 기재된 지원자의 개인정보는 신입생 입학관리업무의 원활한 수행을 위하여 개인정보의 수집․유출․오용․남용으로부터 사생활의 비밀 등을 보호하도록 한 개인정보보호법 규정에 따라 다음과 같이 수집․이용․제공됩니다.<br/>
                        1. (개인정보 처리의 법령상 근거) 본 입학원서에 기재된 개인정보의 처리업무는 초․중등교육법 제47조 및 동법 시행령 제81조, 제82조, 제84조, 제98조 및 본교의 입학전형 실시계획 등에 근거하고 있습니다.<br/>
                        2. (정보주체의 권리) 지원자는 자신이 제공한 개인정보에 대하여 개인정보 보호법 제4조 및 제35조부터 제38조까지에 따라 열람․처리․정지․정정․삭제․파기 등을 요구할 수 있으며,  개인정보 보호법을 위반한 행위로 인한 손해 발생시에는 개인정보 보호법 제39조에 따라 손해배상을 청구할 수 있습니다.<br/>
                        3. (개인정보 수집항목) 입학관리 업무의 원활한 수행을 위하여 수집하는 개인정보는 성명, 생년월일, 증명사진, 주소, 전화번호, 학력, 출결사항․교과성적 등입니다.<br/>
                        4. (개인정보의 수집․이용 목적) 수집한 지원자의 개인정보는 원서접수, 지원자격․지원결격 사유 확인, 지원자 본인확인, 성적산출, 합격자 명부 관리, 합격증명서 발급, 성적 통지, 통계자료 산출 등 입학관리 업무를 위한 정보로 이용됩니다.<br/>
                        5. (개인정보 제공) 수집한 개인정보는 지원자격․지원결격 사유 조회 및 교과성적 확인 등을 위하여 지원자가 졸업한 중학교 등 관련된 기관에 제공될 수 있습니다.<br/>
                        6. (개인정보의 보유기간 및 이용기간) 수집한 개인정보는 입학관리 업무를 계속하는 동안 보유․이용할 수 있으며, 입학관리 업무 완료 후 본인의 삭제요청이 있을 경우에는 모두 삭제됩니다.<br/>
                        7. (개인정보의 수집․이용․제공에 대한 동의 거부) 지원자는 개인정보의 수집․이용․제공에 대한 동의를 거부할 수 있으며, 동의를 거부할 경우 지원결격 사유 조회 등 입학관리 업무를 수행할 수 없으므로 원서를 접수할 수 없습니다.<br/>
                    </div>
                    <div id="footer">
                        <p>본 입학원서의 개인정보 수집, 이용, 제공에 동의합니다.</p>
                        <p>
                            지원자 성명&nbsp;&nbsp;&nbsp;정근철&nbsp;&nbsp;&nbsp; (인)
                            <br/>
                            지원자 성명&nbsp;&nbsp;&nbsp;정근철&nbsp;&nbsp;&nbsp; (인)
                        </p>
                    </div>
                </div>
                <div id="userinfo_footer">
                    <p>대덕소프트웨어마이스터고등학교 귀하</p>
                </div>
            </div>
        );
    }
}

export default UserInfo;