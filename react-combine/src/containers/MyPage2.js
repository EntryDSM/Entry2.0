import React, { Component } from 'react';
import '../css/MyPage2.css';
import MyHeader from '../components/MyHeader';

class MyPage2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkImgSrc: [
                "",
                "",
                "",
                "",
                ""
            ]
        }
    }

    componentDidMount(){
        console.log('heleo');
        let checkArr = ["", "", "", "", ""];
        checkArr.forEach((elem, index) => {
            console.log("check!");
            if(this.props.check[index] === false){
                checkArr[index] = require("../images/myCancel.png");
            } else if(this.props.check[index] === true){
                checkArr[index] = require("../images/mySuccess.png");
            }
        });
        this.setState({
            checkImgSrc: checkArr
        })
    }

    render(){
        return(
            <div id="mypage2">
                <MyHeader PageTitle = "MY PAGE"/>
                <MySection MainTitle1 = "접수 현황"
                           MainTitle2 = "내가 올린 게시글"
                           checkUrl = {this.state.checkImgSrc}/>
                <MyFooter/>
            </div>
        );
    }
}
MyPage2.defaultProps = {
    check: [
        true,
        false,
        false,
        true,
        false
    ]
}


class MySection extends Component{
    render(){
        return(
            <section>
                <h1> {this.props.MainTitle1} </h1>
                <ChecksCover
                    checkUrl = {this.props.checkUrl}
                    checkArrs = {
                        [
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "CheckTitles",
                                CheckTitle : "구분선택",
                                CheckTitle2 : "Classification",
                                ImgUrl1 : require("../images/myClassi.png")
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "CheckTitles",
                                CheckTitle : "인적사항",
                                CheckTitle2 : "Personal Information",
                                ImgUrl1 : require("../images/myInfo.png")
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "CheckTitles",
                                CheckTitle : "성적입력",
                                CheckTitle2 : "Grade Input",
                                ImgUrl1 : require("../images/myGrade.png")
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "CheckTitles",
                                CheckTitle : "자기소개서 / 학업계획서",
                                CheckTitle2 : "Introduction",
                                ImgUrl1 : require("../images/myIntro.png")
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "CheckTitles",
                                CheckTitle : "최종 제출 여부",
                                CheckTitle2 : "Submission",
                                ImgUrl1 : require("../images/myRoute.png")
                            }
                        ]
                    }/>
                <CheckBtn BtnText = "확인하기"/>

                <h1 style = {{marginTop : 5 + 'rem'}}> {this.props.MainTitle2} </h1>

                <CheckTables posts = {
                    [
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        },
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        },
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        },
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        },
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        },
                        {
                            no: 124,
                            title: "이건 제목 테스트입니다.",
                            author: "Panle",
                            date: "2017-07-10"
                        }
                    ]
                }/>
            </section>
        );
    }
}

class ChecksCover extends Component{
    render(){
        return(
            <div id = "checksCover">
                {this.props.checkArrs.map((info, i) => {
                    return(
                        <div className = {info.ClassName} key = {i}>
                            <div className = {info.ClassName2}>
                                <span style = {{fontWeight : "bold"}}>
                                    {info.CheckTitle}
                                </span>
                                <br/>
                                {info.CheckTitle2}
                            </div>
                            <img src = {info.ImgUrl1} className = "mainImgs" alt = "imgs"/>
                            <CheckImgs checkUrl={this.props.checkUrl[i]}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const CheckImgs = (props) => {
    return(
        <img src={props.checkUrl} className="checkImg" />
    );
}

const CheckBtn = (props) => {
    return(
        <div id = "checkBtn">
            {props.BtnText}
        </div>
    );
}

class CheckTables extends Component{
    render(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>질문 제목</th>
                        <th>작성자</th>
                        <th>작성일자</th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.posts.map((post, i) => {
                        return(
                            <tr key = {i}>
                                <td> {post.no} </td>
                                <td> {post.title} </td>
                                <td> {post.author} </td>
                                <td> {post.date} </td>
                            </tr>
                        );
                    })}
                </tbody>

                <tfoot>
                     
                </tfoot>
            </table>
        );
    }
}

class MyFooter extends Component{
    render(){
        return(
            <footer>

            </footer>
        );
    }
}

export default MyPage2;