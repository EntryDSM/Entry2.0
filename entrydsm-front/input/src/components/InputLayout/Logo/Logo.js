import React, {Component} from 'react';
import styles from './Logo.css';

class Logo extends Component{
    render(){
        return (
            <div className={styles.logo_area}>
                <img src= './Logo.png' className={styles.LogoImage} />
            </div>
        );        
    }
}

export default Logo;