import React, { Component } from 'react';
import {Link} from 'react-router';

class MainSection extends Component{
    render(){
        return(
            <div id = "sectionCover">
                {this.props.MainParts.map((mainInfo, idx) => {
                    return(
                        <div className = "sectionParts" key = {idx}>
                            <Link to = {mainInfo.Route}>
                                <img src = {mainInfo.ImgUrl} alt = "imgs"/>
                            </Link>
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