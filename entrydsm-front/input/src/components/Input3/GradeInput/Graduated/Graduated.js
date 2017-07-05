import React, {Component} from 'react';
import GradeSelectBtn from '../GradeSelectBtn';
import NotPass from '../NotPass';
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
            <tbody>
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


export default Graduated;