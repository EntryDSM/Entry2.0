import React, {Component} from 'react';
import Graduated from './Graduated/Graduated';
import GraduateToBe from './GraduateToBe/GraduateToBe';
import GED from './GED/GED';
import styles from './GradeInput.css';

class GradeInput extends Component{
    render(){
        return (
            <table className={styles.gradeInputTable}>
                <Graduated />
                <GraduateToBe />
                <GED />
            </table>
        );        
    }
}

export default GradeInput;