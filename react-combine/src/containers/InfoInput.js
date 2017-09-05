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
            postData: {
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
            },
        };

        this.submitInfo= this.submitInfo.bind(this);
    }

    submitInfo(){
        let store = this.context.store;
        store.dispatch(infoInputData(this.state.postData));
        let storeData = store.getState().infoInput.INFO_INPUT_DATA;
        axios({
            method: 'put',
            url: '/user/info',
            data: {
                sex: storeData.sex,
                grade: storeData.grade,
                class: storeData.class,
                parentsNum: storeData.parentsNum,
                schoolCode: storeData.schoolCode,
                schoolName: storeData.schoolName,
                schoolTel: storeData.schoolTel,
                phoneNum: storeData.phoneNum,
                parentsTel: storeData.parentsTel,
                birth: storeData.birth,
                baseAddress: storeData.baseAddress,
                detailAddress: storeData.detailAddress
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
    setSchoolTel(e){
        this.setState({
            schoolTel: e.target.value
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
        const {store} = this.context;
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable 
                        name={store.getState().signUp.SIGN_UP_DATA.name}
                        email={store.getState().signUp.SIGN_UP_DATA.email}
                        emailDomain={store.getState().signUp.SIGN_UP_DATA.emailDomain}
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
                    <Button router="/gradeinput" buttonName="다음"/>
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