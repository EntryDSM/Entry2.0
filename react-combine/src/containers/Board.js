import React, { Component } from 'react';
import MainBoard from '../components/MainBoard';
import '../css/Board.css';

class Board extends Component{
    render(){
        return(
            <div id = "board">
                <BoardHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <MainBoard title = "게시글 작성"/>
            </div>
        );
    }
}

const BoardHeader = (props) => {
    return(
        <div id = "boardHeader">
            <img src = {props.ImgUrl} alt = "boardLogo"/>
        </div>
    );
}

export default Board;