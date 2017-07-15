import React from 'react';
import '../css/BoxToUnder.css';

class BoxToUnder extends React.Component{
    componentDidMount(){
        document.getElementById('Explore_Button')
            .addEventListener('click', function(){
                let body = document.querySelector('body');
                let speed = 27.5;
                let Anim = setInterval(function(){
                    if(body.scrollTop > 1100){
                        clearInterval(Anim);
                    }else{
                        body.scrollTop += speed;
                    }
                },15);
            });
    }
    render(){
        return(
            <div id="ExploreLanding">
                <ExploreTitle title= "2018 DSM 입학전형"/>
                <ExploreLine/>
                <ExploreExplain 
                    Explain1=
                    "완전히 새로워진 2018학년도 DSM 입학전형 페이지입니다!"
                    Explain2=
                    "추가 문구는 리액트로 변환이 끝난 후부터 바로 들어가도록 하겠습니다. 이 정도 분량으로"
                    Explain3=
                    "아마 간단한 학교소개나 우리의 프로젝트를 설명할 것 같고, 정 아니면 랜딩에 대해.."
                />
                <ExploreButton/>
            </div>
        );
    }
}

const ExploreTitle = (props) =>{
    return(
        <div id="Explore_Title">
            {props.title}
        </div>
    );
}

const ExploreLine = () =>{
    return(
        <div id="Explore_Line">
        </div>
    );
}

const ExploreExplain = (props) =>{
    return(
        <div id="Explore_Explain">
            {props.Explain1}
            <br/>
            {props.Explain2}
            <br/>
            {props.Explain3}
        </div>
    );
}

const ExploreButton = () =>{
    return(
        <div id="Explore_Button">
            <ButtonText Text= "EXPLORE!"/>
        </div>
    );
}

const ButtonText = (props) =>{
    return(
        <div id="Explore_Text">
            {props.Text}
        </div>
    );
}
export default BoxToUnder;