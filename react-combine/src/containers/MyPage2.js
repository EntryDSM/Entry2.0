import React, { Component } from 'react';
import '../css/MyPage2.css';
import MyHeader from '../components/MyHeader';
import MySection from '../components/MySection';
import MyFooter from '../components/MyFooter';

class MyPage2 extends Component{
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
        console.log('mount test');

        let checkArr = ["", "", "", "", ""]; // or checkArr.length = 5;

        checkArr.forEach((elem, index) => {
            console.log("check!");

            if(this.props.check[index] === false){
                checkArr[index] = require("../images/myCancel.png");
            } 
            else if(this.props.check[index] === true){
                checkArr[index] = require("../images/mySuccess.png");
            }
        });

        this.setState({
            checkImgSrc: checkArr
        });
    }

    render(){
        return(
            <div id="mypage2">
                <MyHeader PageTitle = "MY PAGE"/>
                <MySection MainTitle1 = "접수 현황"
                           MainTitle2 = "내가 올린 게시글"
                           checkUrl = {this.state.checkImgSrc}/>
                <MyFooter/>
            </div>
        );
    }
}

MyPage2.defaultProps = {
    check: [
        true,
        false,
        false,
        true,
        false
    ]
}

export default MyPage2;