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
            ],
            isPayment: "X",
            isReceived: "X"
        }
    }

    route(e){
        switch(e.target.id){
            case "mClassification": browserHistory.push('/classification'); break;
            case "mInfoInput": browserHistory.push('/infoinput'); break;
            case "mGradeInput": browserHistory.push('/gradeinput'); break;
            case "mIntroduce": browserHistory.push('/introduce'); break;
            case "mSubmit": browserHistory.push('/finalsubmit'); break;
        }
    }

    componentWillMount(){
        let check = (arr) => {
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
            url: '/api/mypage'
        }).then(response => {
            classification = check(response.data.validation.classification);
            personalInfo = check(response.data.validation.info);
            gradeInput = check(response.data.validation.grade);
            introduction = check(response.data.validation.introduce);
            submission = response.data.validation.isSubmited;
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
                checkImgSrc: checkArr,
                isPayment: response.data.checkPayment ? "O" : "X",
                isReceived: response.data.checkReceipt ? "O" : "X"
            });
        }).catch(error => {
            console.log(error);
            if(error.response.status === 500){
                browserHistory.push('/internalError');
            }
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
                           route = {this.route.bind(this)}
                           isPayment = {this.state.isPayment}
                           isReceived = {this.state.isReceived} />
                <MyFooter/>
            </div>
        );
    }
}

export default MyPage;