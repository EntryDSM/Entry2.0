import React, {Component} from 'react';
import styles from './GradeInput.css';

class BtnGroup extends Component{
    render(){
        return (
            <div className={styles.btnGroupChild}>{this.props.group}</div>
        );
    }
}

export default BtnGroup;