import React, {Component} from 'react';

class BlackExam extends Component{
    render(){
        return(
            <tbody id="black_table" style={{display: this.props.visible}}>
                <h2>평균 점수</h2>            
                <input type="text"/>
            </tbody>
        );
    }
}

export default BlackExam;