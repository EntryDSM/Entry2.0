import React from 'react';

class CompleteCheckedBox2 extends React.Component{
    render(){
        return(
            <div id="CheckedBox">
                <CheckedTextBox/>
                <CheckedSubBox/>
            </div>
        );
    }
}

const CheckedTextBox = () =>{
    return(
        <div id="TextBox">
            <MainTextBox title1 = "발송완료."
                         title2 = "회원가입 인증 링크가 발송되었습니다."
                         title3 = "이메일을 확인해주세요."/>
            <ImageBox imageUrl = {require("../images/check.png")}/>
        </div>
    );
}

const MainTextBox = (props) =>{
    return(
        <div id="MainTextBox">
            <h1> {props.title1} </h1>
            <h2>  
                {props.title2}
                <br/>
                {props.title3}
            </h2>
        </div>
    );
}

const ImageBox = (props) =>{
    return(
        <div id="ImageBox">
            <img src={props.imageUrl} id="CheckImage"/>
        </div>
    );
}

const CheckedSubBox = () =>{
    return(
        <div id="SubBox">
        </div>
    );
}
export default CompleteCheckedBox2;