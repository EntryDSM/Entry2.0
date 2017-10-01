import React, { Component } from 'react';

class MainBoard extends Component{
    render(){
        return(
            <div id = "boardCover">
                <h1> {this.props.title} </h1>
                <BoardTitle name1 = "제목"
                            name2 = "내용"/>
            </div>
        );
    }
}

const BoardTitle = (props) => {
    return(
        <div>
            <h2> {props.name1} </h2>
            <input type = "text" id = "titleName" placeholder = "제목을 입력해주세요."/>
            <h2> {props.name2} </h2>
            <textarea id="bugreport">

            </textarea>
            <BoardBtn text = "등록"/>
        </div>
    );
}

const BoardBtn = (props) => {
    return(
        <div id = "boardBtn">
            <div id = "boardBtnText">
                {props.text}
            </div>
        </div>
    );
}

export default MainBoard;