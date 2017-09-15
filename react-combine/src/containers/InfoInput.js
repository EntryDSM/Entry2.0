import React, {Component} from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {infoInputData, signUpData} from '../actions';
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
            goverment: "",

            schoolTel: [
                "", "", ""
            ],
            phoneNum: [
                "", "", ""
            ],
            parentsTel: [
                "", "", ""
            ],
            address: "",
            detailAddress: "",
            birthYear: "",
            birthMonth: "",
            birthDay: "",
            name: "",
            email: "",
            schoolList: [],
            modalIsOpen: false
        };

        this.submitInfo= this.submitInfo.bind(this);
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: '/api/user/classification',
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                name: response.data.user.name,
                email: response.data.user.email
            })
        }).catch(err => {
            console.log(err);
        })
    }

    submitInfo(){
        let store = this.context.store;
        let postData = {
            sex: this.state.sex,
            grade: this.state.grade,
            class: this.state.class,
            parentsName: this.state.parentsName,
            schoolCode: this.state.schoolCode,
            schoolName: this.state.schoolName,
            schoolTel: this.state.schoolTel[0] + this.state.schoolTel[1] + this.state.schoolTel[2],
            phoneNum: this.state.phoneNum[0] + this.state.phoneNum[1] + this.state.phoneNum[2],
            parentsTel: this.state.parentsTel[0] + this.state.parentsTel[1] + this.state.parentsTel[2],
            address: this.state.address,
            address: this.state.address + this.state.detailAddress,
            birth: this.state.birthYear + '-' + this.state.birthMonth + '-' + this.state.birthDay,
        }
        store.dispatch(infoInputData(postData));
        let storeData = store.getState().infoInput.INFO_INPUT_DATA;
        axios({
            method: 'put',
            url: '/api/user/info',
            data: {
                info: {
                    sex: storeData.sex,
                    grade: storeData.grade,
                    class: storeData.class,
                    schoolCode: storeData.schoolCode,
                    schoolName: storeData.schoolName,
                    schoolTel: storeData.schoolTel,
                    phoneNum: storeData.phoneNum,
                    parentsTel: storeData.parentsTel,
                    parentsName: storeData.parentsName,
                    birth: storeData.birth,
                    address: storeData.address,
                    detailAddress: storeData.detailAddress
                }
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

    setSchoolInfo(e){
        Array.from(e.target.parentElement.children).forEach((ele, index) => {
            switch(index){
                case 0: {
                    this.setState({
                        goverment: ele.textContent
                    })
                }
                case 1: {
                    this.setState({
                        schoolName: ele.textContent
                    })
                }
                case 2: {
                    this.setState({
                        schoolCode: ele.textContent
                    })
                }
                default : break;
            }
        })
        this.setState({
            modalIsOpen: false
        })
    }
    
    getSchoolCode(e){
        let query;
        if(e.target.id === 'input_searchschool'){
            this.setState({
                schoolName: e.target.value
            })
            if(this.state.goverment === ""){
                query = '/api/schoolCode?name=' + e.target.value;
            } else {
                query = '/api/schoolCode?goverment=' + this.state.goverment + '&name=' + e.target.value;
            }
        } else if(e.target.id === 'select_goverment'){
            if(e.target.value === "전체"){
                this.setState({
                    goverment: ""
                })
                if(this.state.schoolName === ""){
                    query = '/api/schoolCode?name=';
                } else {
                    query = '/api/schoolCode?name=' + this.state.schoolName;
                }
            } else {
                this.setState({
                    goverment: e.target.value
                })
                if(this.state.schoolName === ""){
                    query = '/api/schoolCode?goverment=' + e.target.value;
                } else {
                    query = '/api/schoolCode?goverment=' + e.target.value + '&name=' + this.state.schoolName;
                }
            }
        }
        axios.get(query)
        .then(response => {
            this.setState({
                schoolList: response.data
            })
        }).catch(err => {
            console.log(err);
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
        let phoneNum = this.state.phoneNum;
        phoneNum[e.target.name] = e.target.value;
        this.setState({
            phoneNum: phoneNum
        })
    }
    setSchoolTel(e){
        let schoolTel = this.state.schoolTel;
        schoolTel[e.target.name] = e.target.value;
        this.setState({
            schoolTel: schoolTel
        })
    }
    setParentsTel(e){
        let parentsTel = this.state.parentsTel;
        parentsTel[e.target.name] = e.target.value;
        this.setState({
            parentsTel: parentsTel
        })
    }
    setBirthYear(e){
        this.setState({
            birthYear: e.target.value
        })
    }
    setBirthMonth(e){
        this.setState({
            birthMonth: e.target.value
        })
    }
    setBirthDay(e){
        this.setState({
            birthDay: e.target.value
        })
    }
    setAddress(address){
        this.setState({
            address: address
        })
    }
    setDetailAddress(e){
        this.setState({
            detailAddress: e.target.value
        })
    }

    setGoverment(e){
        if(e.target.value === "전체"){
            this.setState({
                goverment: ""
            })
        } else {
            this.setState({
                goverment: e.target.value
            })
        }
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }
    
    render(){
        const {store} = this.context;
        let signUpData = store.getState().signUp.SIGN_UP_DATA;
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable 
                        name={this.state.name}
                        email={this.state.email}
                        goverment={this.state.goverment}
                        schoolName={this.state.schoolName}
                        schoolCode={this.state.schoolCode}
                        modalIsOpen={this.state.modalIsOpen}
                        setSex={this.setSex.bind(this)}
                        setAddress={this.setAddress.bind(this)}
                        setBirthYear={this.setBirthYear.bind(this)}
                        setBirthMonth={this.setBirthMonth.bind(this)}
                        setBirthDay={this.setBirthDay.bind(this)}
                        setClass={this.setClass.bind(this)}
                        setDetailAddress={this.setDetailAddress.bind(this)}
                        setGrade={this.setGrade.bind(this)}
                        setParentsName={this.setParentsName.bind(this)}
                        setParentsTel={this.setParentsTel.bind(this)}
                        setPhoneNum={this.setPhoneNum.bind(this)}
                        setSchoolTel={this.setSchoolTel.bind(this)}
                        getSchoolCode={this.getSchoolCode.bind(this)}
                        schoolList={this.state.schoolList}
                        openModal={this.openModal.bind(this)}
                        setSchoolInfo={this.setSchoolInfo.bind(this)}/>
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