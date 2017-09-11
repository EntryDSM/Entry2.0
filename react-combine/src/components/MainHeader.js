import React, { Component } from 'react';

class MainHeader extends Component{
    render(){
        return(
            <div id = "headerCover">
                <img src = {this.props.ImgUrl} id = "mainLogo"/>
                <ul>
                    {this.props.menuList.map((info, i) => {
                        return(
                            <li key = {i}>
                                {info}
                            </li>
                        );  
                    })}
                </ul>
            </div>
        );
    }
}

export default MainHeader;