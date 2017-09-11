import React, {Component} from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {infoInputData} from '../actions';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

class InfoInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            sex: "",
            grade: undefined,
            class: undefined,
            parentsName: "",
            schoolCode: undefined,
            schoolName: "",
            schoolTel: "",
            phoneNum: "",
            parentsTel: "",
            birth: "",
            address: "",
            detailAddress: "" 
        };

        this.submitInfo= this.submitInfo.bind(this);
    }

    submitInfo(){
        let store = this.context.store;
        store.dispatch(infoInputData(this.state));
        let storeData = store.getState().infoInput.INFO_INPUT_DATA;
        axios({
            method: 'put',
            url: '/api/user/info',
            data: {
                sex: "남",
                grade: 3,
                class: 1,
                schoolCode: 7680165,
                schoolName: "해솔중학교",
                schoolTel: "00012341234",
                phoneNum: "01028962001",
                parentsTel: "01090769392",
                parentsName: "안영숙",
                birth: "2000-04-29",
                baseAddress: "경기도 파주시 가온로 67 (목동동, 해솔마을 5단지 삼부르네상스 아파트)",
                detailAddress: "503동 802호"
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response);
            browserHistory.push('/gradeinput');
        }).catch(error => {
            console.log(error.config);
            console.log(error);
            console.log(error.response);
            console.log(error.request);
        })
    }
    
    getSchoolCode(){
        axios({
            method: 'get',
            url: '/user/info/inquery',
            params: {
                department: "",
                schoolName: ""
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response);
            console.log(response.data);
        }).catch(error => {
            console.log(error.config);
            console.log(error.response);
            console.log(error.request);
        })
    }

    setSex(e){
        this.setState({
            sex: e.target.value
        })
    }
    setGrade(e){
        this.setState({
            grade: e.target.value
        })
    }
    setClass(e){
        this.setState({
            class: e.target.value
        })
    }
    setParentsName(e){
        this.setState({
            parentsName: e.target.value
        })
    }
    setSchoolCode(e){
        this.setState({
            schoolCode: e.target.value
        })
    }
    setSchoolName(e){
        this.setState({
            schoolName: e.target.value
        })
    }
    setPhoneNum(e){
        this.setState({
            phoneNum: e.target.value
        })
    }
    setSchoolTel(e){
        this.setState({
            schoolTel: e.target.value
        })
    }
    setParentsTel(e){
        this.setState({
            parentsTel: e.target.value
        })
    }
    setBirth(e){
        this.setState({
            birth: e.targt.value
        })
    }
    setAddress(e){
        this.setState({
            address: e.target.value
        })
    }
    setDetailAddress(e){
        this.setState({
            detailAddress: e.target.value
        })
    }
    
    render(){
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable 
                        name={"정근철"}
                        email={"geni429"}
                        emailDomain={"gmail.com"}
                        setSex={this.setSex.bind(this)}
                        setAddress={this.setAddress.bind(this)}
                        setBirth={this.setBirth.bind(this)}
                        setClass={this.setClass.bind(this)}
                        setDetailAddress={this.setDetailAddress.bind(this)}
                        setGrade={this.setGrade.bind(this)}
                        setParentsName={this.setParentsName.bind(this)}
                        setParentsTel={this.setParentsTel.bind(this)}
                        setPhoneNum={this.setPhoneNum.bind(this)}
                        getSchoolCode={this.getSchoolCode.bind(this)}/>
                    <Button router="/classification" buttonName="이전"/>
                    <Button onclick={this.submitInfo.bind(this)} buttonName="다음"/>
                </div>
            </div>
        );
    }
}
InfoInput.contextTypes = {
    store: PropTypes.object
}

function infoInputSubmit(state){
    infoInput: state.infoInput
}

export default connect(infoInputSubmit)(InfoInput);