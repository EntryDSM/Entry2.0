import React from 'react';
import ReactDOM from 'react-dom';
import '../css/SimpleIntro.css';

class SimpleIntro extends React.Component{
    render(){
        return(
            <div id="FirstArticle">
                <ArticleTitle title= "About DSM"/>
                <ArticleLine/>
                <ArticleImagesCover SimpleInfo ={
                    [
                        {
                            ImageTitle : "SCHOOL",
                            ImageExplain1 : "한 학년 당 80명의 학생들이 있으며",
                            ImageExplain2 : "영 마이스터(Young Meister)로 거듭나게",
                            ImageExplain3 : "하기 위해 많은 노력을 기울이고 있습니다.",
                            ImageUrl : require("../images/School.png")
                        },
                        {
                            ImageTitle : "STUDY",
                            ImageExplain1 : "SW 개발과, 정보 보안과, 임베디드 SW",
                            ImageExplain2 : "총 3가지 과로 구성이 되어 있으며,",
                            ImageExplain3 : "학생들은 각 과에 맞는 공부를 하고 있습니다.",
                            ImageUrl : require("../images/Study.png")
                        },
                        {
                            ImageTitle : "LIBRARY",
                            ImageExplain1 : "도서관에는 정말 다양한 종류의 SW 책들이",
                            ImageExplain2 : "배치되어 있습니다. 학생들은 자신이 원하는",
                            ImageExplain3 : "종류의 책을 빌리고 공부할 수 있습니다.",
                            ImageUrl : require("../images/Library.png")
                        },
                        {
                            ImageTitle : "COMPETITION",
                            ImageExplain1 : "SW를 비롯한 다양한 대회가 준비되어 있고,",
                            ImageExplain2 : "학생들은 자신의 실력을 향상시키기 위해",
                            ImageExplain3 : "참가하여 수상을 하기도 합니다.",
                            ImageUrl : require("../images/Diploma.png")
                        }
                    ]
                }/>
            </div>
        );
    }
}

const ArticleTitle = (props) =>{
    return(
        <div id="Article_Title">
            {props.title}
        </div>
    );
}

const ArticleLine = () =>{
    return(
        <div id="Article_Line">
        </div>
    );
}

const ArticleImagesCover = (props) =>{
    return(
        <div id="Article_Images_Cover">
            {props.SimpleInfo.map((info, i) =>{
                {console.log(info)}
                return(
                    <Article_Images key={i}
                    ImageTitle = {info.ImageTitle}
                    ImageExplain1 = {info.ImageExplain1}
                    ImageExplain2 = {info.ImageExplain2}
                    ImageExplain3 = {info.ImageExplain3}
                    ImageUrl = {info.ImageUrl}/>
                );
            })}
        </div>
    );
}

const Article_Images = (props) =>{
    return(
        <div className="Article_Images">
            <img src={props.ImageUrl} className="ExImages" alt="Image"/>

            <div className="Article_ImageTitle">
                {props.ImageTitle}
            </div>

            <div className="Article_Image_Explain">
                {props.ImageExplain1}
                <br/>
                {props.ImageExplain2}
                <br/>
                {props.ImageExplain3}
            </div>
        </div>
    );
}
export default SimpleIntro;