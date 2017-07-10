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
            <td>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.td_title}>시간</td>
                            <td className={styles.td_content}><input type="text" value={this.state.volGrade} onChange={this.gradeChange}/></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}

export default Volunteer;