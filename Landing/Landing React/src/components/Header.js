import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App/App.css'

class Header extends React.Component{
    
    render(){
        return( //header부분
            <div id={styles.header} draggable="false"> 
                <div id={styles.Header_Image_Cover}>
                    <div id={styles.LogoAndNav}>
                        <div id={styles.LogoImage}>
                            <img src={require("./App/ImageFiles/logo.png")} id={styles.Logo}/>
                            <div id={styles.LogoTitle}>
                                DaeDeok SoftWare Meister HighSchool
                            </div>
                        </div>
                        <div id={styles.Header_Navigation}>
                            <ul>
                                <li>Home</li>
                                <li>Contact</li>
                                <li>Main</li>
                                <li>About Us</li>
                            </ul>
                        </div>
                    </div>

                    <div id={styles.Header_MainPart}>
                        <div className={styles.Main_TwoParts}>
                            <div id={styles.Main_Title}>
                                2018 DSM ADMISSION<br/>
                                LANDING PAGE
                            </div>
                            <div id={styles.Main_UnderLine}></div>
                            <div id={styles.Sub_Title}>
                                2018학년도 DSM 입학전형 페이지입니다.
                                영 마이스터(Young Meister) 인재를 양성하며,<br/>
                                창의, 열정, 배려가 넘치는 여러분을 기다리고 있습니다.
                            </div>
                            <div id={styles.ToMainBox}>
                                MAIN PAGE
                            </div>
                        </div>
                        
                        <div className={styles.Main_TwoParts} id={styles.White_OpacityBox}>
                            <div id={styles.WhiteBox_Title}>
                                About Out Development!
                            </div>
                            <div id={styles.BoxesCover}>
                                <div className={styles.FourBoxes}>
                                    <div className={styles.MainNumbers}>
                                        012
                                    </div>
                                    <div className={styles.NumbersExplain}>
                                        Programmers
                                    </div>
                                </div>
                                <div className={styles.FourBoxes}>
                                    <div className={styles.MainNumbers}>
                                        04
                                    </div>
                                    <div className={styles.NumbersExplain}>
                                        Started Month
                                    </div>
                                </div>
                                <div className={styles.FourBoxes}>
                                    <div className={styles.MainNumbers}>
                                        09
                                    </div>
                                    <div className={styles.NumbersExplain}>
                                        Finished Month
                                    </div>
                                </div>
                                <div className={styles.FourBoxes}>
                                    <div className={styles.MainNumbers}>
                                        28
                                    </div>
                                    <div className={styles.NumbersExplain}>
                                        Duration
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Header;