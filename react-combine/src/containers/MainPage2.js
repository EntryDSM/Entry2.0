import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import '../css/MainPage2.css';
import MainFooter from '../components/MainFooter';

class MainPage2 extends Component{
    render(){
        return(
            <div id = "main2">
                <MainHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <MainSection 
                        MainParts = {
                            [
                                {
                                    ImgUrl : require('../images/set.png'),
                                    MainTitle : "원서 접수",
                                    SubTitle : "RECEIPT",
                                    Route : "/signup"
                                },
                                {
                                    ImgUrl : require('../images/group.png'),
                                    MainTitle : "원서 조회",
                                    SubTitle : "INQUIRY",
                                    Route : "/mypage_1"
                                }
                            ]
                        }/>
                <MainFooter/>
            </div>
        );
    }
}

export default MainPage2;