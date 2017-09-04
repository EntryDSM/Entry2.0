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
                    "총 11명의 학생들이 웹 프론트엔드 및 백엔드로 역할을 나눠서 진행하였고,"
                    Explain3=
                    "모두가 최선을 다해 완성시킨 입학전형 프로젝트입니다."
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