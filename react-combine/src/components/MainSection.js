import React, { Component } from 'react';
/* <img src={require('../images/mainImg1.png')}/> */
/* <img src={require('../images/mainImg2.png')}/> */
class MainSection extends Component{
    render(){
        return(
            <div id = "sectionCover">
                <div className="sectionParts">
                    <img src = {require('../images/laptop.png')} alt = "img1"/>
                    <h1> 원서 접수 </h1>
                    <h2> RECEIPT </h2>
                </div>
                <div className="sectionParts">
                    <img src = {require('../images/set.png')} alt = "img2"/>
                    <h1> 원서 조회 </h1>
                    <h2> INQUIRY </h2>
                </div>
                <div className="sectionParts">
                    <img src = {require('../images/group.png')} alt = "img3"/>
                    <h1> 마이페이지 </h1>
                    <h2> MYPAGE </h2>
                </div>
            </div>
        );
    }
}

export default MainSection;