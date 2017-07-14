import React, {Component} from 'react';
import styles from './Principal.css';
 
class Principal extends Component {

    constructor() {
        super();
    }
 
     render() {
         return(
            <div>
                <style>{"table{border:1px solid black;}"}</style>
                <h1>학&nbsp;교&nbsp;장&nbsp;추&nbsp;천&nbsp;서</h1>
                <div id="main">
                    <h4>[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]중학교&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    <h4>3학년 &nbsp;&nbsp;&nbsp;반&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    <h4>성&nbsp;&nbsp;명 :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    <table id="table">
                        <tbody>
                            <tr>
                                <td colSpan="4">
                                    <h3>특별전형 추천분야(해당란에 O표)</h3></td>
                            </tr>
                            <tr>
                                <td rowSpan="2"><strong>전형 유형</strong></td>
                                <td rowSpan="2" className={styles.meisterCell}><strong>마이스터 인재전형</strong></td>
                                <td colSpan="2"><strong>사회통합 전형</strong></td>
                            </tr>
                            <tr>
                                <td className={styles.width3cm}><strong>기회 균등</strong></td>
                                <td className={styles.width3cm}><strong>사회 다양성</strong></td>
                            </tr>
                            <tr>
                                <td className={styles.width1cm}><strong>대전시 교육청 관내</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={styles.width1cm}><strong>대전시 교육청 관외</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div id="text">
                        <h3>&nbsp;&nbsp;위 학생은 소프트웨어 분야 마이스터로 성장할 수 있는 잠재력이 있으며, 2018학년도 대덕소프트웨어마이스터고등학교 신입생 입학전형(특별전형) 지원 자격을 갖추었으므로 귀교의 특별전형 대상자로 추천합니다.</h3>
                        <br/>
                        <h2>201&nbsp;&nbsp;&nbsp;년 &nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;일 </h2>
                        <p id="text2">작성자 담임 :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(인)</p>
                        <br/>
                        <table id="mainbox">
                            <tbody>
                                <tr>
                                    <td>
                                        <p id="text3">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]중학교장</p>
                                    </td>
                                    <td id="box2"></td>
                                    <td id="box">출신중학교장
                                        <br/>직인</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <p id="text4">대덕소프트웨어마이스터고등학교장 귀하</p>
                </div>
            </div>
         )
    }
}

export default Principal;