import React, {Component} from 'react';

class BlackExam extends Component{
    render(){
        return(
            <tbody id="black_table" style = {{display: this.props.visible}}>
                <h2>검정고시 평균 점수</h2>            
                <input type="text" onChange = {this.props.setAvgScore} value = {this.props.avgScore}/>
            </tbody>
        );
    }
}

export default BlackExam;