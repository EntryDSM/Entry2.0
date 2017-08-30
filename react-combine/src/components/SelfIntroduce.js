import React, {Component} from 'react';

class SelfIntroduce extends Component {
    render() {
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
                               <td className="td_content">{this.props.name}</td>
                           </tr>
                           <tr>
                               <td className="td_title">출신중학교</td>
                               <td className="td_content">{this.props.school}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               <div id="introduce_content">
                   <table id="content_table">
                       <tbody>
                           <tr>
                               <td id="content_explain"><span id="big_text">◎ 자기소개서</span> 내용은 특별한 형식이 없으며 개인의 특성 및 성장 과정, 취미·특기, 학교생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완·발전시켜야 할 단점에 대하여 기술하십시오.</td>
                           </tr>
                           <tr>
                                <td id="content_texts"></td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       );
   }
}

export default SelfIntroduce;