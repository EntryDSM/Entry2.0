import React, {Component} from 'react';
import styles from './CountingText.css';

class CountingText extends Component{
    render(){
        return(
            <div id={styles.counting_area}>
                <p class="count">(0/1600)</p>
            </div>
        );
    }
}

export default CountingText;