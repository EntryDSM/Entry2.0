import React, { Component } from 'react';

class TypeAndMemo extends Component {
    render() {
        return (
            <div id="type-and-memo">
                <h2>전형 및 비고</h2>
                <span>전형</span>
                <input
                    type="radio"
                    name="typeOfApply"
                    id="meister"
                    value="meister"
                    checked={this.props.typeOfApply === "meister"}
                    onChange={this.props.changeTypeOfApply} />
                <label htmlFor="meister">마이스터 인재</label>
                <input
                    type="radio"
                    name="typeOfApply"
                    id="general"
                    value="general"
                    checked={this.props.typeOfApply === "general"}
                    onChange={this.props.changeTypeOfApply} />
                <label htmlFor="general">일반</label>
                <input
                    type="radio"
                    name="typeOfApply"
                    id="society"
                    value="society"
                    checked={this.props.typeOfApply === "society"}
                    onChange={this.props.changeTypeOfApply} />
                <label htmlFor="society">사회통합</label> <br />

                <span>비고</span>
                <input type="radio"
                    name="memo"
                    id="memo-general"
                    value="general"
                    onChange={this.props.changeMemo}
                    checked={this.props.memo === "general"} />
                <label htmlFor="memo-general">일반</label>

                <input type="radio"
                    name="memo"
                    id="country-merit"
                    value="countryMerit"
                    onChange={this.props.changeMemo}
                    checked={this.props.memo === "countryMerit"} />
                <label htmlFor="country-merit">국가 유공자</label>

                <input type="radio"
                    name="memo"
                    id="special"
                    value="special"
                    onChange={this.props.changeMemo}
                    checked={this.props.memo === "special"} />
                <label htmlFor="special">특례입학대상자</label>
            </div>
        )
    }
}

export default TypeAndMemo;