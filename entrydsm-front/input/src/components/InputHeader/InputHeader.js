import React, {Component} from 'react';
import styles from './InputHeader.css';
import classNames from 'classnames';

class InputHeader extends Component{
    render(){
        return(
            <div className={classNames(styles.InputTitle, styles.test)}>{this.props.now}</div>
        );
    }
}

export default InputHeader;