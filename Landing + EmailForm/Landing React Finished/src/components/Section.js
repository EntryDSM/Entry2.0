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
                            Simple Login.
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            타 사이트 페이지들에 비해 로그인이 매우 간편합니다.<br/>
                            별도의 회원가입 없이 가입할 수 있기 때문에 전체적인 진행이 빠릅니다.<br/>
                            이름, 이메일, 비밀번호만으로 원서를 작성해보세요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Introduce.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Writing Form.
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            입학원서를 사이트 내에서 작성할 수 있습니다.<br/>
                            손으로 일일히 자기소개서 및 학업계획서를 적지 않아도 되니 간편합니다.<br/>
                            정성과 열정이 담긴 원서로 여러분의 역량을 표출해보세요.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Auto_Save.png")}
                        className={styles.Explain_Images}/>
                        <div className={styles.Explain_Images_Main}>
                            Auto Save.
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            원서를 작성할 때 글이 자동적으로 저장이 됩니다.<br/>
                            컴퓨터가 갑자기 꺼지거나 저장을 하지 않았을 때의 상황을 방지할 수 있고,<br/>
                            언제든 원활하게 글을 수정할 수 있습니다.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Preview.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Preview Pages.
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            작성한 원서 내용들을 작성이 끝난 후 한 눈에 볼 수 있습니다.<br/>
                            자신이 입력한 인적사항을 비롯한 자기소개서와 학업계획서 등 모두를<br/>
                            확인할 수 있지만, 글의 수정은 불가능합니다.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/ValCheck.png")}
                        className={styles.Explain_Images}/>
                        <div className={styles.Explain_Images_Main}>
                            Validation Check.
                        </div>
                        <div className={styles.Explain_Images_Sub}>
                            잘못 입력한 내용들이 있으면 자동으로 체크를 해줍니다.<br/>
                            작성을 하지 않거나 실수로 넘어간 부분들이 있으면 알림을 띄워줘,<br/>
                            꼭 작성을 완료하고 넘어갈 수 있도록 도와줍니다.
                        </div>
                    </div>
                    <div className={styles.Main_Explain_Boxes}>
                        <img src={require("./App/ImageFiles/Grade.png")}
                        className={styles.Explain_Images2}/>
                        <div className={styles.Explain_Images_Main2}>
                            Grade Input.
                        </div>
                        <div className={styles.Explain_Images_Sub2}>
                            새로운 방식의 성적 입력 폼을 제공합니다.<br/>
                            기존의 보기 불편했던 형식이 아닌 훨씬 깔끔하고 명시적인 UI를 보여줍니다.<br/>
                            완전히 새로워진 폼에 여러분의 성적을 입력해보세요.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;