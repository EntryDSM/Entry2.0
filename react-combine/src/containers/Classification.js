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
        var point1 = document.getElementById("point_step1");
        var point2 = document.getElementById("point_step2");
        var point3 = document.getElementById("point_step3");
        var point4 = document.getElementById("point_step4");
        var point5 = document.getElementById("point_step5");
        var point6 = document.getElementById("point_step6");
        var point7 = document.getElementById("point_step7");
        point1.style.fill = "#B9B4B4";
        point1.style.stroke = "B9B4B4";
        point2.style.fill = "salmon";
        point2.style.stroke = "salmon";
        point3.style.fill = "#B9B4B4";
        point3.style.stroke = "B9B4B4";
        point4.style.fill = "#B9B4B4";
        point4.style.stroke = "B9B4B4";
        point5.style.fill = "#B9B4B4";
        point5.style.stroke = "B9B4B4";
        point6.style.fill = "#B9B4B4";
        point6.style.stroke = "B9B4B4";
        point7.style.fill = "#B9B4B4";
        point7.style.stroke = "B9B4B4";
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