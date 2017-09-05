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
            postData: {
                local: "",
                type: "",
                graduation: "",
                date: "2018",
                detail: "",
                note: ""
            },
            isBlackTest: false
        }
    }

    setIsBlackTest(){
        this.setState({
            isBlackTest: !this.state.isBlackTest
        })
    }

    setLocal(e){
        this.setState({
            postData: {
                local: e.target.value
            }
        })
    }

    setGraduation(e){
        this.setState({
            postData: {
                graduation: e.target.value
            }
        })
    }

    setDate(e){
        this.setState({
            postData: {
                date: e.target.value
            }
        })
    }

    setType(e){
        this.setState({
            postData: {
                type: e.target.value
            }
        })
    }

    setDetail(e){
        this.setState({
            postData: {
                detail: e.target.value
            }
        })
    }

    setNote(e){
        this.setState({
            postData: {
                note: e.target.value
            }
        })
    }

    classificationSubmit(){
        let store = this.context.store;
        store.dispatch(classificationData(this.state.postData));
        let storeData = store.getState().selectClassification.CLASSIFICATION_DATA;
        console.log(storeData);
        axios({
            method : "POST",
            url : "/classification",
            data : {
                local : storeData.local,
                type : storeData.type,
                graduation : storeData.graduation,
                date : storeData.date,
                detail : storeData.detail,
                note : storeData.note
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

    render() {
        console.log(this.state.postData);
        const {dispatch} = this.props;
        const {store} = this.context;
        let state = this.state;
        let classificationSubmit = function(){
            dispatch(classificationData(state.postData))
            let storeData = store.getState().selectClassification.CLASSIFICATION_DATA;
            console.log(storeData);
            axios({
                method : "POST",
                url : "/classification",
                data : {
                    local : storeData.local,
                    type : storeData.type,
                    graduation : storeData.graduation,
                    date : storeData.date,
                    detail : storeData.detail,
                    note : storeData.note
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
        return (
            <div id="contents">
                <InputHeader now="구분선택"/>
                <div id="classification">
                    <DefaultInfo
                        isBlackTest={this.state.isBlackTest}
                        setIsBlackTest={this.setIsBlackTest.bind(this)}
                        local={this.state.postData.local}
                        setLocal={this.setLocal.bind(this)} />
                    <Graduate
                        graduation = {this.state.postData.graduation}
                        setGraduation={this.setGraduation.bind(this)}
                        date = {this.state.postData.date}
                        setDate r={this.setDate.bind(this)} />
                    <TypeAndMemo
                        type={this.state.postData.type}
                        setType={this.setType.bind(this)}
                        note={this.state.postData.note}
                        setNote={this.setNote.bind(this)} />
                    <SocietyDetail
                        detail={this.state.postData.detail}
                        setDetail = {this.setDetail.bind(this)}
                        isSocietySelected={this.state.postData.type === "society"} />
                </div>
                 <Button onclick={this.classificationSubmit.bind(this)} buttonName="다음"/>
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
                checked={props.local === "country"}
                onChange={props.setLocal}/> 
            <label htmlFor="country">전국</label>

            <input 
                type="radio" 
                name="local" 
                id="daejeon" 
                value="daejeon"
                checked={props.local === "daejeon"}
                onChange={props.setLocal} /> 
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
            id="graduated"
            value="graduated"
            onChange={props.setGraduation} 
            checked={props.graduation === "graduated"}/>
        <label htmlFor="graduated">졸업</label>

        <input
            type="radio"
            name="graduation"
            id="will-graduate"
            value="willGraduate"
            onChange={props.setGraduation} 
            checked={props.graduation === "willGraduate"}/>
        <label htmlFor="will-graduate">졸업 예정</label> <br />

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
            <h2>전형 및 비고</h2>
            <span>전형</span>
            <input
                type="radio"
                name="typeOfApply"
                id="meister"
                value="meister"
                checked={props.type === "meister"}
                onChange={props.setType} />
            <label htmlFor="meister">마이스터 인재</label>
            <input
                type="radio"
                name="typeOfApply"
                id="general"
                value="general"
                checked={props.type === "general"}
                onChange={props.setType} />
            <label htmlFor="general">일반</label>
            <input
                type="radio"
                name="typeOfApply"
                id="society"
                value="society"
                checked={props.type === "society"}
                onChange={props.setType} />
            <label htmlFor="society">사회통합</label> <br />

            <span>비고</span>
            <input 
                type="radio"
                name="memo"
                id="memo-general"
                value="general"
                onChange={props.setNote}
                checked={props.note === "general"} />
            <label htmlFor="memo-general">일반</label>

            <input 
                type="radio"
                name="memo"
                id="country-merit"
                value="countryMerit"
                onChange={props.setNote}
                checked={props.note === "countryMerit"} />
            <label htmlFor="country-merit">국가 유공자</label>

            <input 
                type="radio"
                name="memo"
                id="special"
                value="special"
                onChange={props.setNote}
                checked={props.note === "special"} />
            <label htmlFor="special">특례입학대상자</label>
        </div>
    )
}

const SocietyDetail = (props) => {
    console.log(props);
    return (
        <div id="society-detail" style={{
            visibility : props.isSocietySelected? "visible":"hidden"
        }}>
            <ul>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="basic"
                        id="basic"
                        checked={props.detail === "basic"}
                        onChange={props.setDetail} /> <label htmlFor="basic">기초생활수급권자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="one-parent"
                        id="one-parent"
                        checked={props.detail === "one-parent"}
                        onChange={props.setDetail} />
                    <label htmlFor="one-parent">한부모가족보호대상자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="poor"
                        id="poor"
                        checked={props.detail === "poor"}
                        onChange={props.setDetail} />
                    <label htmlFor="poor">차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="more-poor"
                        id="more-poor"
                        checked={props.detail==="more-poor"}
                        onChange={props.setDetail} />
                    <label htmlFor="more-poor">차차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="from-north"
                        id="from-north"
                        checked={props.detail==="from-north"}
                        onChange={props.setDetail} />
                    <label htmlFor="from-north">북한이탈주민</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="multi-culture"
                        id="multi-culture"
                        checked={props.detail==="multi-culture"}
                        onChange={props.setDetail} />
                    <label htmlFor="multi-culture">다문화가정</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="etc"
                        id="etc"
                        checked={props.detail==="etc"}
                        onChange={props.setDetail} />
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