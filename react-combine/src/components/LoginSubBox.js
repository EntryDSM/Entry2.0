import React from 'react';
import styles from '../css/LoginSubBox.css';

class LoginSubBox extends React.Component{

    render(){
        return(
            <div id="LoginSubBox">
                <h3> {this.props.hTitle} </h3>
                <a href="#"> {this.props.aTitle} </a>
            </div>
        );
    }
}

export default LoginSubBox;