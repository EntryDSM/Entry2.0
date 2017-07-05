import React, {Component} from 'react';
import Graduated from './Graduated';
import styles from './GradeInput.css';

class GradeInput extends Component{
    render(){
        return (
            <table className={styles.gradeInputTable}>
                <Graduated />
            </table>
        );        
    }
}

export default GradeInput;