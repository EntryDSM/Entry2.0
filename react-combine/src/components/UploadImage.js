import React, {Component} from 'react';

class UploadImage extends Component {

     constructor(props) {
        super(props);
        
        this.state = {
            hidden: false
        };
        this.previewFile= this.previewFile.bind(this);
    }

    previewFile() {
        var preview = document.querySelectorAll('img')[1];
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            preview.src = reader.result;
        }

        if(file){
            reader.readAsDataURL(file);
        } else {
            preview.src = require('../images/file.png');
        }
    }
    
    render() {
        return(
            <div className="div_style">
                <img src={require('../images/file.png')} id="IDPhoto"/>
                <input type="file" id="attachfile" onChange={this.previewFile} accept="image/gif,image/jpeg,image/jpg,image/png"/> 
                {/*Icon made by [Interaction Assets] from www.flaticon.com -->*/}
            </div>
        )
    }
}

export default UploadImage;