import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import EntryView from '../components/EntryView'
import SchoolIntro from '../components/SchoolIntro'
import Footer from '../components/MainFooter'
import ApplyState from '../components/ApplyState';
import RenewalMain from '../components/RenewalMain';
import '../css/MainPage.css'

class MainPage extends Component {
  render() {
    return (
      <div id="main-page">
        <NavigationBar menuList={["메인화면","접수현황","학교소개","문의하기","게시판"]}/>
        {/* <EntryView /> */}
        <RenewalMain />
        <ApplyState/>
        <SchoolIntro schoolInfos={
        [{
          title : "입학생 전원 무료 노트북 지급",
          description : `모든 신입생들에게 사양 좋은 노트북이 증정! 
자습시간에는 과제를
수업시간에는 실습을
방과후에는 프로젝트를
주말 자유시간에는 게임을 할 수가 있다.`,
          imgURL : require("../images/notebook.png"),
          direction : "right"
        },{
          title : "재학생 전원 무료 기숙사 생활",
          description : `전국에서 오는 학생들이 학교 생활을 할까? 
우리 학교는 재학생 전원이 기숙사 생활을 한다!
기숙사 생활을 하면서 친구, 선후배와 돈독한 우정을!
기숙사비가 얼마냐고요?
이 기숙사는 무료로 해줍니다!`,
          imgURL : require("../images/bunk-bed.png"),
          direction : "left"
        },{
          title : "전공도서만 2000권있는 도서관",
          description : `전공 서적 비싸던데 학교에서 안사주나요...?
우리 학교는 전공서적이 엄청나다 무려 2000권이 전공도서!
외부 사람들도 방문하면 칭찬한다는 도서관!
도서관은 다 옛날 책들뿐이라고?
우리 학교는 매달 최신 전공도서가 들어온다고~`,
          imgURL : require("../images/books-color.png"),
          direction : "right"
        },{
          title : "각종 장비가 있는 학과별 실습실",
          description : `각종 부품과 모니터가 있어 실습에 유용한 임베디드실
쿼드모니터로 트래픽 모니터링 활용 가능한 보안실
성능 좋은 데스크탑과 라즈베리파이가 있는 소프트웨어실
전공 선생님께 말씀드리면 언제든 사용 가능!
`,
          imgURL : require("../images/computer-class-room.png"),
          direction : "left"
        },{
          title : "입학과 동시에 취업 확정",
          description : `약 240개의 회사와 MOU 체결 
공기업부터 대기업,중소기업 그리고 스타트업까지
자신이 원하는 회사를 골라서 준비하면 된다
학교에 취업을 도와주는 취업 지원 센터까지!
                        `,
          imgURL : require("../images/businessman.png"),
          direction : "right"
        }]
        }/>
        <Footer/>
      </div>
    );
  }
}

export default MainPage;
