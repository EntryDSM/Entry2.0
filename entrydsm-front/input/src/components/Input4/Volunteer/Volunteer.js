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
            <div>
                <div className={styles.table_title}>봉사시간</div>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.td_title}>시간</td>
                            <td className={styles.td_content}><input type="number"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Volunteer;