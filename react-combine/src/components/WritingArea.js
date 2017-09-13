import React, {Component} from 'react';
import '../css/WritingArea.css';

class WritingArea extends Component{    
    render() {
        return(
            <div>
                <textarea name="self_intro" className="textarea_style" maxLength="1600" onChange={this.props.setter}></textarea>
                <p className="counting_area">({this.props.count}/1600)</p>
            </div>
        );
    }
}

export default WritingArea;