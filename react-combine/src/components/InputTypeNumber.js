import React, {Component} from 'react';

class InputTypeNumber extends Component{
    constructor(props){
        super(props);
    }

    numericInput(e){
        if(e.target.value !== NaN && typeof(e.target.value) === number){
        } 
    }
}