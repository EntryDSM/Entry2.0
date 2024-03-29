import React, {Component} from 'react';

class UploadImage extends Component {
    render() {
        return(
            <div className="div_style">
                <img src={this.props.profileImg} id="IDPhoto"/>
                <input type="file" id="attachfile" onChange={this.props.previewFile} accept="image/gif,image/jpeg,image/jpg,image/png"/> 
                {/*Icon made by [Interaction Assets] from www.flaticon.com -->*/}
            </div>
        )
    }
}

export default UploadImage;