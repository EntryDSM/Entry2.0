import React, {Component} from 'react';
import { Link } from 'react-router';
import '../css/Button.css';

class Button extends Component{
    render(){
        return(
            <Link to={this.props.router}>
                <button onClick={this.props.onclick} onMouseEnter={this.props.onmouseEnter} className="button">
                    {this.props.buttonName}
                </button>
            </Link>
        );
    }
}

export default Button;