import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input4.css';
import WritingArea from './WritingArea/WritingArea'
import CountingText from './CountingText/CountingText'
import InputLayout from '../InputLayout/InputLayout';

class Input4 extends Component {
    
    render(){
        return(
            <div id={styles.contents}>
                <InputHeader now={"자기소개서 및 학업계획서"} />
                <div id={styles.area}>
                    <h4 className={styles.h4_style}>자기소개서</h4>
                    <WritingArea />
                    <CountingText />
                    <h4 className={styles.h4_style}>학업계획서</h4>
                    <WritingArea />
                    <CountingText />
                </div>
            </div>
        );
    }
}

export default Input4;