import React, {Component} from 'react';
import Graduated from './Graduated/Graduated';
import GraduateToBe from './GraduateToBe/GraduateToBe';
import styles from './GradeInput.css';

class GradeInput extends Component{
    render(){
        return (
            <table className={styles.gradeInputTable}>
                <Graduated />
                <GraduateToBe />
            </table>
        );        
    }
}

export default GradeInput;