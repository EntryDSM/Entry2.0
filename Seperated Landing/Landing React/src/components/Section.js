import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App/App.css'

class Section extends React.Component{
    componentDidMount(){
        document.getElementById("App__Explore_Button___2_MCO")
            .addEventListener('click', function(){
                let bdy = document.querySelector('body');
                let destination = document.getElementById('App__Article1___1mJq8');
                let destTop = destination.offsetTop;
                let speed = 27.5;
                console.log(destTop);
                let Anim = setInterval(function(){
                    if(bdy.scrollTop > destTop){
                        clearInterval(Anim);
                    }else{
                        bdy.scrollTop += speed;
                    }
                },15);
             });
    }
    render(){
        return(
            <div id={styles.section} draggable = "false">

                <div id={styles.ExploreLanding}>
                    <div id={styles.Explore_Title}>
                        2018 DSM 입학전형
                    </div>
                    <div id={styles.Explore_Line}></div>   
                    <div id={styles.Explore_Explain}>
                        완전히 새로워진 DSM 입학전형 페이지입니다!<br/>
                        추가 문구는 리액트로 변환이 끝난 후부터 바로 들어가도록 하겠습니다.
                        이 정도 분량으로.<br/>
                        아마 간단한 학교소개나 우리의 프로젝트를 설명할 것 같고, 정 아니면
                        랜딩에 대해..
                    </div>
                    <div id={styles.Explore_Button}>
                        <div id={styles.Explore_Text}>
                            EXPLORE!
                        </div>
                    </div>
                </div>

                <div id={styles.Article1}>
                    <div id={styles.Article_Title}>
                        About DSM
                    </div>
                    <div id={styles.Article_Line}></div>
                    <div id={styles.Article_Images_Cover}>
                        <div className={styles.Article_Images}>
                            <img src={require("./App/ImageFiles/School.png")}
                            className={styles.ExImages}/>
                            <div className={styles.Article_ImageTitle}>
                                SCHOOL
                            </div>
                            <div className={styles.Article_Image_Explain}>
                                한 학년 당 80명의 학생들이 있으며,<br/>
                                영 마이스터(Young Meister)로 거듭나게<br/>
                                하기 위해 많은 노력을 기울이고 있습니다.
                            </div>
                        </div>
                        <div className={styles.Article_Images}>
                            <img src={require("./App/ImageFiles/Study.png")}
                            className={styles.ExImages}/>
                            <div className={styles.Article_ImageTitle}>
                                STUDY
                            </div>
                            <div className={styles.Article_Image_Explain}>
                                SW 개발과, 정보 보안과, 임베디드 SW,<br/>
                                총 3가지 과로 구성이 되어 있으며,<br/>
                                학생들은 각 과에 맞는 공부를 하고 있습니다.
                            </div>
                        </div>
                        <div className={styles.Article_Images}>
                            <img src={require("./App/ImageFiles/Library.png")}
                            className={styles.ExImages}/>
                            <div className={styles.Article_ImageTitle}>
                                LIBRARY
                            </div>
                            <div className={styles.Article_Image_Explain}>
                                도서관에는 정말 다양한 종류의 SW 책들이<br/>
                                배치되어 있습니다. 학생들은 자신이 원하는<br/>
                                종류의 책을 빌리고 공부할 수 있습니다.
                            </div>
                        </div>
                        <div className={styles.Article_Images}>
                            <img src={require("./App/ImageFiles/Diploma.png")}
                            className={styles.ExImages}/>
                            <div className={styles.Article_ImageTitle}>
                                COMPETITION
                            </div>
                            <div className={styles.Article_Image_Explain}>
                                SW를 비롯한 다양한 대회가 준비되어 있고,<br/>
                                학생들은 자신의 실력을 향상시키기 위해<br/>
                                참가하여 수상을 하기도 합니다.
                            </div>
                        </div>
                    </div>
                </div>

                <div id={styles.Article_Real_Main}>

                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/LoginForm.png")}
                        className={styles.Explain_Images}/>
                        <div className={styles.Explain_Images_Main}>
                            Simple Login
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/PersonInfo.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Person Information
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Introduce.png")}
                        className={styles.Explain_Images}/>
                        <div className={styles.Explain_Images_Main}>
                            Introduce And Study
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Preview.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Preview Pages
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Receipt.png")}
                        className={styles.Explain_Images}/>
                        <div className={styles.Explain_Images_Main}>
                            Receipt Check
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Print.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Print Information
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            여기에 뭘 쓴지는 나중에 바꾸니까 지금은 아무것도 안 건드릴거에요.<br/>
                            이 부분 채워넣으려면 뭐라도 써야해서 이런식으로 글쓰는 겁니다. 햄토리.<br/>
                            보고 웃지마시고 뭘 채워넣어야 할지는 석진이 형이 해줄거라 믿어요.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;