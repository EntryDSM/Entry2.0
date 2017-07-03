import React from 'react';
import styles from './Footer.css';

class Footer extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div>
                <footer>
                    <div id= {styles.Privacy}>
                        <div id={styles.Privacy_Main}>
                            개인정보처리방침 | 저작권보호정책 | 이용약관 | 웹접근성안내 | 영상정보처리방침
                        </div>
                        <br/>
                        <div className={styles.Privacy_Sub}>
                            (34111)대전광역시 유성구 가정북로 76(장동 23-9)<br/>
                            교무실 ☎ : 042-866-8822, 교무실 Fax : 042-867-9900, 행정실 ☎ : 042-866-8885, 행정실 Fax : 042-863-4308
                            <br/>
                            사업자 등록 번호 314-83-01600 / 기관 메일 dsmhs@korea.kr
                            <br/><br/>
                            Copyright&#9400; 대덕소프트웨어마이스터고등학교. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        );  
    }
}


export default Footer;