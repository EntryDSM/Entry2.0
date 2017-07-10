import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App/App.css'

class Footer extends React.Component{
    render(){
        return(
            <div id={styles.footer}>
                <div id={styles.Privacy}>
                    <div className={styles.Privacy_Sub}>
                        (34111)대전광역시 유성구 가정북로 76(장동 23-9)<br/>
                        교무실 ☎ : 042-866-8822, 교무실 Fax : 042-867-9900, 행정실 ☎ : 042-866-8885, 행정실 Fax : 042-863-4308
                        <br/>
                        사업자 등록 번호 314-83-01600 / 기관 메일 dsmhs@korea.kr
                        <br/><br/>
                        Copyright&#9400; 대덕소프트웨어마이스터고등학교. All rights reserved.
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;