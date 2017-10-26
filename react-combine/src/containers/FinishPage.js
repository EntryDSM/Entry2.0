import React, {Component} from 'react';
import '../css/FinishPage.css';

class FinishPage extends Component{
    render(){
        return(
            <div id = "finish-page">
                <FinishHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <FinishText text1 = "원서 접수 기간이 종료되었습니다!"
                            text2 = "문의 사항이 있을 시 아래 번호로 연락바랍니다."
                            text3 = "042-866-8815"/>
            </div>
        );
    }
}

const FinishHeader = (props) => {
    return(
        <div id = "finishHeader">
            <img src = {props.ImgUrl} alt = "logo" id = "logo"/>
        </div>
    );
}

const FinishText = (props) => {
    return(
        <div id = "finishText">
            <h1> {props.text1} </h1>
            <h2> {props.text2} </h2>
            <h2> {props.text3} </h2>
        </div>
    );
}

export default FinishPage;