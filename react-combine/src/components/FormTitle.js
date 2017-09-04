import React, {Component} from 'react';

class FormTitle extends Component{
    render(){
        return(
            <h1>
                {this.props.Title}
            </h1>
        );
    }
}

export default FormTitle;