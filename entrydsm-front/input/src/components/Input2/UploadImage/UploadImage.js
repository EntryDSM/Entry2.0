import React, {Component} from 'react';
import styles from './UploadImage.css';

class UploadImage extends Component {
    render() {
        return(
            <div>
                <input type="file" id={styles.attachfile}/>
                <img src="./file.png" id={styles.IDPhoto}></img>
                {/*Icon made by [Interaction Assets] from www.flaticon.com -->*/}
            </div>
        )
    }
}

export default UploadImage;


// function previewFile() {
//   var preview = document.querySelector('img');
//   var file    = document.querySelector('input[type=file]').files[0];
//   var reader  = new FileReader();

//   reader.onloadend = function () {
//     preview.src = reader.result;
//   }

//   if (file) {
//     reader.readAsDataURL(file);
//   } else {
//     preview.src = "file.png";
//   }

// }
    