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
        axios({
            method: 'get',
            url: '/api/user/introduce',
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15"
            }
        }).then(response => {
            if(response.data.applyStatus){
                browserHistory.push('/finalError');
            } else {
                this.setState({
                    introduce: response.data.introduce,
                    plan: response.data.plan
                })
            }
        }).catch(err => {
            browserHistory.push('error');
        })
    }

    introduceSubmit(){
        axios({
            method: 'put',
            url: '/api/user/introduce',
            data: {
                introduce: {
                    introduce: this.state.introduce,
                    plan: this.state.plan
                }
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15"
            }
        }).then(response => {
            console.log(response);
            browserHistory.push('/preview');
        }).catch(err => {
            console.log(err);
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
                <Button router="gradeinput" buttonName="이전"/>
                <Button onclick={this.introduceSubmit.bind(this)} buttonName="다음"/>
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