import React, { Component } from 'react';
import './css/mypage.css'
class App extends Component {
  render() {
    return (
      <div>
        <Logo imgURL="./imgs/log3.png" />
        <CompleteTemplate />
        <NoticeTable posts={[{
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }, {
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        }]} />
      </div>
    );
  }
}

const Logo = (props) => {
  return (
    <img src={props.imgURL} alt="Logo" id="logoImg" />
  )
}

const NoticeTable = (props) => {
  return (
    <div id="notice-table">
      <h2>내가 올린 게시글</h2>
      <table>
        <thead>
          <tr>
            <td>NO.</td>
            <td>질문 제목</td>
            <td>작성자</td>
            <td>작성일자</td>
          </tr>
        </thead>
        <tbody>
          {props.posts.map((post, i) => {
            return (
              <tr key={i}>
                <td>{post.no}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
              </tr>);
          })}
        </tbody>
      </table>
    </div>
  )
}

const CompleteTemplate = () => {
  return (
    <div id="apply-condition">
      <h2>접수 현황</h2>
      <table>
        <thead>
          <tr>
            <td>구분 선택</td>
            <td>인적사항</td>
            <td>성적입력</td>
            <td>자기소개서 / 학업계획서</td>
            <td>최종 제출 여부</td>
            <td>원서 확인</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>O</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td><button>확인하기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App;