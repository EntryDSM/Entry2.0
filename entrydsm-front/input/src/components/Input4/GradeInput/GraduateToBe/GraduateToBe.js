import React, {Component} from 'react';
import innerStyles from './GraduateToBe.css';
import styles from '../../Input4.css';
import classnames from 'classnames';

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
        return(
            <tbody id={innerStyles.will_table}>
                <tr id="will_semester">
                    {this.state.semesters.map((semester, index) => {
                        return <StudentGrade semester={semester.name} key={index} />
                    })}
                </tr>
                <NotPass />
                {this.state.subjectsList.map((subjects, index) => {
                    var btnGroups = [];
                    for(var i=0; i<5; i++){
                        if(i === 0){
                            btnGroups.push(<SubjectsInfo name={subjects.name} key={index}/>)
                        }
                        btnGroups.push(<GradeSelectBtn key={i + 7}/>);
                    }
                    return (
                        <tr className="will_subjects" key={index}>{btnGroups}</tr>
                    );
                })}
            </tbody>
        );
    }
}

class SubjectsInfo extends Component{
    render(){
        return (
            <td className={styles.subject}>{this.props.name}</td>
        );
    }
}

class StudentGrade extends Component{
    render(){
        return(
            <td className={styles.std_grade}>{this.props.semester}</td>
        );
    }
}

class NotPass extends Component{
    render(){
        var checkBoxs = [];
        for(var i=0; i<5; i++){
            if(i === 0) checkBoxs.push(<td className={classnames(styles.not_pass_title, styles.grade_table_title)} key={i + 6}>미이수 여부</td>);
            checkBoxs.push(<CheckBox key={i}/>);
        }
        return (
            <tr id="will_not_pass">
                {checkBoxs}
            </tr>
        );
    }
}

class CheckBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <td className={styles.check_box}>
                <input type="checkbox" name="whole_checkbox"/>
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
            <td className={innerStyles.will_select_grade}>
                {this.state.btnGroup.map((grades, i) => {
                    return(<BtnGroup group={grades.grade} key={i}/>);
                })}
                <div className={styles.is_pass_check}>
                    미이수 여부<input type="checkbox" name="not_pass_check"/>
                </div>
            </td>
        );
    }
}

class BtnGroup extends Component{
    render(){
        return (
            <div className={innerStyles.will_select_grade_child}>{this.props.group}</div>
        );
    }
}

export default GraduateToBe;