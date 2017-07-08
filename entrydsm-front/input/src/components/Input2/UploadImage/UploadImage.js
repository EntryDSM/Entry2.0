import React, {Component} from 'react';
import styles from './UploadImage.css';

class UploadImage extends Component {
    render() {
        return(
            <div className={styles.div_style}>
                <img src={require('../file.png')} id={styles.IDPhoto}/>
                <input type="file" id={styles.attachfile} onChange="previewFile"/>
                {/*Icon made by [Interaction Assets] from www.flaticon.com -->*/}
            </div>
        )
    }
}

export default UploadImage;