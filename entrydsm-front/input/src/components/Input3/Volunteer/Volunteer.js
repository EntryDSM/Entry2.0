import React, {Component} from 'react';
import styles from './Volunteer.css';
import { Circle } from 'rc-progress';

class Volunteer extends Component{
    constructor(props){
        super(props);
        this.state = {
            volGrade: 0
        }
        this.gradeChange = this.gradeChange.bind(this);
    }

    gradeChange(e){
        let grade = e.target.value;
        if(isNaN(grade) == true){
            grade = 0;
        }
        this.setState({
            volGrade: grade
        });
    }

    render(){
        return (
            <div id={styles.volunteerDiv}>
                <Circle percent={this.state.volGrade * 1.66} strokeWidth="5" strokeColor="#2cb573"/>
                <div className={styles.volGrade}> 
                    <p>봉사 시간</p>
                    <input type="text" className={styles.volGradeInput} value={this.state.volGrade} onChange={this.gradeChange}/>
                </div>
            </div>
        );
    }
}

export default Volunteer;