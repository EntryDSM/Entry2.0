import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/LogoPart.css';

class LogoPart extends React.Component{
    render(){
        return(
            <div id="LogoPart">
                <img src = {this.props.ImageUrl} style={{width: 100 +"%"}}/>
            </div>
        );
    }
}

export default LogoPart;