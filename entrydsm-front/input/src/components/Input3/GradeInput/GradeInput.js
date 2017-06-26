import React, {Component} from 'react';
import Subjects from './Subjects';
import styles from './GradeInput.css';

class GradeInput extends Component{
    render(){
        return (
            <table className={styles.gradeInputTable}>
                <Subjects />
            </table>
        );        
    }
}

export default GradeInput;