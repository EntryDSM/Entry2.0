import React, {Component} from 'react';
import styles from './Graduated.css';

class Graduated extends Component{
    constructor(props){
        super(props);
        this.state = {
            subjectsList: [
                {name: "국어"},
                {name: "사회"},
                {name: "역사"},
                {name: "수학"},
                {name: "과학"},
                {name: "기술가정"},
                {name: "영어"}
            ],

            semesters: [
                {name: ""},
                {name: "1학년 1학기"},
                {name: "1학년 2학기"},
                {name: "2학년 1학기"},
                {name: "2학년 2학기"},
                {name: "3학년 1학기"},
                {name: "3학년 2학기"}
            ]
        }
    }

    render(){
        return (
            <tbody className={styles.gradeInputTables}>
                <tr>
                    {this.state.semesters.map((semester, index) => {
                        return <StudentGrade semester={semester.name} key={index} />
                    })}
                </tr>
                <NotPass />
                {this.state.subjectsList.map((subjects, index) => {
                    var btnGroups = [];
                    for(var i=0; i<6; i++){
                        if(i === 0){
                            btnGroups.push(<SubjectsInfo name={subjects.name} key={index}/>)
                        }
                        btnGroups.push(<GradeSelectBtn key={i + 7}/>);
                    }
                    return (
                        <tr key={index}>{btnGroups}</tr>
                    );
                })}
            </tbody>
        );
    }
}

class SubjectsInfo extends Component{
    render(){
        return (
            <th>{this.props.name}</th>
        );
    }
}

class StudentGrade extends Component{
    render(){
        return(
            <td className={styles.stdGrade}>{this.props.semester}</td>
        );
    }
}

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

class BtnGroup extends Component{
    render(){
        return (
            <div className={styles.btnGroupChild}>{this.props.group}</div>
        );
    }
}


export default Graduated;