import React, { Component } from 'react';

class Graduate extends Component {
    render() {
        return (
            <div id="graduate">
                <h2>졸업 구분</h2>

                <span>졸업 구분</span>

                <input
                    type="radio"
                    name="typeOfGraduate"
                    id="will-graduate"
                    value="willGraduate"
                    onChange={this.props.changeGraduate} 
                    checked={this.props.typeOfGraduate==="willGraduate"}/>
                <label htmlFor="will-graduate">졸업 예정</label>

                <input
                    type="radio"
                    name="typeOfGraduate"
                    id="graduated"
                    value="graduated"
                    onChange={this.props.changeGraduate}
                    checked={this.props.typeOfGraduate === "graduated"} />
                <label htmlFor="graduated">졸업</label> <br />

                <span>졸업년도</span>
                <select name="graduateYear"
                 id="graduation-year" 
                 value={this.props.graduateYear}
                 onChange={this.props.changeGraduateYear}
                 >
                    <option value="2018">2018년</option>
                    <option value="2017">2017년</option>
                    <option value="2016">2016년</option>
                    <option value="2015">2015년</option>
                    <option value="2014">2014년</option>
                    <option value="2013">2013년</option>
                </select>
            </div>
        )
    }
}

export default Graduate;