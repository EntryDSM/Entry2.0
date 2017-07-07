import React, {Component} from 'react';
import styles from './WritingArea.css';

class WritingArea extends Component{
    render() {
        return(
            <div>
                <textarea name="self_intro" className={styles.textarea_style} maxLength="1600"></textarea>
            </div>
        );
    }
}

export default WritingArea;