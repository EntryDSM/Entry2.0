import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class SubmitButton extends Component{
    constructor(props){
        super(props);
        this.onClickEvent = this.onClickEvent.bind(this);
    }

    onClickEvent(){
    }

    render(){
        return(
            <button onClick={this.onClickEvent} className="button">
                {this.props.buttonName}
            </button>
        );
    }
}

export default SubmitButton;