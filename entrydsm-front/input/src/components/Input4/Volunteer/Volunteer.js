import React, {Component} from 'react';
import innerStyles from './Volunteer.css';
import styles from '../Input4.css';

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
            <div id={innerStyles.volunteer_div}>
                <div className={styles.grade_table_title}>봉사시간</div>
                <table className={styles.grade_table}>
                    <tbody>
                        <tr>
                            <td id={innerStyles.volunteer_title} className={styles.grade_td_title}>시간</td>
                            <td className={styles.grade_td_content}>
                                <input id={innerStyles.volunteer_input} type="number"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Volunteer;