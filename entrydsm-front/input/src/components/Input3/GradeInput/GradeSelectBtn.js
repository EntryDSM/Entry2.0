import React, {Component} from 'react';
import BtnGroup from './BtnGroup';
import styles from './GradeInput.css';

class GradeSelectBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            btnGroup: [
                {grade: "A", key: 0},
                {grade: "B", key: 1},
                {grade: "C", key: 2},
                {grade: "D", key: 3},
                {grade: "E", key: 4}
            ]
        }
    }

    render(){
        return (
            <td className={styles.btnGroupParent}>
                {this.state.btnGroup.map((grades, i) => {
                    return(<BtnGroup group={grades.grade} key={i}/>);
                })}
            </td>
        );
    }
}

export default GradeSelectBtn;