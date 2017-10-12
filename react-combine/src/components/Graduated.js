import React, {Component} from 'react';
import classnames from 'classnames';

class Graduated extends Component{
    render(){
        return (
                <tbody id="did_table" className={this.props.visible}>
                    <NotPass />
                    <tr id="did_semester">
                        {this.props.semesters.map((semester, index) => {
                            return <StudentGrade semester={semester.name} key={index} />
                        })}
                    </tr>
                    {this.props.subjectsList.map((subjects, index) => {
                        var btnGroups = [];
                        for(var i=0; i<6; i++){
                            if(i === 0){
                                btnGroups.push(<SubjectsInfo name={subjects.name} key={index}/>)
                            }
                            btnGroups.push(<GradeSelectBtn key={i + 7}/>);
                        }
                        return (
                            <tr className="did_subjects" key={index}>{btnGroups}</tr>
                        );
                    })}
                </tbody>
        );
    }
}

const SubjectsInfo = (props) => {
    return (
        <td className="subject">{props.name}</td>
    );
}

const StudentGrade = (props) => {
    return(
        <td className="std_grade">{props.semester}</td>
    );
}

const NotPass = () => {
        var checkBoxs = [];
        for(var i=0; i<6; i++){
            <SwitchBox textlabel="성적없음" />
            if(i === 0) checkBoxs.push(<th className="not_pass_title grade_table_title" key={i + 7}></th>);
            checkBoxs.push(
            <td className="check_box">
                <SwitchBox textlabel="학기 성적없음" column="topColumn" />
            </td>);
        }
        return (
            <tr id="did_not_pass">
                {checkBoxs}
            </tr>
        );
}

const SwitchBox = (props) => {
    return(
        <div className={classnames("switchArea", props.column)}>
            <div className="unFinTextArea">
                <label>{props.textlabel}</label>
            </div>
            <div className="unFinCheckArea">
                <label className="switch">
                    <input type="checkbox"></input>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}

const GradeSelectBtn = (props) => {
    return (
        <td className="did_select_grade">
            <div className="is_pass_check">
                    <SwitchBox textlabel="성적없음" />
            </div>
            <div>
                {props.btnGroup.map((grades, i) => {
                    return(<BtnGroup group={grades.grade} key={i}/>);
                })}
            </div>
        </td>
    );
}


const BtnGroup = (props) => {
    return (
        <div className="did_select_btn_child">{props.group}</div>
    );
}

GradeSelectBtn.defaultProps = {
    btnGroup: [
        {grade: "A", key: 0},
        {grade: "B", key: 1},
        {grade: "C", key: 2},
        {grade: "D", key: 3},
        {grade: "E", key: 4}
    ]
}

Graduated.defaultProps = {
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


export default Graduated;