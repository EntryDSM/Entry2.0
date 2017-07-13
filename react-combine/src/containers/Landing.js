import React from 'react';
import ReactDOM from 'react-dom';
import BoxToUnder from '../components/BoxToUnder';
import HeaderView from '../components/HeaderView';
import SimpleIntro from '../components/SimpleIntro';
import MainIntro from '../components/MainIntro';
import Footer from '../components/Footer';
import BackCss from '../css/index.css';


class App extends React.Component{
   render(){
       return(
            <div>
                <HeaderView/>
                <BoxToUnder/>
                <SimpleIntro/>
                <MainIntro MainInfo = 
                {
                    [
                        {
                            MainImageExplain : "Simple Login.",
                            SubImageExplain1 : "타 사이트 페이지들에 비해 로그인이 매우 간편합니다.",
                            SubImageExplain2 : "별도의 회원가입 없이 가입할 수 있기 때문에 전체적인 진행이 빠릅니다.",
                            SubImageExplain3 : "이름, 이메일, 비밀번호만으로 원서를 작성해보세요.",
                            ImageUrl : require("../images/LoginForm.png"),
                            Direction : "left"
                        },
                        {
                            MainImageExplain : "Writing Form.",
                            SubImageExplain1 : "입학원서를 사이트 내에서 작성할 수 있습니다.",
                            SubImageExplain2 : "손으로 일일히 자기소개서 및 학업계획서를 적지 않아도 되니 간편합니다.",
                            SubImageExplain3 : "정성과 열정이 담긴 원서로 여러분의 역량을 표출해보세요.",
                            ImageUrl : require("../images/Introduce.png"),
                            Direction : "right"
                        },
                        {
                            MainImageExplain : "Auto Save.",
                            SubImageExplain1 : "원서를 작성할 때 글이 자동적으로 저장이 됩니다.",
                            SubImageExplain2 : "컴퓨터가 갑자기 꺼지거나 저장을 하지 않았을 때의 상황을 방지할 수 있고",
                            SubImageExplain3 : "언제든 원활하게 글을 수정할 수 있습니다.",
                            ImageUrl : require("../images/Auto_Save.png"),
                            Direction : "left"
                        },
                        {
                            MainImageExplain : "Preview Pages.",
                            SubImageExplain1 : "작성한 원서 내용들을 작성이 끝난 후 한 눈에 볼 수 있습니다.",
                            SubImageExplain2 : "자신이 입력한 인적사항을 비롯한 자기소개서와 학업계획서 등 모두를",
                            SubImageExplain3 : "확인할 수 있지만, 글의 수정은 불가능합니다.",
                            ImageUrl : require("../images/Preview.png"),
                            Direction : "right"
                        },
                        {
                            MainImageExplain : "Validation Check.",
                            SubImageExplain1 : "잘못 입력한 내용들이 있으면 자동으로 체크를 해줍니다.",
                            SubImageExplain2 : "작성을 하지 않거나 실수로 넘어간 부분들이 있으면 알림을 띄워줘,",
                            SubImageExplain3 : "꼭 작성을 완료하고 넘어갈 수 있도록 도와줍니다.",
                            ImageUrl : require("../images/ValCheck.png"),
                            Direction : "left"
                        },
                        {
                            MainImageExplain : "Grade Input.",
                            SubImageExplain1 : "새로운 방식의 성적 입력 폼을 제공합니다.",
                            SubImageExplain2 : "기존의 보기 불편했던 형식이 아닌 훨씬 깔끔하고 명시적인 UI를 보여줍니다.",
                            SubImageExplain3 : "완전히 새로워진 폼에 여러분의 성적을 입력해보세요.",
                            ImageUrl : require("../images/Grade.png"),
                            Direction : "right"
                        }
                    ]
                }/>
                <Footer/>
            </div>  
       );
   }

}

export default App;
