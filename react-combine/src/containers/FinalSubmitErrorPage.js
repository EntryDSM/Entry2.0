import React, {Component} from 'react';
import '../css/FinalSubmitErrorPage.css';
import {Link, browserHistory} from 'react-router';

class FinalSubmitErrorPage extends Component{
    render(){
        return(
            <div id = "finalError">
                <ErrorHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <ErrorMain ImgUrl1 = {require('../images/warning.png')}
                           title1 = "Warning!"
                           title2 = "최종 제출이 되었으므로 수정이 불가능합니다!"
                           title3 = "조회 및 출력만 가능합니다."/>
            </div>
        );
    }
}

const ErrorHeader = (props) => {
    return(
        <div id = "errorHeader">
            <img src = {props.ImgUrl} alt = "logo" id = "logo" onClick = {() => {browserHistory.push('/main')}}/>
        </div>
    );
}

const ErrorMain = (props) => {
    return(
        <div>
            <img src = {props.ImgUrl1} alt = "img" id = "warningImg"/>
            <h1> {props.title1} </h1>
            <h2> {props.title2} </h2>
            <h3> {props.title3} </h3>

            <FinalCheck ImgUrl = {require('../images/finalCheck.png')}
                        FinalText = "원서 확인 하러가기"
                        FinalRoute = "/preview"/>
        </div>
    );
}

const FinalCheck = (props) => {
    return(
        <div>
            <Link to = {props.FinalRoute}>
                <img src = {props.ImgUrl} alt = "finalCheck" id = "finalCheckImg"/>
                <h3 id = "finalText"> {props.FinalText} </h3>
            </Link>
        </div>
    );
}

export default FinalSubmitErrorPage;