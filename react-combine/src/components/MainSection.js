import React, { Component } from 'react';
/* <img src={require('../images/mainImg1.png')}/> */
/* <img src={require('../images/mainImg2.png')}/> */
class MainSection extends Component{
    render(){
        return(
            <div id = "sectionCover">
                {this.props.MainParts.map((mainInfo, idx) => {
                    return(
                        <div className = "sectionParts" key = {idx}>
                            <img src = {mainInfo.ImgUrl} alt = "imgs"/>
                            <h1> {mainInfo.MainTitle} </h1>
                            <h2> {mainInfo.SubTitle} </h2>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MainSection;