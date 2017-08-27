import React, { Component } from 'react';
import '../css/Mypage.css';

class Mypage extends Component {
  render() {
    return (
      <div id="my-page">
        <Logo imgURL={require('../images/DSM Logo.png')} />
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
        },{
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        },{
          no: 124,
          title: "이건 제목 테스트입니다.",
          author: "Panle",
          date: "2017-07-10"
        },{
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
    <div>
      <img src={props.imgURL} alt="Logo" id="logoImg" />
      <h2>My Page</h2>
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



class NoticeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOverflow: false,
      isOpened: false
    };

    this.openMoreList = this.openMoreList.bind(this);
  }

  openMoreList() {
    this.setState({
      isOpened: true
    });
  }

  componentDidMount() {

  }

  render() {
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

            {this.props.posts.map((post, i)=> {
              if (i < 5)
                return (
                  <tr key={i}>
                    <td>{post.no}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                  </tr>);
              else if (i === 5)
                return (
                  <tr key={i} hidden={this.state.isOpened?true:false}>
                    <button onClick={this.openMoreList}>더 보기</button>
                  </tr>
                )
              else if (i > 5)
                return (
                  <tr hidden={ this.state.isOpened ? false:true}
                  key={i}>
                    <td>{post.no}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Mypage;