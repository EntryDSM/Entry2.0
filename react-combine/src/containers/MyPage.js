import React, { Component } from 'react';
import '../css/MyPage.css';
import MyHeader from '../components/MyHeader';
import MySection from '../components/MySection';
import MyFooter from '../components/MyFooter';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import axios from 'axios';

class MyPage extends Component{
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

    route(e){
        console.log(e.target.id)
        switch(e.target.id){
            case "mClassification": browserHistory.push('/classification'); break;
            case "mInfoInput": browserHistory.push('/infoinput'); break;
            case "mGradeInput": browserHistory.push('/gradeinput'); break;
            case "mIntroduce": browserHistory.push('/introduce'); break;
            case "mSubmit": browserHistory.push('/finalsubmit'); break;
        }
    }

    componentDidMount(){
        let check = (arr) => {
            console.log(arr.length);
            if(arr.length === 0){
                return true;
            } else {
                return false;
            }
        }
        let classification;
        let personalInfo;
        let gradeInput;
        let introduction;
        let submission;
        let checkList = new Array;

        axios({
            method: 'GET',
            url: '/api/validation'
        }).then(response => {
            console.log(response);
            classification = check(response.data.classification);
            personalInfo = check(response.data.info);
            gradeInput = check(response.data.grade);
            introduction = check(response.data.introduce);
            submission = response.data.isSubmited;
            checkList.push(classification);
            checkList.push(personalInfo);
            checkList.push(gradeInput);
            checkList.push(introduction);
            checkList.push(submission);
            let checkArr = ["", "", "", "", ""]; // or checkArr.length = 5;

            checkArr.forEach((elem, index) => {
                if(checkList[index] === false){
                    checkArr[index] = require("../images/myCancel.png");
                } 
                else if(checkList[index] === true){
                    checkArr[index] = require("../images/mySuccess.png");
                }
            });

            this.setState({
                checkImgSrc: checkArr
            });
        }).catch(err => {
            console.log(err);
        })
    }

    goPreview(){
        browserHistory.push('/preview');
    }

    render(){
        return(
            <div id="mypage">
                <MyHeader PageTitle = "MY PAGE"/>
                <MySection MainTitle1 = "접수 현황"
                           MainTitle2 = "내가 올린 게시글"
                           checkUrl = {this.state.checkImgSrc}
                           goPreview = {this.goPreview.bind(this)}
                           route = {this.route.bind(this)}/>
                <MyFooter/>
            </div>
        );
    }
}

export default MyPage;