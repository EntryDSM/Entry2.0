import React, {Component} from 'react';
import '../css/InputHeader.css';

class InputHeader extends Component{
    render(){
        return(
            <div className="InputTitle">{this.props.now}</div>
        );
    }
}

export default InputHeader;