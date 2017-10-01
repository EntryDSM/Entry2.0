import React, { Component } from 'react';
import '../css/MyPage.css';
import MyHeader from '../components/MyHeader';
import MySection from '../components/MySection';
import MyFooter from '../components/MyFooter';
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

    route(){
        console.log('hello');
    }

    render(){
        return(
            <div id="mypage">
                <MyHeader PageTitle = "MY PAGE"/>
                <MySection MainTitle1 = "접수 현황"
                           MainTitle2 = "내가 올린 게시글"
                           checkUrl = {this.state.checkImgSrc}
                           route = {this.props.route}/>
                <MyFooter/>
            </div>
        );
    }
}

export default MyPage;