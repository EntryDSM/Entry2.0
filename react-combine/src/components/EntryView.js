import React, { Component } from 'react';
import { Link } from 'react-router';

class EntryView extends Component {
    render() {
        return (
            <header>
                <section>
                    <HeaderLeft />
                    <Thumbnails />
                </section>
            </header>
        )
    }
}

const HeaderLeft = () => {
    return (
        <div id="header-left">
            <LogoAndTitle logoURL={require("../images/logo.png")} title="Entry DSM SYSTEM" />
            <Apply />
        </div>
    )
}

const LogoAndTitle = (props) => {

    return (
        <div id="logo">
            <img src={props.logoURL} alt="logo" />
            <br />
            <span>{props.title}</span>
        </div>
    )
}

const Apply = () => {
    return (
        <nav id="apply">
            <Link to="/signup">
            <IconMenu title="원서접수" iconURL={require("../images/write-icon.png")} />
            </Link>
            <span style={{fontSize: 10+"rem",fontWeight:"lighter"}}>|</span>
            <IconMenu title="조회&수정" iconURL={require("../images/search-icon.png")} />
        </nav>
    )
}

const IconMenu = (props) => {
    return (
        <div>
            <span>{props.title}</span><br/>
            <img src={props.iconURL} alt="icon" className="icon" />
        </div>
    )
}

const Thumbnail = (props) => {
    return (
        <div className="thumbnail">
            <ul>
                <h3>
                    {props.title}
                    <span><a href={props.moreLink}>더보기</a></span>
                </h3>
                <hr />
                {props.listTitles.map((title, i) => {
                    if (i < 5)
                        return (<li key={i}>{title}</li>)
                })}
            </ul>
        </div>
    )
}

const Thumbnails = () => {
    return (
        <nav id="thumbnails">
            <Thumbnail title="공지사항" listTitles={
                ["학교 입학 전형 시스템 오픈",
                    "학교 입학설명회 금주 토요일 본교 진행",
                    "우리 학교 망했다! 야호!",
                    "내일 학교 가야된다ㅠㅠㅠ",
                    "학교가기 싫어 집에 있고 싶어"]}
                moreLink="/Notice" />
            <br />
            <Thumbnail title="QnA" listTitles={
                ["본교의 장점이 뭔가요?",
                    "학교 입학 원서 제출은 언제부턴가요?",
                    "재학생인 정근철 학생은 왜 솔로인가요?",
                    "다음 입학설명회는 언젠가요?",
                    "집가고 싶지 않은가요?"]}
                moreLink="/Notice" />
        </nav>
    )
}

export default EntryView;