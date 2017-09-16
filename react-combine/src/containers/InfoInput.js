import React, {Component} from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

class InfoInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            sex: "",
            grade: 3,
            class: null,
            number: null,
            parentsName: "",
            schoolCode: "",
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
            baseAddress: "",
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
            url: '/api/user/info',
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://114.108.135.15",
                "ContentType": "application/json"
            }
        }).then(response => {
            console.log('response data');
            console.log(response.data);
            let birth = response.data.birthday.split('-');
            let phoneNum = response.data.tel.split('-');
            let parentsTel = response.data.parentsTel.split('-');
            let schoolTel = response.data.schoolTel.split('-');
            console.log(phoneNum);
            console.log(parentsTel);
            console.log(schoolTel);

            this.setState({
                name: response.data.user.name,
                email: response.data.user.email,
                number: response.data.number,
                sex: response.data.sex,
                grade: response.data.grade,
                class: response.data.class,
                parentsName: response.data.parentsName,
                schoolCode: response.data.schoolCode,
                schoolName: response.data.schoolName,
                schoolTel: schoolTel,
                phoneNum: phoneNum,
                parentsTel: parentsTel,
                baseAddress: response.data.addressBase,
                detailAddress: response.data.addressDetail,
                birthYear: birth[0],
                birthMonth: birth[1],
                birthDay: birth[2]
            })
        }).catch(err => {
            console.log(err);
        })
    }

    submitInfo(){
        axios({
            method: 'put',
            url: '/api/user/info',
            data: {
                info: {
                    sex: this.state.sex,
                    grade: this.state.grade,
                    number: this.state.number,
                    class: this.state.class,
                    schoolCode: this.state.schoolCode,
                    schoolName: this.state.schoolName,
                    schoolTel: this.state.schoolTel[0] + '-' + this.state.schoolTel[1] + '-' + this.state.schoolTel[2],
                    tel: this.state.phoneNum[0] + '-' + this.state.phoneNum[1] + '-' + this.state.phoneNum[2],
                    parentsTel: this.state.parentsTel[0] + '-' + this.state.parentsTel[1] + '-' + this.state.parentsTel[2],
                    parentsName: this.state.parentsName,
                    birthday: this.state.birthYear + '-' + this.state.birthMonth + '-' + this.state.birthDay,
                    addressBase: this.state.baseAddress,
                    addressDetail: this.state.detailAddress
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

    setter(e){
        switch(e.target.name){
            case 'name': {
                this.setState({
                    name: e.target.value
                })
                break;
            }
            case 'sex': {
                this.setState({
                    sex: e.target.value
                })
                break;
            }
            case 'birthYear': {
                this.setState({
                    birthYear: e.target.value
                })
                break;
            }
            case 'birthMonth': {
                this.setState({
                    birthMonth: e.target.value
                })
                break;
            }
            case 'birthDay': {
                this.setState({
                    birthDay: e.target.value
                })
                break;
            }
            case 'class': {
                this.setState({
                    class: e.target.value
                })
                break;
            }
            case 'number': {
                this.setState({
                    number: e.target.value
                })
                break;
            }
            case 'parentsName': {
                this.setState({
                    parentsName: e.target.value
                })
                break;
            }
            case 'detailAddress': {
                this.setState({
                    detailAddress: e.target.value
                })
                break;
            }
            default: break;
        }
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
    setAddress(address){
        this.setState({
            baseAddress: address
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
    closeModal(){
        this.setState({
            modalIsOpen: false
        })
    }
    
    render(){
        console.log(this.state);
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable 
                        name={this.state.name}
                        email={this.state.email}
                        schoolName={this.state.schoolName}
                        schoolCode={this.state.schoolCode}
                        phoneNum={this.state.phoneNum}
                        parentsTel={this.state.parentsTel}
                        schoolTel={this.state.schoolTel}
                        sex={this.state.sex}
                        birthYear={this.state.birthYear}
                        birthMonth={this.state.birthMonth}
                        birthDay={this.state.birthDay}
                        class={this.state.class}
                        number={this.state.number}
                        detailAddress={this.state.detailAddress}
                        baseAddress={this.state.baseAddress}
                        parentsName={this.state.parentsName}
                        modalIsOpen={this.state.modalIsOpen}
                        setAddress={this.setAddress.bind(this)}
                        setParentsTel={this.setParentsTel.bind(this)}
                        setPhoneNum={this.setPhoneNum.bind(this)}
                        setSchoolTel={this.setSchoolTel.bind(this)}
                        getSchoolCode={this.getSchoolCode.bind(this)}
                        schoolList={this.state.schoolList}
                        openModal={this.openModal.bind(this)}
                        closeModal={this.closeModal.bind(this)}
                        setSchoolInfo={this.setSchoolInfo.bind(this)}
                        setter={this.setter.bind(this)}/>
                    <Button router="/classification" buttonName="이전"/>
                    <Button onclick={this.submitInfo.bind(this)} buttonName="다음"/>
                </div>
            </div>
        );
    }
}

export default InfoInput;