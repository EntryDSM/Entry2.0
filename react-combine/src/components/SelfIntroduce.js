import React, {Component} from 'react';
 
class SelfIntroduce extends Component {
     render() {
        let datas = this.props.datas();
        console.log(datas);
        return(
            <div id="selfintroduce">
                <div id="introduce_header">
                    <span id="header">자기소개서</span>
                </div>
                <div id="userinfo">
                    <table id="userinfo_table">
                        <tbody>
                            <tr>
                                <td className="td_title" id="name">성 명</td>
                                <td className="td_content">{datas.name}</td>
                            </tr>
                            <tr>
                                <td className="td_title">출신중학교</td>
                                <td className="td_content">{datas.school}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="introduce_content">
                    <table id="content_table">
                        <tbody>
                            <tr id="content">
                                <td className="td_content">{datas.introduce}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SelfIntroduce;