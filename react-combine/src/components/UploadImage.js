import React, {Component} from 'react';

class UploadImage extends Component {
    render() {
        let src;
        axios({
            method: 'get',
            url: '/api/upload/profile'
        }).then(response => {
            src = require('/api/upload/profile');
        }).catch(err => {
            console.log(err);
            src = require('../images/file.png');
        })
        return(
            <div className="div_style">
                <img src={src} id="IDPhoto"/>
                <input type="file" id="attachfile" onChange={this.props.previewFile} accept="image/gif,image/jpeg,image/jpg,image/png"/> 
                {/*Icon made by [Interaction Assets] from www.flaticon.com -->*/}
            </div>
        )
    }
}

export default UploadImage;