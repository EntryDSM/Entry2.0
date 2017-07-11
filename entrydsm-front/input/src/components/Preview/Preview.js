import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Preview.css';
import InputLayout from '../InputLayout/InputLayout';

class Preview extends Component {
    render(){
        return(
            <div id={styles.contents}>
                <div id="menu-area">
                    <div id="header-area">
                        <InputHeader now={"미리보기"} />
                    </div>

                    <div className= {styles.tab}>
                        <button className={styles.tabButton} onclick="">입학 원서</button>
                        <button className={styles.tabButton} onclick="">금연 서약서</button>
                        <button className={styles.tabButton} onclick="">학교장 추천서</button>
                    </div>

                    <div id="London" className={styles.tabcontent}>
                        <h3>London</h3>
                        <p>London is the capital city of England.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;

