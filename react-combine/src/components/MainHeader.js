import React, { Component } from 'react';

class MainHeader extends Component{
    render(){
        let signOnClick = this.props.signOnClick;

        return(
            <div id = "headerCover">
                <img src = {this.props.ImgUrl} alt ="img" id = "mainLogo"/>
                <span id = "signBtn" onClick = {signOnClick}>{this.props.signState}</span>
            </div>
        );
    }
}

export default MainHeader;