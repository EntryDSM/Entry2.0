import React, {Component} from 'react';

class GraduateToBe extends Component{
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
                {name: "3학년 1학기"}
            ]
        }
    }

    render(){
        <tbody>
            <tr>
                {this.state.semesters.map((semester, index) => {
                    return <SubjectsInfo name={semester} key={index} />
                })}
            </tr>
        </tbody>
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

export default GraduateToBe;