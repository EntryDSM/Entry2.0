import React, {Component} from 'react';
import styles from './GradeInput.css';

class NotPass extends Component{
    render(){
        var checkBoxs = [];
        for(var i=0; i<6; i++){
            if(i === 0) checkBoxs.push(<th key={i + 7}>미이수 여부</th>);
            checkBoxs.push(<CheckBox key={i}/>);
        }
        return (
            <tr>
                {checkBoxs}
            </tr>
        );
    }
}

class CheckBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            isChecked: true
        };
        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange(){
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render(){
        return (
            <td>
                <span><input type="checkbox" className={styles.checkBox} checked={this.state.isChecked} onChange={this.toggleChange}/></span>
            </td>
        );
    }
}

export default NotPass;