import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import '../css/MainPage2.css';
// import MainFooter from '../components/MainFooter';

class MainPage2 extends Component{
    render(){
        return(
            <div id = "main2">
                <MainHeader ImgUrl = {require('../images/DSM_Logo3.png')}
                            menuList = {["메인화면", "접수현황", "학교소개", "문의하기"]}/>
                <MainSection/>
            </div>
        );
    }
}

export default MainPage2;