import React, {Component} from 'react';
import Menu from './Menu'

class Process extends Component{
    render(){
        return (
            <div>
                <div id="agenda_wrap">
                    <div className="agenda_container">
                        <Menu title={"기본 정보"}/>
                        <Menu title={"구분 선택"}/>
                        <Menu title={"인적 사항"}/>
                        <Menu title={"성적 입력"}/>
                        <Menu title={"자기소개서"} subtitle={"학업계획서"}/>
                    </div>
                </div>
            </div>
        );        
    }
}

export default Process;