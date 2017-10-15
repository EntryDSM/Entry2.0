import React, { Component } from 'react';
import {browserHistory} from 'react-router';

class MySection extends Component{
    render(){
        return(
            <section>
                <h1> {this.props.MainTitle1} </h1>
                <div id="mypage_check">
                    전형료 입급확인 여부: {this.props.isPayment}
                    <br />
                    제출 서류(우편) 도착 여부: {this.props.isReceived}
                </div>
                <ChecksCover
                    checkUrl = {this.props.checkUrl}
                    checkArrs = {
                        [
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "checkTitles",
                                CheckTitle : "구분선택",
                                CheckTitle2 : "Classification",
                                ImgUrl1 : require("../images/myClassi.png"),
                                route: this.props.route,
                                id: "mClassification"
                            },
                            {
                                ClassName : "checkFiles",  
                                ClassName2 : "checkTitles",
                                CheckTitle : "인적사항",
                                CheckTitle2 : "Personal Information",
                                ImgUrl1 : require("../images/myInfo.png"),
                                route: this.props.route,
                                id: "mInfoInput"
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "checkTitles",
                                CheckTitle : "성적입력",
                                CheckTitle2 : "Grade Input",
                                ImgUrl1 : require("../images/myGrade.png"),
                                route: this.props.route,
                                id: "mGradeInput"
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "checkTitles",
                                CheckTitle : "자기소개서 / 학업계획서",
                                CheckTitle2 : "Introduction",
                                ImgUrl1 : require("../images/myIntro.png"),
                                route: this.props.route,
                                id: "mIntroduce"
                            },
                            {
                                ClassName : "checkFiles",
                                ClassName2 : "checkTitles",
                                CheckTitle : "최종 제출 여부",
                                CheckTitle2 : "Submission",
                                ImgUrl1 : require("../images/myRoute.png"),
                                route: this.props.route,
                                id: "mSubmit"
                            }
                        ]
                    }/>
                <CheckBtn onClick={this.props.goPreview}/>
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
                        <div className = {info.ClassName} key = {i} onClick={info.route} id={info.id}>
                            <div className = {info.ClassName2} >
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
        <img src={props.checkUrl} className="checkImgs" />
    );
}

const CheckBtn = (props) => {
    return(
        <div id = "checkBtn" onClick = {props.onClick}>
            <CheckBtnText BtnText = "확인하기"/>
        </div>
    );
}

const CheckBtnText = (props) => {
    return(
        <div id = "checkBtnText">
            {props.BtnText}
        </div>
    );
}

export default MySection;