import React, { Component } from 'react';
import TypeAndMemo from '../components/TypeAndMemo';
import DefaultInfo from '../components/DefaultInfo';
import Graduate from '../components/Graduate';
import SocietyDetail from '../components/SocietyDetail';
import '../css/Classification.css';

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

    changeStateValue(e) {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        console.log(obj,e.target.name);
    }

    render() {
        return (
            <div id="classification">
                <h1>구분선택</h1>
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
        )
    }
}

export default Classification;