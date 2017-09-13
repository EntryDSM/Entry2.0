import React, { Component } from 'react';
import Button from '../components/Button';
import InputHeader from '../components/InputHeader';
import '../css/Classification.css';
import {classificationData} from '../actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import axios from 'axios';

class Classification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            local: "",
            type: "",
            graduation: "",
            date: "2018",
            detail: "",
            isCountryMerit: "",
            isSpecial: "",
            isSocietySelected: false,
            isBlackTest: false
        }
        this.getAlreadyData = this.getAlreadyData.bind(this);
    }

    setIsBlackTest(){
        this.setState({
            isBlackTest: !this.state.isBlackTest
        })
    }

    onSocietyClick(e){
        if(e.target.id === "meister" || e.target.id === "general"){
            this.setState({
                type: e.target.id,
                isSocietySelected: false,
                detail: ""
            })
        } else if(e.target.id === "society") {
            this.setState({
                type: e.target.id,
                isSocietySelected: !this.state.isSocietySelected
            })
        }
    }

    radioSetter(e){
        switch(e.target.name){
            case 'local': this.setState({
                    local: e.target.id
                })
                break;
            case 'type': this.setState({
                    type: e.target.id
                })
                break;
            case 'graduation': this.setState({
                    graduation: e.target.id
                })
                break;
            case 'date': this.setState({
                    date: e.target.id
                })
                break;
            case 'detail': this.setState({
                    detail: e.target.id
                })
                break;
            case 'note': this.setState({
                    note: e.target.id
                })
                break;
            case 'special': this.setState({
                    isSpecial: e.target.id
                })
                break;
            case 'country-merit': this.setState({
                    isCountryMerit: e.target.id
                })
                break;
            default:
                break;
        }
    }

    classificationSubmit(){
        let store = this.context.store;
        let isSpecial = false;
        let isCountryMerit = false;
        if(this.state.isSpecial === 'special_yes'){
            isSpecial = true;
        } else {
            isSpecial = false;
        }
        if(this.state.isCountryMerit === 'country_merit_yes'){
            isCountryMerit = true;
        } else {
            isCountryMerit = false;
        }
        let postData = {
            local: this.state.local,
            type: this.state.type,
            graduation: this.state.graduation,
            date: this.state.date,
            detail: this.state.detail,
            isSpecial: isSpecial,
            isCountryMerit: isCountryMerit
        }
        store.dispatch(classificationData(postData));
        let storeData = store.getState().selectClassification.CLASSIFICATION_DATA;
        axios({
            method : "put",
            url : "/api/user/classification",
            data : {
                classification: {
                    local: storeData.local,
                    type: storeData.type,
                    graduation: storeData.graduation,
                    date: storeData.date,
                    detail: storeData.detail,
                    isSpecial: storeData.isSpecial,
                    isCountryMerit: storeData.isCountryMerit
                }
            },
            withCredentials : false,
            headers : {
                "Access-Control-Allow-Origin" : "http://114.108.135.15"
            }
        }).then(function(response){
            console.log(response);
            browserHistory.push('/infoinput');
        }).catch(function(err){
            console.log(err);
        });
    }

    getAlreadyData(){
        axios({
            method: 'get',
            url: '/api/user/classification',
            withCredentials: false,
            headers : {
                "Access-Control-Allow-Origin" : "http://114.108.135.15"
            }
        }).then(response => {
            console.log(response)
            console.log(response.data);
            this.setState({
                local: response.data.regionType,
                type: response.data.applyBaseType.type,
                graduation: response.data.graduateType,
                date: response.data.graduateYear,
                detail: "",
                isCountryMerit: response.data.applyDetailType.IS_NATIONAL_MERIT,
                isSpecial: response.data.applyDetailType.IS_EXCEPTIONEE
            })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount(){
        this.getAlreadyData();
    }

    render() {
        const {store} = this.context;
        let signUpData = store.getState().signUp.SIGNUP_DATA;
        console.log(store.getState());
        console.log(signUpData);
        return (
            <div id="contents">
                <InputHeader now="구분선택"/>
                <div id="classification">
                    <DefaultInfo
                        isBlackTest={this.state.isBlackTest}
                        setIsBlackTest={this.setIsBlackTest.bind(this)}
                        radioSetter={this.radioSetter.bind(this)}/>
                    <Graduate 
                        radioSetter={this.radioSetter.bind(this)}/>
                    <TypeAndMemo
                        onSocietyClick={this.onSocietyClick.bind(this)} 
                        radioSetter={this.radioSetter.bind(this)}/>
                    <SocietyDetail
                        isSocietySelected={this.state.isSocietySelected} 
                        radioSetter={this.radioSetter.bind(this)}/>
                </div>
                 <Button 
                    onclick={this.classificationSubmit.bind(this)}
                    buttonName="다음"/>
            </div>
        )
    }
}

const DefaultInfo = (props) => {
    return (
        <div id="default-info">
            <h2>기본 정보</h2>
            <span>검정고시 여부</span>
            <input 
                type="radio" 
                name="isBlackTest"
                id="test-yes"
                checked = {props.isBlackTest}
                value="yes"
                onChange={props.setIsBlackTest}/>
            <label htmlFor="test-yes">예</label>

            <input 
                type="radio" 
                name="isBlackTest" 
                id="test-no" 
                checked = {!props.isBlackTest}
                value="no" 
                onChange={props.setIsBlackTest}/> 
            <label htmlFor="test-no">아니오</label><br />

            <span>지역</span>
            <input 
                type="radio"
                name="local"
                id="country" 
                value="country"
                onClick={props.radioSetter} /> 
            <label htmlFor="country">전국</label>

            <input 
                type="radio" 
                name="local" 
                id="daejeon" 
                value="daejeon"
                onClick={props.radioSetter} /> 
            <label htmlFor="Daejeon">대전</label><br />
    </div>
    )
}

const Graduate = (props) => {
    return(
        <div id="graduate">
        <h2>졸업 구분</h2>
        <span>졸업 구분</span>
        <input
            type="radio"
            name="graduation"
            id="will-graduate"
            value="willGraduate"
            onClick={props.radioSetter}/>
        <label htmlFor="will-graduate">졸업 예정</label>

        <input
            type="radio"
            name="graduation"
            id="graduated"
            value="graduated"
            onClick={props.radioSetter}/>
        <label htmlFor="graduated">졸업</label> <br />

        <span>졸업년도</span>
        <select 
            name="graduateYear"
            id="graduation-year" 
            value={props.date}
            onChange={props.setDate}>
            <option value="2018">2018년</option>
            <option value="2017">2017년</option>
            <option value="2016">2016년</option>
            <option value="2015">2015년</option>
            <option value="2014">2014년</option>
            <option value="2013">2013년</option>
        </select>
    </div>
    );
}

const TypeAndMemo = (props) => {
    return (
        <div id="type-and-memo">
            <h2>전형 및 특기 사항</h2>
            <span>전형</span>
            <input
                type="radio"
                name="type"
                id="general"
                value="general"
                onClick={props.onSocietyClick} />
            <label htmlFor="general">일반</label>
            <input
                type="radio"
                name="type"
                id="meister"
                value="meister"
                onClick={props.onSocietyClick} />
            <label htmlFor="meister">마이스터 인재</label>
            <input
                type="radio"
                name="type"
                id="society"
                value="society"
                onClick={props.onSocietyClick} />
            <label htmlFor="society">사회통합</label> <br />
            <span>국가 유공자</span>
            <input 
                type="radio"
                name="country-merit"
                id="country_merit_yes"
                value="general"
                onClick={props.radioSetter} />
            <label htmlFor="memo-general">예</label>

            <input 
                type="radio"
                name="country-merit"
                id="country_merit_no"
                value="no"
                onClick={props.radioSetter} />
            <label htmlFor="country-merit">아니요</label> <br />

            <span>특례 입학 대상자</span>
            <input 
                type="radio"
                name="special"
                id="special_yes"
                value="general"
                onClick={props.radioSetter} />
            <label htmlFor="memo-general">예</label>

            <input 
                type="radio"
                name="special"
                id="speicial_no"
                value="special_no"
                onClick={props.radioSetter} />
            <label htmlFor="country-merit">아니요</label>
        </div>
    )
}

const SocietyDetail = (props) => {
    return (
        <div id="society-detail" style={{
            visibility : props.isSocietySelected? "visible":"hidden"
        }}>
            <ul>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="basic"
                        id="basic"
                        onClick={props.radioSetter} /> 
                        <label htmlFor="basic">기초생활수급권자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="one-parent"
                        id="one-parent"
                        onClick={props.radioSetter} />
                    <label htmlFor="one-parent">한부모가족보호대상자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="poor"
                        id="poor"
                        onClick={props.radioSetter} />
                    <label htmlFor="poor">차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="more-poor"
                        id="more-poor"
                        onClick={props.radioSetter} />
                    <label htmlFor="more-poor">차차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="from-north"
                        id="from-north"
                        onClick={props.radioSetter} />
                    <label htmlFor="from-north">북한이탈주민</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="multi-culture"
                        id="multi-culture"
                        onClick={props.radioSetter} />
                    <label htmlFor="multi-culture">다문화가정</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="etc"
                        id="etc"
                        onClick={props.radioSetter} />
                    <label htmlFor="etc">그 외 대상자</label>
                </li>
            </ul>
        </div>
    )
}
Classification.contextTypes = {
    store: PropTypes.object
}

function select(state){
    classificationData: state.classificationData
}

export default connect(select)(Classification);