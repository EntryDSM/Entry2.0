import React from 'react';
import '../css/FormTitle.css';

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