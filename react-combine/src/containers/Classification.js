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
            isSocietySelected: false,
            isBlackTest: false
        }
    }

    setIsBlackTest(){
        this.setState({
            isBlackTest: !this.state.isBlackTest
        })
    }

    onSocietyClick(e){
        if(e.target.id === "meister" || e.target.id === "general"){
            this.setState({
                isSocietySelected: false
            })
        } else if(e.target.id === "society") {
            this.setState({
                isSocietySelected: !this.state.isSocietySelected
            })
        }
    }

    radioSetter(){
        let radios = ['local', 'type', 'graduation', 'type', 'note', 'detail'];
        let local = "";
        let type = "";
        let graduation = "";
        let note = "";
        let detail = "";
        radios.forEach((ele) => {
            let radio = document.getElementsByName(ele);
            Array.from(radio).forEach((ele) => {
                if(ele.checked){
                    switch(ele.name){
                        case 'local': 
                            local = ele.id;
                            break;
                        case 'graduation': 
                            graduation = ele.id;
                            break;
                        case 'type': 
                            type = ele.id;
                            break;
                        case 'note': 
                            note = ele.id;
                            break;
                        case 'detail': 
                            detail = ele.id;
                            break;
                        default:
                            console.log(ele);
                            break;
                    }
                }
            })
        })
        this.setState({
            postData: {
                local: local,
                graduation: graduation,
                type: type,
                note: note,
                detail: detail
            }
        })
    }

    classificationSubmit(){
        let store = this.context.store;
        store.dispatch(classificationData(this.state.postData));
        let storeData = store.getState().selectClassification.CLASSIFICATION_DATA;
        axios({
            method : "put",
            url : "/api/classification",
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
            console.log('hello');
            console.log(response);
            browserHistory.push('/infoinput');
        }).catch(function(err){
            console.log(err);
        });
    }

    render() {
        const {dispatch} = this.props;
        const {store} = this.context;
        return (
            <div id="contents">
                <InputHeader now="구분선택"/>
                <div id="classification">
                    <DefaultInfo
                        isBlackTest={this.state.isBlackTest}
                        setIsBlackTest={this.setIsBlackTest.bind(this)}/>
                    <Graduate />
                    <TypeAndMemo
                        onSocietyClick={this.onSocietyClick.bind(this)} />
                    <SocietyDetail
                        isSocietySelected={this.state.isSocietySelected} />
                </div>
                 <Button 
                    onclick={this.classificationSubmit.bind(this)} 
                    onmouseEnter={this.radioSetter.bind(this)}
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
                value="country" /> 
            <label htmlFor="country">전국</label>

            <input 
                type="radio" 
                name="local" 
                id="daejeon" 
                value="daejeon" /> 
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
            value="graduated"/>
        <label htmlFor="graduated">졸업</label>

        <input
            type="radio"
            name="graduation"
            id="will-graduate"
            value="willGraduate"/>
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
                name="type"
                id="meister"
                value="meister"
                onClick={props.onSocietyClick} />
            <label htmlFor="meister">마이스터 인재</label>
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
                id="society"
                value="society"
                onClick={props.onSocietyClick} />
            <label htmlFor="society">사회통합</label> <br />

            <span>비고</span>
            <input 
                type="radio"
                name="note"
                id="memo-general"
                value="general" />
            <label htmlFor="memo-general">일반</label>

            <input 
                type="radio"
                name="note"
                id="country-merit"
                value="countryMerit" />
            <label htmlFor="country-merit">국가 유공자</label>

            <input 
                type="radio"
                name="note"
                id="special"
                value="special" />
            <label htmlFor="special">특례입학대상자</label>
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
                        id="basic" /> 
                        <label htmlFor="basic">기초생활수급권자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="one-parent"
                        id="one-parent" />
                    <label htmlFor="one-parent">한부모가족보호대상자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="poor"
                        id="poor" />
                    <label htmlFor="poor">차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="more-poor"
                        id="more-poor" />
                    <label htmlFor="more-poor">차차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="from-north"
                        id="from-north" />
                    <label htmlFor="from-north">북한이탈주민</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="multi-culture"
                        id="multi-culture" />
                    <label htmlFor="multi-culture">다문화가정</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="detail"
                        value="etc"
                        id="etc" />
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