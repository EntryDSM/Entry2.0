import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input3.css';
import InputInfo from './InputInfo/InputInfo';
import UploadImage from './UploadImage/UploadImage'
import InputLayout from '../InputLayout/InputLayout';

class Input3 extends Component {
    
    render(){
        return(
            <div id={styles.contents}>
                <div className={styles.inputTitle}>
                    <InputHeader now={"인적 사항"} />
                </div>
                <InputInfo />
            </div>
        );
    }
}

export default Input3;