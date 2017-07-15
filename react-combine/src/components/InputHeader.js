import React from 'react';
import styles from '../css/InputHeader.css';

class InputHeader extends React.Component{
    render(){
        return(
            <div className="InputTitle">{this.props.now}</div>
        );
    }
}

export default InputHeader;