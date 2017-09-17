import React from 'react';
import axios from 'axios';

class WriteNoticeBox extends React.Component {

    render() {
        return (
            <div id="writenotice_box">
                <input type="text" placeholder="제목을 입력해주세요." className="input_style" id="input_title"/>
                <textarea type="text" placeholder="내용을 입력해주세요." className="input_style" id="input_content"/>
                <button id="submit">게시하기</button>
            </div>
        );
    }
}



export default WriteNoticeBox;