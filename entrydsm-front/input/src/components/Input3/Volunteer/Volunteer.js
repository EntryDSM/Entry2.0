import React, {Component} from 'react';
import styles from './Volunteer.css';

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
            <div className={styles.volGrade}> 
                <h2>봉사 시간</h2>
                <input type="text" className={styles.volGradeInput} value={this.state.volGrade} onChange={this.gradeChange}/> 시간
            </div>
        );
    }
}

export default Volunteer;