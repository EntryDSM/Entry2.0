import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import MainFooter from '../components/MainFooter';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import '../css/MainPage.css';

class MainPage extends Component{
    signInCheck(){
        axios({
            method: 'GET',
            url: '/api/user/classification'
        }).then(response => {
            console.log(response);
            browserHistory.push('/mypage')
        }).catch(err => {
            console.log(err);
            browserHistory.push('/signin')
        })
    }

    render(){
        return(
            <div id = "main">
                <MainHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <MainSection 
                        MainParts = {
                            [
                                {
                                    ImgUrl : require('../images/set.png'),
                                    MainTitle : "접수하기",
                                    SubTitle : "RECEIPT",
                                    Route : "/signup"
                                },
                                {
                                    ImgUrl : require('../images/group.png'),
                                    MainTitle : "조회하기",
                                    SubTitle : "INQUIRY",
                                    route: this.signInCheck.bind(this)
                                }
                            ]
                        }/>
                <MainFooter/>
            </div>
        );
    }
}

export default MainPage;