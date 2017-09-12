import React, {Component} from 'react';
import InputHeader from '../components/InputHeader';
import WritingArea from '../components/WritingArea';
import Button from '../components/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import {introduceData} from '../actions';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import '../css/Introduce.css';

class Introduce extends Component {
    constructor(props){
        super(props);
        this.state = {
            introduce: "",
            plan: ""
        }
    }

    setSelf(e){
        this.setState({
            introduce: e.target.value
        })
    }

    setPlan(e){
        this.setState({
            plan: e.target.value
        })
    }

    introduceSubmit(){
        let store = this.context.store;
        let postData = {
            introduce: this.state.introduce,
            plan: this.state.plan
        }
        store.dispatch(introduceData(postData));
        let storeData = store.getState().introduceData.INTRODUCE_DATA;
        axios({
            method: 'put',
            url: '/api/user/introudce',
            data: {
                introduce: {
                    introduce: storeData.introduce,
                    plan: storeData.plan
                }
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response);
            browserHistory.push('/preview');
        }).catch(error => {
            console.log(error.config);
            console.log(error.response);
            console.log(error.request);
        })
    }

    render(){
        return(
            <div id="contents">
                <InputHeader now={"자기소개서 및 학업계획서"} />
                <div id="area"> 
                    <h5 className="h5_style"><span className="title_style">◎ 자기소개서</span> 내용은 특별한 형식은 없으며 개인의 특성 및 성장 과정, 취미/특기, 학교생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완/발전시켜야 할 단점에 대하여 기술하십시오.</h5>
                    <WritingArea setter={this.setSelf.bind(this)}/>
                    <h5 className="h5_style"><span className="title_style">◎ 학업계획서</span> 는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위해 생각하는 학업계획을 상세하게 기술하십시오.</h5>
                    <WritingArea setter={this.setPlan.bind(this)}/>
                </div>
                <Button router="gradeinput" buttonName="이전"/>
                <Button onclick={this.introduceSubmit.bind(this)} buttonName="다음"/>
            </div>
        );
    }
}
Introduce.contextTypes = {
    store: PropTypes.object
}

function introduceSubmit(state){
    introduceData: state.introduceData
}

export default connect(introduceSubmit)(Introduce);