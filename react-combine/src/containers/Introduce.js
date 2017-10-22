import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import 'babel-polyfill';
import '../css/Introduce.css';
import '../css/WritingArea.css';

class Introduce extends Component {
    constructor(props){
        super(props);
        this.state = {
            introduce: "",
            plan: "",
            introduceCount: 0,
            planCount: 0
        }
    }

    setSelf(e){
        this.setState({
            introduce: e.target.value,
            introduceCount: e.target.value.length
        })
    }

    setPlan(e){
        this.setState({
            plan: e.target.value,
            planCount: e.target.value.length
        })
    }

    componentDidMount(){
        var point1 = document.getElementById("point_step1");
        var point2 = document.getElementById("point_step2");
        var point3 = document.getElementById("point_step3");
        var point4 = document.getElementById("point_step4");
        var point5 = document.getElementById("point_step5");
        var point6 = document.getElementById("point_step6");
        var point7 = document.getElementById("point_step7");
        point1.style.fill = "#B9B4B4";
        point1.style.stroke = "B9B4B4";
        point2.style.fill = "#B9B4B4";
        point2.style.stroke = "#B9B4B4";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "salmon";
        point5.style.stroke = "salmon";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: '/api/user/introduce'
        }).then(response => {
            if(!response.data.applyStatus){
                let introduceCount = response.data.introduce.length;
                let planCount = response.data.plan.length;

                this.setState({
                    introduce: response.data.introduce,
                    plan: response.data.plan,
                    introduceCount: introduceCount,
                    planCount: planCount
                })
            } else {
                browserHistory.push('/finalError');
            }
        }).catch(error => {
            console.log(error);
            if(error.response.status === 500){
                browserHistory.push('/internalError');
            } else {
                browserHistory.push('/error');
            }
        })
    }

    submit(page){
        axios({
            method: 'put',
            url: '/api/user/introduce',
            data: {
                introduce: {
                    introduce: this.state.introduce,
                    plan: this.state.plan
                }
            },
        }).then(response => {
            console.log(response);
            browserHistory.push(page);
        }).catch(error => {
            console.log(error);
            if(error.response.status === 500){
                browserHistory.push('/internalError');
            }
        })
    }

    render(){
        console.log(this.state.introduce);
        return(
            <div id="contents">
                <InputHeader now={"자기소개서 및 학업계획서"} />
                <div id="area"> 
                    <h5 className="h5_style"><span className="title_style">◎ 자기소개서</span> 내용은 특별한 형식은 없으며 개인의 특성 및 성장 과정, 취미/특기, 학교생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완/발전시켜야 할 단점에 대하여 기술하십시오.</h5>
                    <WritingArea 
                        setter={this.setSelf.bind(this)}
                        count={this.state.introduceCount}
                        content={this.state.introduce}/>
                    <h5 className="h5_style"><span className="title_style">◎ 학업계획서</span> 는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위해 생각하는 학업계획을 상세하게 기술하십시오.</h5>
                    <WritingArea 
                        setter={this.setPlan.bind(this)}
                        count={this.state.planCount}
                        content={this.state.plan}/>
                </div>
                <Button onclick = {() => this.submit('/gradeinput')} buttonName="이전"/>
                <Button onclick = {() => this.submit('/preview')} buttonName="다음"/>
            </div>
        );
    }
}

const WritingArea = (props) => {
    return(
        <div>
            <textarea name="self_intro" className="textarea_style" maxLength="1600" onChange={props.setter} value={props.content}></textarea>
            <p className="counting_area">({props.count}/1600)</p>
        </div>
    );
}

export default Introduce;