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
            browserHistory.push('/')
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        axios({
            method: 'GET',
            url: '/api/validation'
        }).then(response => {
            if(!response.data.classification.length === 0 && response.data.grade.length === 0 && response.data.info.length === 0 && response.data.introduce.length === 0){
                browserHistory.push('/validation');
            }
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            if(response.data.applyStatus){
                browserHistory.push('/finalError');
            }
        }).catch(err => {
            console.log(err);
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