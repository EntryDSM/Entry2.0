import React, { Component } from 'react';
import Button from '../components/Button';
import InputHeader from '../components/InputHeader';
import '../css/Classification.css';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import axios from 'axios';

class Classification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            local: "AWAY",
            graduation: "",
            date: "2018",
            detail: "",
            isSocietySelected: false,
            isBlackTest: false,
            applyDetailType: {
                IS_COMMON: true, 
                IS_NATIONAL_MERIT: false,
                IS_EXCEPTIONEE: false
            },
            applyBaseType: {
                type: "COMMON",
                cause: null
            },
            disabled: "disabled"
        }
        this.getAlreadyData = this.getAlreadyData.bind(this);
        this.classificationSubmit = this.classificationSubmit.bind(this);
    }

    setIsBlackTest(e){
        if(e.target.id === 'test-yes'){
            this.setState({
                isBlackTest: true,
                graduation: ""
            })
        }
        this.setState({
            isBlackTest: !this.state.isBlackTest
        })
    }

    onSocietyClick(e){
        if(e.target.id === "MEISTER" || e.target.id === "COMMON"){
            this.setState({
                isSocietySelected: false,
                applyBaseType: {
                    type: e.target.id,
                    cause: null
                }
            })
        } else if(e.target.id === "SOCIAL") {
            this.setState({
                isSocietySelected: !this.state.isSocietySelected,
                applyBaseType: {
                    type: e.target.id,
                    cause: null
                }
            })
        }
    }

    radioSetter(e){
        switch(e.target.name){
            case 'isBlackTest': this.setState({
                    isBlackTest: e.target.id
                })
                break;
            case 'local': this.setState({
                    local: e.target.id
                })
                break;
            case 'type': this.setState({
                    applyBaseType: {
                        type: e.target.id,
                        cause: null
                    }
                })
                break;
            case 'graduation': 
                if(e.target.id === "WILL"){
                    this.setState({
                        graduation: e.target.id,
                        date: "2018",
                        disabled: "disabled"
                    })
                } else {    
                    this.setState({
                        graduation: e.target.id,
                        date: "2017",
                        disabled: ""
                    })
                }
                break;
            case 'detail': 
                this.setState({
                    applyBaseType: {
                        type: "SOCIAL",
                        cause: e.target.id
                    }
                })
                break;
            case 'special': 
                if(e.target.id === 'special_yes'){
                    this.setState({
                        applyDetailType: {
                            IS_COMMON: false, 
                            IS_NATIONAL_MERIT: this.state.applyDetailType.IS_NATIONAL_MERIT, 
                            IS_EXCEPTIONEE: true
                        }
                    })
                } else if(e.target.id === 'special_no'){
                    this.setState({
                        applyDetailType: {
                            IS_COMMON: false, 
                            IS_NATIONAL_MERIT: this.state.applyDetailType.IS_NATIONAL_MERIT, 
                            IS_EXCEPTIONEE: false
                        }
                    })
                }
                break;
            case 'country-merit': 
                if(e.target.id === 'country_merit_yes'){
                    this.setState({
                        applyDetailType: {
                            IS_COMMON: false, 
                            IS_NATIONAL_MERIT: true, 
                            IS_EXCEPTIONEE: this.state.applyDetailType.IS_EXCEPTIONEE
                        }
                    })
                } else if(e.target.id === 'country_merit_no'){
                    this.setState({
                        applyDetailType: {
                            IS_COMMON: false, 
                            IS_NATIONAL_MERIT: false, 
                            IS_EXCEPTIONEE: this.state.applyDetailType.IS_EXCEPTIONEE
                        }
                    })
                }            
                break;
            default:
                break;
        }
    }

    setDate(e){
        console.log(e.target.value);
        this.setState({
            date: e.target.value
        })
    }

    classificationSubmit(){
        let isBlackTest;
        switch(this.state.isBlackTest){
            case 'test-yes': {
                isBlackTest = true;
            }
            case 'test-no': {
                isBlackTest = false;
            }
        }
        axios({
            method : "put",
            url : "/api/user/classification",
            data : {
                classification: {
                    isBlack: isBlackTest,
                    regionType: this.state.local,
                    applyBaseType: this.state.applyBaseType,
                    graduateType: this.state.graduation,
                    graduateYear: this.state.date,
                    applyDetailType: this.state.applyDetailType
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

    componentWillMount(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            console.log(response);
            if(response.data.applyStatus){
                browserHistory.push('/finalError');
            }
        }).catch(error => {
            console.log(error);
            browserHistory.push('/error');
        })
    }

    getAlreadyData(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            let isBlackTest;
            let date;

            if(response.data.isBlack){
                isBlackTest = 'test-yes'
            } else {
                isBlackTest = 'test-no'
            }

            if(response.data.graduateType === 'DONE'){
                date = "2017";
            } else {
                date = "2018"
            }

            this.setState({
                isBlackTest: isBlackTest,
                local: response.data.regionType,
                applyBaseType: response.data.applyBaseType,
                graduation: response.data.graduateType,
                date: date,
                applyDetailType: response.data.applyDetailType
            })
        }).catch(error => {
            console.log(error);
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
        point2.style.fill = "salmon";
        point2.style.stroke = "salmon";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";

        this.getAlreadyData();
    }

    componentWillUnmount(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            if(!response.data.applyStatus){
                let isBlackTest;
                switch(this.state.isBlackTest){
                    case 'test-yes': {
                        isBlackTest = true;
                    }
                    case 'test-no': {
                        isBlackTest = false;
                    }
                }
                axios({
                    method : "put",
                    url : "/api/user/classification",
                    data : {
                        classification: {
                            isBlack: isBlackTest,
                            regionType: this.state.local,
                            applyBaseType: this.state.applyBaseType,
                            graduateType: this.state.graduation,
                            graduateYear: this.state.date,
                            applyDetailType: this.state.applyDetailType
                        }
                    },
                    withCredentials : false,
                    headers : {
                        "Access-Control-Allow-Origin" : "http://114.108.135.15"
                    }
                }).then(function(response){
                    console.log(response);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        console.log(this.state);
        return (
            <div id="contents">
                <InputHeader now="구분선택"/>
                <div id="classification">
                    <DefaultInfo
                        local={this.state.local}
                        isBlackTest={this.state.isBlackTest}
                        radioSetter={this.radioSetter.bind(this)}/>
                    <Graduate 
                        graduation={this.state.graduation}
                        radioSetter={this.radioSetter.bind(this)}
                        setDate={this.setDate.bind(this)}
                        date={this.state.date}
                        isBlackTest={this.state.isBlackTest}
                        disabled={this.state.disabled}/>
                    <TypeAndMemo
                        onSocietyClick={this.onSocietyClick.bind(this)} 
                        radioSetter={this.radioSetter.bind(this)}
                        applyBaseType={this.state.applyBaseType}
                        applyDetailType={this.state.applyDetailType}/>
                    <SocietyDetail
                        applyBaseType={this.state.applyBaseType}
                        applyDetailType={this.state.applyDetailType}
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
                value="yes"
                checked = {props.isBlackTest === "test-yes"}
                onClick={props.radioSetter}/>
            <label htmlFor="test-yes">예</label>

            <input 
                type="radio" 
                name="isBlackTest" 
                id="test-no" 
                value="no" 
                checked = {props.isBlackTest === "test-no"}
                onClick={props.radioSetter}/> 
            <label htmlFor="test-no">아니오</label><br />

            <span>지역</span>
            <input 
                type="radio"
                name="local"
                id="AWAY" 
                value="country"
                onClick={props.radioSetter}
                checked={props.local === 'AWAY'} /> 
            <label htmlFor="country">전국</label>

            <input 
                type="radio" 
                name="local" 
                id="HOME" 
                value="daejeon"
                onClick={props.radioSetter}
                checked={props.local === 'HOME'} /> 
            <label htmlFor="Daejeon">대전</label><br />
    </div>
    )
}

const Graduate = (props) => {
    let graduationDisabled = "";
    let disabled = props.disabled;
    if(props.isBlackTest === "test-yes"){
        graduationDisabled = "disabled";
        disabled = "disabled";
    } else if(props.graduation === 'DONE'){
        graduationDisabled = "disabled";
        disabled = "";
    }
    return(
        <div id="graduate">
        <h2>졸업 구분</h2>
        <span>졸업 구분</span>
        <input
            type="radio"
            name="graduation"
            id="WILL"
            value="willGraduate"
            onClick={props.radioSetter}
            checked={props.graduation === 'WILL'}
            disabled={props.isBlackTest === 'test-yes' ? 'disabled' : ''}/>
        <label htmlFor="will-graduate">졸업 예정</label>

        <input
            type="radio"
            name="graduation"
            id="DONE"
            value="graduated"
            onClick={props.radioSetter}
            checked={props.graduation === 'DONE'}
            disabled={props.isBlackTest === 'test-yes' ? 'disabled' : ''}/>
        <label htmlFor="graduated">졸업</label> <br />

        <span>졸업년도</span>
        <select 
            name="graduateYear"
            id="graduation-year" 
            onChange={props.setDate}>
            <option value="2018" selected={props.graduation === 'WILL'} disabled={graduationDisabled}>2018년</option>
            <option value="2017" selected={props.date == 2017 ? 'selected' : ''} disabled={disabled}>2017년</option>
            <option value="2016" selected={props.date == 2016 ? 'selected' : ''} disabled={disabled}>2016년</option>
            <option value="2015" selected={props.date == 2015 ? 'selected' : ''} disabled={disabled}>2015년</option>
            <option value="2014" selected={props.date == 2014 ? 'selected' : ''} disabled={disabled}>2014년</option>
            <option value="2013" selected={props.date == 2013 ? 'selected' : ''} disabled={disabled}>2013년</option>
        </select>
    </div>
    );
}

const TypeAndMemo = (props) => {
    console.log(props);
    return (
        <div id="type-and-memo">
            <h2>전형 및 특기 사항</h2>
            <span>전형</span>
            <input
                type="radio"
                name="type"
                id="COMMON"
                value="general"
                onClick={props.onSocietyClick}
                checked={props.applyBaseType.type === 'COMMON'} />
            <label htmlFor="general">일반</label>
            <input
                type="radio"
                name="type"
                id="MEISTER"
                value="meister"
                onClick={props.onSocietyClick}
                checked={props.applyBaseType.type === 'MEISTER'} />
            <label htmlFor="meister">마이스터 인재</label>
            <input
                type="radio"
                name="type"
                id="SOCIAL"
                value="society"
                onClick={props.onSocietyClick}
                checked={props.applyBaseType.type === 'SOCIAL'} />
            <label htmlFor="society">사회통합</label> <br />
            <span>국가 유공자</span>
            <input 
                type="radio"
                name="country-merit"
                id="country_merit_yes"
                value="general"
                onClick={props.radioSetter}
                checked={props.applyDetailType.IS_NATIONAL_MERIT} />
            <label htmlFor="memo-general">예</label>

            <input 
                type="radio"
                name="country-merit"
                id="country_merit_no"
                value="no"
                onClick={props.radioSetter}
                checked={!props.applyDetailType.IS_NATIONAL_MERIT} />
            <label htmlFor="country-merit">아니요</label> <br />

            <span>특례 입학 대상자</span>
            <input 
                type="radio"
                name="special"
                id="special_yes"
                value="general"
                onClick={props.radioSetter}
                checked={props.applyDetailType.IS_EXCEPTIONEE} />
            <label htmlFor="memo-general">예</label>

            <input 
                type="radio"
                name="special"
                id="special_no"
                value="special_no"
                onClick={props.radioSetter}
                checked={!props.applyDetailType.IS_EXCEPTIONEE} />
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
                        id="BASIC_BENEFICIARY"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === 'BASIC_BENEFICIARY'} /> 
                        <label htmlFor="basic">기초생활수급권자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="one-parent"
                        id="SINGLE_PARENT"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === "SINGLE_PARENT"} />
                    <label htmlFor="one-parent">한부모가족보호대상자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="poor"
                        id="LOWER_INCOME"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === "LOWER_INCOME"} />
                    <label htmlFor="poor">차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="more-poor"
                        id="LOW_INCOME"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause=== "LOW_INCOME"} />
                    <label htmlFor="more-poor">차차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="from-north"
                        id="FROM_NORTH"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === "FROM_NORTH"} />
                    <label htmlFor="from-north">북한이탈주민</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="multi-culture"
                        id="MULTICULTURAL"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === "MULTICULTURAL"} />
                    <label htmlFor="multi-culture">다문화가정</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="etc"
                        id="ETC"
                        onClick={props.radioSetter}
                        checked={props.applyBaseType.cause === "ETC"} />
                    <label htmlFor="etc">그 외 대상자</label>
                </li>
            </ul>
        </div>
    )
}

export default Classification;