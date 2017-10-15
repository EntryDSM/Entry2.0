import React, { Component } from 'react';
import TypeAndMemo from '../components/TypeAndMemo';
import DefaultInfo from '../components/DefaultInfo';
import Graduate from '../components/Graduate';
import SocietyDetail from '../components/SocietyDetail';
import Button from '../components/Button';
import InputHeader from '../components/InputHeader';
import '../css/Classification.css';
import axios from 'axios';

class Classification extends Component {

    constructor() {
        super()
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

    componentDidMount(){
        var pointbefore = document.getElementById("point_step1");
        var pointnow = document.getElementById("point_step2");
        var pointnext = document.getElementById("point_step3");
        pointnow.style.fill = "salmon";
        pointbefore.style.fill = "#B9B4B4";
        pointnext.style.fill = "#B9B4B4";
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

export default Classification;