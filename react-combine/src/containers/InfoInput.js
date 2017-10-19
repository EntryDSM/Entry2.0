import React, {Component} from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
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
            government: "",
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
            birthYear: "2002",
            birthMonth: "",
            birthDay: "",
            name: "",
            email: "",
            schoolList: [],
            modalIsOpen: false,
            profileImg: "../images/file.png"
        };

        this.submitInfo= this.submitInfo.bind(this);
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
        point2.style.fill = "#B9B4B4";
        point2.style.stroke = "#B9B4B4";
        point3.style.fill = "salmon";
        point3.style.stroke = "salmon";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";

        axios({
            method: 'get',
            url: '/api/user/info'
        }).then(response => {
            console.log(response.data);
            let birth = response.data.birthday.split('-');
            let phoneNum;
            let parentsTel;
            let schoolTel = "";
            
            Array.from(birth).forEach((ele, index) => {
                if(index === 0){
                    birth[index] = "2002";
                } else if(ele == undefined || ele == 'undefined'){
                    birth[index] = "";
                }
            })

            if(response.data.tel.length > 0){
                phoneNum = response.data.tel.split('-');
            } else {
                phoneNum = ["", "", ""];
            }

            if(response.data.parentsTel.length > 0){
                parentsTel = response.data.parentsTel.split('-');                
            } else {
                console.log(response.data.parentsTel.split('-').length);
                parentsTel = ["", "", ""];
            }

            console.log(response.data.schoolTel);
            if(response.data.schoolTel !== undefined){
                if(response.data.schoolTel.length > 0){
                    schoolTel = response.data.schoolTel.split('-');
                }
                schoolTel = ["", "", ""];
            }

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
                
            axios({
                method: 'get',
                url: '/api/upload/profile',
                withCredentials: false
            }).then(response => {
                this.setState({
                    profileImg: '/api/upload/profile'
                })
            }).catch(err => {
                this.setState({
                    profileImg: require('../images/file.png')
                })
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
            browserHistory.push('/gradeinput');
        }).catch(error => {
            console.log(error.config);
            console.log(error);
            console.log(error.response);
            console.log(error.request);
        })
    }

    componentWillUnmount(){
        axios({
            method: 'get',
            url: '/api/user/classification'
        }).then(response => {
            if(!response.data.applyStatus){
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
                }).catch(error => {
                    console.log(error);
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    setSchoolInfo(e){
        Array.from(e.target.parentElement.children).forEach((ele, index) => {
            switch(index){
                case 0: {
                    this.setState({
                        government: ele.textContent
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
            if(this.state.government === ""){
                query = '/api/schoolCode?name=' + e.target.value;
            } else {
                query = '/api/schoolCode?government=' + this.state.government + '&name=' + e.target.value;
            }
        } else if(e.target.id === 'select_government'){
            if(e.target.value === "전체"){
                this.setState({
                    government: ""
                })
                if(this.state.schoolName === ""){
                    query = '/api/schoolCode?name=';
                } else {
                    query = '/api/schoolCode?name=' + this.state.schoolName;
                }
            } else {
                this.setState({
                    government: e.target.value
                })
                if(this.state.schoolName === ""){
                    query = '/api/schoolCode?government=' + e.target.value;
                } else {
                    query = '/api/schoolCode?government=' + e.target.value + '&name=' + this.state.schoolName;
                }
            }
        }
        axios({
            method: 'GET',
            url: query
        }).then(response => {
            console.log(response.data);
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
                if(e.target.value !== NaN && e.target.value >= 0){    
                    this.setState({
                        class: e.target.value
                    })
                }
                break;
            }
            case 'number': {
                if(e.target.value !== NaN && e.target.value >= 0){    
                    this.setState({
                        number: e.target.value
                    })
                }
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
        let phNums = Array.from(document.getElementsByClassName('input_tel'));

        if(e.target.name !== 2){
            if(e.target.name == 0 && String(e.target.value).length === 3){
                phNums[1].focus(); 
            } else if(e.target.name == 1 && String(e.target.value).length === 4){
                phNums[2].focus();
            }
        }

        if(e.target.value !== NaN && e.target.value >= 0){
            phoneNum[e.target.name] = e.target.value;
        }
        this.setState({
            phoneNum: phoneNum
        })
    }

    setSchoolTel(e){
        let schoolTel = this.state.schoolTel;
        let phNums = Array.from(document.getElementsByClassName('input_tel'));

        if(e.target.name !== 2){
            if(e.target.name == 0 && String(e.target.value).length === 3){
                phNums[7].focus(); 
            } else if(e.target.name == 1 && String(e.target.value).length === 4){
                phNums[8].focus();
            }
        }

        if(e.target.value !== NaN && e.target.value >= 0){
            schoolTel[e.target.name] = e.target.value;
        }
        this.setState({
            schoolTel: schoolTel
        })
    }

    setParentsTel(e){
        let parentsTel = this.state.parentsTel;
        let phNums = Array.from(document.getElementsByClassName('input_tel'));

        if(e.target.name !== 2){
            if(e.target.name == 0 && String(e.target.value).length === 3){
                phNums[4].focus(); 
            } else if(e.target.name == 1 && String(e.target.value).length === 4){
                phNums[5].focus();
            }
        }

        if(e.target.value !== NaN && e.target.value >= 0){
            parentsTel[e.target.name] = e.target.value;
        }
        this.setState({
            parentsTel: parentsTel
        })
    }
    setAddress(address){
        this.setState({
            baseAddress: address
        })
    }

    setGovernment(e){
        if(e.target.value === "전체"){
            this.setState({
                government: ""
            })
        } else {
            this.setState({
                government: e.target.value
            })
        }
    }

    previewFile(e) {
        let preview = document.querySelectorAll('img')[1];
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        let formData = new FormData();
        formData.append('profile', file);

        reader.onloadend = function(){
            preview.src = reader.result;
        }

        if(file){
            reader.readAsDataURL(file);
            axios.put('/api/upload/profile', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
                console.log(err.request);
                console.log(err.config)
            })
        } else {
            preview.src = require('../images/file.png');
        }
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }
    closeModal(){
        this.setState({
            schoolList: [],
            government: "",
            schoolName: "",
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
                        profileImg={this.state.profileImg}
                        name={this.state.name}
                        email={this.state.email}
                        schoolName={this.state.schoolName}
                        schoolCode={this.state.schoolCode}
                        phoneNum={this.state.phoneNum}
                        parentsTel={this.state.parentsTel}
                        schoolTel={this.state.schoolTel}
                        sex={this.state.sex}
                        birthDay={this.state.birthDay}
                        month={this.state.birthMonth}
                        birthYear={this.state.birthYear}
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
                        setter={this.setter.bind(this)}
                        previewFile={this.previewFile.bind(this)}/>
                    <Button router="/classification" buttonName="이전"/>
                    <Button onclick={this.submitInfo.bind(this)} buttonName="다음"/>
                </div>
            </div>
        );
    }
}

export default InfoInput;