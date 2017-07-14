import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/FormTitle.css';

class LoginTitle extends React.Component{
    render(){
        return(
            <h1>
                {this.props.Title}
            </h1>
        );
    }
}

export default LoginTitle;