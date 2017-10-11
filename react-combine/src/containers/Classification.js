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
        console.log(e.target.name);
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
                        disabled: ""
                    })
                }
                break;
            case 'date': {
                    if(this.state.graduation === 'WILL'){
                        this.setState({
                            date: 2018
                        })
                    } else {
                        this.setState({
                            date: e.target.value
                        })
                    }
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
            case 'special': this.setState({
                    applyDetailType: {
                        IS_COMMON: false, 
                        IS_NATIONAL_MERIT: false, 
                        IS_EXCEPTIONEE: true
                    }
                })
                break;
            case 'country-merit': this.setState({
                    applyDetailType: {
                        IS_COMMON: false, 
                        IS_NATIONAL_MERIT: true, 
                        IS_EXCEPTIONEE: false
                    }
                })
                break;
            default:
                break;
        }
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

    getAlreadyData(){
        axios({
            method: 'get',
            url: '/api/user/classification',
            withCredentials: false,
            headers : {
                "Access-Control-Allow-Origin" : "http://114.108.135.15"
            }
        }).then(response => {
            let isBlackTest;
            if(response.data.isBlack){
                isBlackTest = 'test-yes'
            } else {
                isBlackTest = 'test-no'
            }
            this.setState({
                isBlackTest: isBlackTest,
                local: response.data.regionType,
                applyBaseType: response.data.applyBaseType,
                graduation: response.data.graduateType,
                date: response.data.graduateYear,
                applyDetailType: response.data.applyDetailType
            })
        }).catch(err => {
            browserHistory.push('error');
        })
    }

    componentDidMount(){
        this.getAlreadyData();
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
            disabled={graduationDisabled}/>
        <label htmlFor="will-graduate">졸업 예정</label>

        <input
            type="radio"
            name="graduation"
            id="DONE"
            value="graduated"
            onClick={props.radioSetter}
            checked={props.graduation === 'DONE'}
            disabled={graduationDisabled}/>
        <label htmlFor="graduated">졸업</label> <br />

        <span>졸업년도</span>
        <select 
            name="graduateYear"
            id="graduation-year" 
            value={props.date}
            onChange={props.setDate}>
            <option value="2018" selected={props.graduation === 'WILL'} disabled={graduationDisabled}>2018년</option>
            <option value="2017" disabled={disabled}>2017년</option>
            <option value="2016" disabled={disabled}>2016년</option>
            <option value="2015" disabled={disabled}>2015년</option>
            <option value="2014" disabled={disabled}>2014년</option>
            <option value="2013" disabled={disabled}>2013년</option>
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
                id="speicial_no"
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