import React, { Component } from 'react';

class MainHeader extends Component{
    render(){
        return(
            <div id = "headerCover">
                <img src = {this.props.ImgUrl} alt ="img" id = "mainLogo"/>
            </div>
        );
    }
}

export default MainHeader;