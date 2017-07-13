import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Preview.css';
import InputLayout from '../InputLayout/InputLayout';

class Preview extends Component {
    
    render(){
        function printHandler(e) {
            e.preventDefault();
            window.print();
        }
        return(
            <div id={styles.contents}>
                <div id="menu-area">
                    <div id="header-area">
                        <InputHeader now={"미리보기"} />
                    </div>

                    <div id="section-to-print">
                        <div className= {styles.tab}>
                            {/*
                                이쪽 영역 비워놓고 page load 되었을 경우 ajax 로 이 새끼가 검정고시인지 아닌지 받아와서
                                해당 컬럼 ㄱ개수에 맞게 binding 해주고 javascript 로 css 조정 width: calc(100% / 5);  || width: calc(100% / 4);
                            */}
                            <button className={styles.tabButton} onClick="">입학 원서</button>
                            <button className={styles.tabButton} onClick="">자기 소개서</button>
                            <button className={styles.tabButton} onClick="">학업 계획서</button>
                            <button className={styles.tabButton} onClick="">금연 서약서</button>
                            <button className={styles.tabButton} onClick="">학교장 추천서</button>
                        </div>

                        <div id="London" className={styles.tabcontent}>
                            <h3>London</h3>
                            <p>London is the capital city of England.</p>
                        </div>
                    </div>

                    <button className={styles.printButton} onClick={printHandler}>출력하기</button>
                </div>
            </div>
        );
    }

}

export default Preview;

