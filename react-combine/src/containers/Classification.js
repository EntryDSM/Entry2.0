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
            isBlackTest: "",
            liveArea: "",
            typeOfGraduate: "",
            typeOfSociety: "",
            typeOfApply: "",
            note: "",
            graduateYear: "2018",
        }
        this.changeStateValue = this.changeStateValue.bind(this);
    }

    changeStateValue(e) {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        console.log(obj,e.target.name);
    }

    changeStateValue(){
        axios({
            method : "POST",
            url : "http://114.108.135.15:8080/classification",
            data : {
                local : this.state.liveArea,
                type : this.state.typeOfGraduate,
                       //typeOfSociety, 
                       //typeOfApply,
                graduation : this.state.graduation,
                date : this.state.date,
                detail : this.state.detail,
                note : this.state.note
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

    render() {
        const {dispatch} = this.props;
        const {store} = this.context;

        let submit = function(){

        }
        return (
            <div id="contents">
                <InputHeader now="구분선택"/>
                <div id="classification">
                    <DefaultInfo
                        isBlackTest={this.state.isBlackTest}
                        changeIsBlackTest={this.changeStateValue}
                        liveArea={this.state.liveArea}
                        changeLiveArea={this.changeStateValue}
                    />
                    <Graduate
                        changeGraduate={this.changeStateValue} 
                        typeOfGraduate = {this.state.typeOfGraduate}
                        graduateYear = {this.state.graduateYear}
                        changeGraduateYear={this.changeStateValue}
                        />
                    <TypeAndMemo
                        typeOfApply={this.state.typeOfApply}
                        memo={this.state.memo}
                        changeMemo={this.changeStateValue}
                        changeTypeOfApply={this.changeStateValue} />
                    <SocietyDetail
                        isSocietySelected={this.state.typeOfApply==="society"}
                        typeOfSociety={this.state.typeOfSociety}
                        changeTypeOfSociety={this.changeStateValue} />
                </div>
                 <Button router="/infoinput" buttonName="다음"/>
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
                checked = {props.isBlackTest === "yes"}
                value="yes"
                onChange={props.changeIsBlackTest}/>
            <label htmlFor="test-yes">예</label>

            <input 
                type="radio" 
                name="isBlackTest" 
                id="test-no" 
                checked = {props.isBlackTest === "no"}
                value="no" 
                onChange={props.changeIsBlackTest}/> 
            <label htmlFor="test-no">아니오</label><br />

            <span>지역</span>
            <input 
                type="radio"
                name="liveArea"
                id="country" 
                value="country" 
                checked={props.liveArea === "country"}
                onChange={props.changeLiveArea}/> 
            <label htmlFor="country">전국</label>

            <input 
                type="radio" 
                name="liveArea" 
                id="Daejeon" 
                value="Daejeon"
                checked={props.liveArea === "Daejeon"}
                onChange={props.changeLiveArea} /> 
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
            name="typeOfGraduate"
            id="graduated"
            value="graduated"
            onChange={props.changeGraduate} 
            checked={props.typeOfGraduate==="graduated"}/>
        <label htmlFor="graduated">졸업</label>

        <input
            type="radio"
            name="typeOfGraduate"
            id="will-graduate"
            value="willGraduate"
            onChange={props.changeGraduate} 
            checked={props.typeOfGraduate==="willGraduate"}/>
        <label htmlFor="will-graduate">졸업 예정</label> <br />

        <span>졸업년도</span>
        <select 
            name="graduateYear"
            id="graduation-year" 
            value={props.graduateYear}
            onChange={props.changeGraduateYear}>
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
                checked={props.typeOfApply === "meister"}
                onChange={props.changeTypeOfApply} />
            <label htmlFor="meister">마이스터 인재</label>
            <input
                type="radio"
                name="typeOfApply"
                id="general"
                value="general"
                checked={props.typeOfApply === "general"}
                onChange={props.changeTypeOfApply} />
            <label htmlFor="general">일반</label>
            <input
                type="radio"
                name="typeOfApply"
                id="society"
                value="society"
                checked={props.typeOfApply === "society"}
                onChange={props.changeTypeOfApply} />
            <label htmlFor="society">사회통합</label> <br />

            <span>비고</span>
            <input 
                type="radio"
                name="memo"
                id="memo-general"
                value="general"
                onChange={props.changeMemo}
                checked={props.memo === "general"} />
            <label htmlFor="memo-general">일반</label>

            <input 
                type="radio"
                name="memo"
                id="country-merit"
                value="countryMerit"
                onChange={props.changeMemo}
                checked={props.memo === "countryMerit"} />
            <label htmlFor="country-merit">국가 유공자</label>

            <input 
                type="radio"
                name="memo"
                id="special"
                value="special"
                onChange={props.changeMemo}
                checked={props.memo === "special"} />
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
                        name="typeOfSociety"
                        value="basic"
                        id="basic"
                        checked={props.typeOfSociety==="basic"}
                        onChange={props.changeTypeOfSociety} /> <label htmlFor="basic">기초생활수급권자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="one-parent"
                        id="one-parent"
                        checked={props.typeOfSociety==="one-parent"}
                        onChange={props.changeTypeOfSociety} />
                    <label htmlFor="one-parent">한부모가족보호대상자</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="poor"
                        id="poor"
                        checked={props.typeOfSociety==="poor"}
                        onChange={props.changeTypeOfSociety} />
                    <label htmlFor="poor">차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="more-poor"
                        id="more-poor"
                        checked={props.typeOfSociety==="more-poor"}
                        onChange={props.changeTypeOfSociety} />
                    <label htmlFor="more-poor">차차상위 계층</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="from-north"
                        id="from-north"
                        checked={props.typeOfSociety==="from-north"}
                        onChange={props.changeTypeOfSociety} />
                    <label htmlFor="from-north">북한이탈주민</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="multi-culture"
                        id="multi-culture"
                        checked={props.typeOfSociety==="multi-culture"}
                        onChange={props.changeTypeOfSociety} />
                    <label htmlFor="multi-culture">다문화가정</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="typeOfSociety"
                        value="etc"
                        id="etc"
                        checked={props.typeOfSociety==="etc"}
                        onChange={props.changeTypeOfSociety} />
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