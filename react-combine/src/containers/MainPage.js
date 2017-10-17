import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import MainFooter from '../components/MainFooter';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import '../css/MainPage.css';

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            signState: "로그인"
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            this.setState({
                signState: "로그아웃"
            })
        }).catch(error => {
            this.setState({
                signState: "로그인"
            })
        })
    }

    signOnClick(){
        console.log('hello');
        if(this.state.signState === "로그인"){
            browserHistory.push('/signin');
        } else if(this.state.signState === "로그아웃"){
            axios({
                method: 'get',
                url: '/api/signout'
            }).then(response => {
                console.log(response);
                alert('로그아웃 됐습니다');
            }).catch(error => {
                console.log(error);
            })    
        }
    }

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
                <MainHeader signState={this.state.signState}
                            signOnClick={this.signOnClick.bind(this)}
                            ImgUrl = {require('../images/DSM Logo.png')}/>
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