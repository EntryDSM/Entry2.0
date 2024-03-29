import React from 'react';
import { Link } from 'react-router';
import '../css/HeaderView.css';

class HeaderView extends React.Component{
    componentDidMount(){
        
    }
    render(){
        return(
            <header>
                <div id="Header_Image_Cover">
                    <NavigationBar/>
                    <HeaderMainPart/>
                </div>
            </header>
        );
    }
}

const NavigationBar = () =>{
    return(
        <div id="LogoAndNav">
            <LogoImagePart/>
            <HeaderNavigationPart 
            menuList = 
            {
                [
                    {
                        "nav" : "Main",
                        "link" : "/main"
                    },
                    {
                        "nav" : "Contact",
                        "link" : "https://www.facebook.com/Entry-DSM-1386708261424912/?ref=bookmarks"
                    },
                    {
                        "nav" : "About DSM",
                        "link" : "http://dsmhs.djsch.kr/main.do"
                    }
                ]
            }/>
        </div>
    );
}

const LogoImagePart = () =>{
    return(
        <div id="LogoImage">
            <img src={require('../images/logo.png')} alt="logo" id="Logo"/>
            <LogoTitlePart schoolName= "DaeDeok SoftWare Meister HighSchool"/>
        </div>
    );
}

const LogoTitlePart = (props) =>{
    return(
        <div id="LogoTitle">
            {props.schoolName}
        </div>
    );
}

const HeaderNavigationPart = (props) =>{
    return(
        <div id="Header_Navigation">
            <ul>
                {props.menuList.map((menu, i) => {
                    if(i == 1 || i == 2){
                        return(
                            <li key={i}>
                                <a href = {menu.link}
                                   target = "_blank">
                                    {menu.nav}
                                </a>
                            </li>
                        );
                    }else{
                        return(
                            <Link to = {menu.link}>
                            <li key = {i}>
                                {menu.nav}
                            </li>
                            </Link>
                        );
                    }
                })}
            </ul>
        </div>
    );
}

const HeaderMainPart = () =>{
    return(
        <div id="Header_MainPart">
            <TitlePart/>
            <WhiteBoxesPart/>
        </div>
    );
}

const TitlePart = (props) =>{
    return(
        <div id="Title_Part">
            <MainTitle title= "2018 DSM ADMISSION" title2= "LANDING PAGE"/>
            <MainUnderLine/>
            <SubTitle Explain1= "2018학년도 DSM 입학전형 페이지입니다. 영 마이스터(Young Meister) 인재를 양성하며,"
                      Explain2= "창의, 열정, 배려가 넘치는 여러분을 기다리고 있습니다."/>
            <MainBox BoxTitle= "원서 접수하러가기"/>
        </div>
    );
}

const MainTitle =(props) =>{
    return(
        <div id="Main_Title">
            {props.title}
            <br/>
            {props.title2}
        </div>
    );
}

const MainUnderLine = () =>{
    return(
        <div id="Main_UnderLine">
        </div>
    );
}

const SubTitle = (props) =>{
    return(
        <div id="Sub_Title">
            {props.Explain1}
            <br/>
            {props.Explain2}
        </div>
    );
}

const MainBox = (props) =>{
    return(
        <Link to="/Main">
        <div id="ToMainBox">
            {props.BoxTitle}
        </div>
        </Link>
    );
}

const WhiteBoxesPart = () =>{
    return(
        <div id="White_OpacityBox">
            <WhiteBoxTitle WhiteTitle= "About Out Development"/>
            <BoxesCover 
                BoxesInfo = {
                    [
                        {
                            MainNumber: "11",
                            NumberExplain: "Programmers"
                        },
                        {
                            MainNumber: "04",
                            NumberExplain: "Started Month"
                        },
                        {
                            MainNumber: "10",
                            NumberExplain: "Finished Month"
                        },
                        {
                            MainNumber: "100",
                            NumberExplain: "Passion"
                        }
                    ]
                }/>
        </div>
    );
}

const WhiteBoxTitle = (props) =>{
    return(
        <div id="WhiteBox_Title">
            {props.WhiteTitle}
        </div>
    );
}

const BoxesCover = (props) =>{
    return(
        <div id="BoxesCover">
            {props.BoxesInfo.map((info, i) => {
                return (
                    <FourBoxes key={i}
                    MainNumber = {info.MainNumber}
                    NumberExplain = {info.NumberExplain}/>
                );
            })}
        </div>
    );
}

const FourBoxes = (props) =>{
    return(
        <div className="FourBoxes">

                <div className="MainNumbers">
                    {props.MainNumber}
                </div>

                <div className="NumbersExplain">
                    {props.NumberExplain}
                </div>

        </div>
    );
}


export default HeaderView;