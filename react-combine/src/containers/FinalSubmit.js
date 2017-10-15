import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import '../css/FinalSubmit.css';

class FinalSubmit extends Component{
    constructor(props){
        super(props);
    }

    finalSubmitBtn(){
        console.log('test');
        axios({
            method: 'post',
            url: '/api/apply'
        }).then(response => {
            console.log(response);
            alert("최종제출이 완료되었습니다!");
            browserHistory.push('/main');
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        var point1 = document.getElementById("point_step1");
        var point2 = document.getElementById("point_step2");
        var point3 = document.getElementById("point_step3");
        var point4 = document.getElementById("point_step4");
        var point5 = document.getElementById("point_step5");
        var point6 = document.getElementById("point_step6");
        var point7 = document.getElementById("point_step7");
        point1.style.fill = "#B9B4B4";
        point1.style.stroke = "B9B4B4";
        point2.style.fill = "#B9B4B4";
        point2.style.stroke = "#B9B4B4";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "salmon";
        point7.style.stroke = "salmon";

        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            if(response.data.applyStatus){
                browserHistory.push('/finalError');
            }
        }).catch((err) => {
            console.log(err);
            axios({
                method: 'GET',
                url: '/api/validation'
            }).then((response) => {
                if(!response.data.classification.length === 0 && response.data.grade.length === 0 && response.data.info.length === 0 && response.data.introduce.length === 0){
                    browserHistory.push('/validation');
                }
            }).catch(err => {
                console.log(err);
            })
            browserHistory.push('/error');
        })
    }

    render(){
        return(
            <div id="contents">
                <InputHeader now={"최종 제출"}/>
                <FinalImage ImgUrl ={require("../images/mailbox.png")}/>
                <WarnText title = "주의!"/>
                <WarnText2 text1 = "버튼을 클릭하시면 더 이상 수정할 수 없습니다."
                          text2 = "신중히 결정해주세요!"/>
                <FinalBtn onclick = {this.finalSubmitBtn.bind(this)} name = "최종제출"/>
            </div>
        );
    }
}

const FinalImage = (props) =>{
    return(
        <div id="FinalImagePart">
            <img src={props.ImgUrl} style={{width: 100 + "%"}}/>
        </div>
    );
}

const WarnText = (props) =>{
    return(
        <div id="WarnTitle">
            {props.title}
        </div>
    );
}

const WarnText2 = (props) =>{
    return(
        <div id="WarnText">
            {props.text1}<br/>
            {props.text2}
        </div>
    );
}

const FinalBtn = (props) =>{
    console.log(props);
    return(
        <div id="FinalBtn">
            <Button onclick={props.onclick} buttonName={props.name}/>
        </div>
    );
}
export default FinalSubmit;