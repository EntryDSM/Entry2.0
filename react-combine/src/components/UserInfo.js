import React, {Component} from 'react';
 
class UserInfo extends Component {
    render() {
        let datas = this.props.datas();
        let date = new Date;

        if(datas.isCountryMerit === true){
            document.getElementById('country_merit_area').style.visibility = 'visible';
        }

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
                                <td colSpan="2">{datas.submitNumber}</td>
                                <td>중학교 코드</td>
                                <td>{datas.schoolCode}</td>
                                <td>반</td>
                                <td>{datas.class}</td>
                                <td colSpan="2">수험번호</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td rowSpan="2">지원자<br/>인적사항</td>
                                <td>성명</td>
                                <td>{datas.name}</td>
                                <td>생년월일</td>
                                <td colSpan="3">{datas.birth}</td>
                                <td>성별</td>
                                <td colSpan="2">
                                    <input type="checkbox" checked={datas.sex === '남'} readOnly />
                                    남
                                    &nbsp;&nbsp;&nbsp;<input type="checkbox" checked={datas.sex === '여'} readOnly />
                                    여
                                </td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td colSpan="8">{datas.address}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_2">
                        <tbody>
                            <tr>
                                <td rowSpan="3">연락처</td>
                                <td>보호자</td>
                                <td>{datas.parentsTel}</td>
                                <td rowSpan="3">졸업<br/>구분</td>
                                <td>
                                    <input type="checkbox" checked={datas.graduation === 'WILL'} readOnly />
                                    &nbsp;&nbsp;&nbsp;2018년 중학교 졸업예정
                                </td>
                            </tr>
                            <tr>
                                <td>학교</td>
                                <td>{datas.schoolTel}</td>
                                <td>
                                    <input type="checkbox" checked={datas.graduation === 'DONE'} readOnly />
                                    &nbsp;&nbsp;&nbsp;{datas.graduateYear}년 중학교 졸업
                                </td>
                            </tr>
                            <tr>
                                <td>학생</td>
                                <td>{datas.phoneNum}</td>
                                <td>
                                    <input type="checkbox"/>
                                    &nbsp;&nbsp;&nbsp;고입 검정고시 합격
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_3">
                        <tbody>
                            <tr>
                                <td rowSpan="4">전형유형</td>
                                <td colSpan="2">
                                    <input type="checkbox" checked={datas.type === 'COMMON'} readOnly/>
                                    일반전형
                                </td>
                                <td rowSpan="4">지원자<br/>특기<br/>사항</td>
                                <td rowSpan="2">
                                    <input type="checkbox" checked={datas.isCountryMerit} readOnly/>
                                    국가유공자자녀
                                </td>
                                <td rowSpan="4">지역</td>
                                <td rowSpan="2">
                                    <input type="checkbox" checked={datas.local === 'HOME'}/>
                                    대전
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="2">
                                    <input type="checkbox" checked={datas.type === 'MEISTER'} readOnly/>
                                    마이스터인재전형
                                </td>
                                <td rowSpan="3">특별<br/>전형</td>
                            </tr>
                            <tr>
                                <td rowSpan="2">
                                    <input type="checkbox" checked={datas.isSpecial} readOnly/>
                                    특례입학대상자
                                </td>
                                <td rowSpan="2">
                                    <input type="checkbox" checked={datas.local === 'AWAY'}/>
                                    전국
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" checked={datas.type === 'SOCIAL'} readOnly/>
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
                                <td>1학년<br/>환산점수</td>
                                <td>2학년<br/>환산점수</td>
                                <td>3학년<br/>환산점수</td>
                                <td>교과성적<br/>환산점수</td>
                            </tr>
                            <tr>
                                <td>{Number(datas.firstGrade).toFixed(3)}</td>
                                <td>{Number(datas.secondGrade).toFixed(3)}</td>
                                <td>{Number(datas.thirdGrade).toFixed(3)}</td>
                                <td>{Number(datas.totalSubjectGrade).toFixed(3)}</td>
                                <td>{Number(datas.attend).toFixed(3)}</td>
                                <td>{Number(datas.volunteer).toFixed(3)}</td>
                                <td>{Number(datas.totalGrade).toFixed(3)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="userinfo_table_5">
                        <tbody>
                            <tr>
                                <td>
                                    <div id="country_merit_area">
                                        <p>
                                            보훈번호:( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )
                                            <br/>
                                            위는 국가유공자
                                            <br/>
                                            자녀임을 확인함
                                            <br/>
                                            2017. 10. {date.getDate()}.
                                            <br/>
                                            담임 교사: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (인)
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <p>본인은 귀 고등학교에 입학하고자 소정의 서류를 갖추어 지원합니다.</p>
                                    <p>2017년 10월 {date.getDate()}일</p>
                                    <p>지원자:&nbsp; {datas.name} (인)&nbsp;&nbsp;&nbsp; 보호자:&nbsp; {datas.parentsName} (인)</p>
                                    <br />
                                    <br />
                                    <h2>대덕소프트웨어마이스터고등학교장 귀하</h2>
                                </td>
                                <td>
                                    <img id="profile" src="/api/upload/profile" />
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
                                        본 입학원서의 내용은 사실과 다름이 없으며 상기자는 귀교에 입학 적격자로 인정되므로 추천합니다.
                                        <br/>
                                        2017년&nbsp;&nbsp;&nbsp;10월&nbsp;&nbsp;&nbsp;{date.getDate()}일
                                    </p>
                                    <p>
                                        <span style = {{wordSpacing : "2rem",
                                                        paddingLeft : "12.8rem",
                                                        fontSize : "0.8rem"}}>
                                            담임교사: &nbsp; (인)
                                        </span>
                                        <span style = {{paddingLeft : "11.5rem",
                                                        fontSize : "0.8rem"}}>
                                            (<span style = {{paddingLeft : "1.5rem",
                                                             paddingRight : "1.5rem"}}></span>) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;중학교장 (직인)
                                        </span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p style = {{fontWeight : "bold", 
                                 fontSize : "1rem",
                                 textAlign : "center",
                                 paddingRight : "2rem"}}>개인정보 활용 동의서
                    </p>

                    <div id = "agreeCover"
                         style = {{border : "1px solid",
                                   height : "15rem",
                                   fontSize : "0.75rem",
                                   lineHeight : "1.4",
                                   padding : "5px",
                                   letterSpacing : "0.1px"}}>
                        본 입학원서에 기재된 지원자의 개인정보는 신입생 입학관리업무의 원활한 수행을 위하여 개인정보의 수집. 유출. 오용. 남용으로부터 
                        사생활의 비밀 등을 보호하도록 한 개인정보보호법 규정에 따라 다음과 같이 수집.이용.제공됩니다. <br/>
                        1. (개인정보 처리의 법령상 근거) 본 입학원서에 기재된 개인정보의 처리업무는 초.중등교육법 제 47조 및 동법 시행령 제 81조, 제 
                        82조, 제84조, 제 98조 및 본교의 입학전형 실시계획 등에 근거하고 있습니다. <br/>
                        2. (정보주체의 권리) 지원자는 자신이 제공한 개인정보에 대하여 개인정보 보호법 제 4조 및 제 35조로부터 제 38조까지에 따라 열람.
                        처리.정지.정정.삭제.파기 등을 요구할 수 있으며, 개인정보 보호법을 위반한 행위로 인한 손해 발생시에는 개인정보 보호법 제 39조에 따라 
                        손해배상을 청구할 수 있습니다.<br/>
                        3. (개인저보 수집항목) 입학관리 업무의 원활한 수행을 위하여 수집하는 개인정보는 성명, 생년월일, 증명사진, 주소, 전화번호, 학력, 출결사항, 
                        교과성적 등입니다.<br/>
                        4. (개인정보의 수집.이용 목적) 수집한 지원자의 개인정보는 원서접수, 지원자격, 지원결격 사유 확인, 지원자 본인확인, 성적산출, 합격자 명부 관리, 
                        합격증명서 발급, 성적 통지, 통계자료 산출 등 입학관리 업무를 위한 정보로 이용됩니다.<br/>
                        5. (개인정보 제공) 수집한 개인정보는 지원자격.지원결격 사유 조회 및 교과성적 확인 등을 위하여 지원자가 졸업한 중학교 등 
                        관련된 기관에 제공될 수 있습니다. <br/>
                        6. (개인정보의 보유기간 및 이용기간) 수집한 개인정보는 입학관리 업무를 계속하는 동안 보유.이용할 수 있으며, 입학관리 업무 완료 후 
                        본인의 삭제요청이 있을 경우에는 모두 삭제됩니다.<br/>
                        7. (개인정보의 수집.이용.제공에 대한 동의 거부) 지원자는 개인정보의 수집.이용.제공에 대한 동의를 거부할 수 있으며, 동의를 거부할 경우 
                        지원결격 사유 조회 등 입학관리 업무를 수행할 수 없으므로 원서를 접수할 수 없습니다.
                    </div>

                    <p style = {{fontSize : "0.8rem",
                                 fontWeight : "bold",
                                 textAlign : "left",
                                 paddingLeft : "0.4rem",
                                 letterSpacing : "0.5px"}}>
                      본 입학원서의 개인정보 수집.이용.제공에 동의합니다.  
                    </p>

                    <p style = {{textAlign : "right",
                                 fontSize : "0.8rem",
                                 marginTop : "-10px"}}>
                        <span>
                            지원자 성명 <span style = {{paddingLeft : "1.5rem",
                                                       paddingRight : "1.5rem"}}>
                                                {datas.name}
                                       </span>(인)
                        </span>

                        <span style = {{display : "block"}}>
                            보호자 성명 <span style = {{paddingLeft : "1.5rem",
                                                       paddingRight : "1.5rem"}}>
                                                {datas.parentsName}
                                       </span>(인)
                        </span>
                    </p>

                    <p style = {{fontWeight : "bold",
                                 fontSize : "1rem",
                                 marginTop : "-15px"}}>
                        대덕소프트웨어마이스터고등학교장 귀하
                    </p>
                </div>
            </div>
        );
    }
}

export default UserInfo;