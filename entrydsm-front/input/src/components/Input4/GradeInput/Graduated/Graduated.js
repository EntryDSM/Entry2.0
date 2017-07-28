import React, {Component} from 'react';
import innerStyles from './Graduated.css';
import styles from '../../Input4.css';
import classnames from 'classnames';

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
                <tbody id={innerStyles.did_table}>
                    <NotPass />
                    <tr id="did_semester">
                        {this.state.semesters.map((semester, index) => {
                            return <StudentGrade semester={semester.name} key={index} />
                        })}
                    </tr>
                    {this.state.subjectsList.map((subjects, index) => {
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

    componentDidMount() {
        document.querySelectorAll(".switch input").forEach(function(element) {
            element.addEventListener('click', function(e) {
                // 학기 미이수 checked
                if(hasClass(element.parentElement.parentElement.parentElement,"topColumn")) {
                    var cellIndex = element.parentElement.parentElement.parentElement.parentElement.cellIndex + 1;
                    document.querySelectorAll(".did_subjects td:nth-of-type(" + cellIndex + ")").forEach(function(e) {
                        e.querySelector(".switch input").checked = element.checked;
                        console.log(e);
                        if(element.checked) {
                            if(!hasClass(e, "notpassedArea"))
                                e.className += " notpassedArea";
                            e.querySelectorAll(".did_select_btn_child").forEach(function(e) {
                                removeClass(e, "selectedGrade");
                            });
                        }
                        else
                            removeClass(e, "notpassedArea");
                    });
                }

                //이 외의 녀석들
                else {
                    var cellIndex = element.parentElement.parentElement.parentElement.parentElement.parentElement.cellIndex;
                    var rootColumn = document.querySelector("#did_not_pass td:nth-of-type(" + cellIndex + ") .switch input");
                    var empty = true;
                    document.querySelectorAll(".did_subjects td:nth-of-type(" + (cellIndex + 1) + ")").forEach(function(e) {
                        if(!e.querySelector(".switch input").checked)
                            empty = false;
                    });
                    if(empty) 
                        rootColumn.checked = true;
                    else
                        rootColumn.checked = false;
                    var area = element.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(element.checked) {
                        area.querySelectorAll(".did_select_btn_child").forEach(function(e) {
                            removeClass(e, "selectedGrade");
                        });
                            if(!hasClass(e, "notpassedArea"))
                                area.className += " notpassedArea";
                    }
                    else
                        removeClass(area, "notpassedArea");
                }
            });

        });

        document.querySelectorAll(".did_select_btn_child").forEach(function(element) {
            element.addEventListener('click', function(e) {
                if(hasClass(element, "selectedGrade"))
                    removeClass(element, "selectedGrade");
                else {
                    if(!hasClass(element.parentElement.parentElement, "notpassedArea")) {
                        element.parentElement.querySelectorAll(".did_select_btn_child").forEach(function(e) {
                            removeClass(e, "selectedGrade");
                        });
                        element.className += " selectedGrade";
                    }
                }
            });
        });

        function hasClass(element, cls) {
            return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }

        function removeClass(element, className) {
            var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
            element.className = element.className.replace(check, " ").trim();
        };
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
        for(var i=0; i<6; i++){
            <SwitchBox textlabel="미이수" />
            if(i === 0) checkBoxs.push(<th className={classnames(styles.not_pass_title, styles.grade_table_title)} key={i + 7}></th>);
            checkBoxs.push(
            <td className={styles.check_box}>
                <SwitchBox textlabel="학기 미이수" column="topColumn" />
            </td>);
        }
        return (
            <tr id="did_not_pass">
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
                <span><input type="checkbox" name="whole_checkbox"/></span>
            </td>
        );
    }

}

class SwitchBox extends Component {
    render() {
        return(
            <div className={classnames(innerStyles.switchArea, this.props.column)}>
                <div className={innerStyles.unFinTextArea}>
                    <label>{this.props.textlabel}</label>
                </div>
                <div className={innerStyles.unFinCheckArea}>
                    <label className={innerStyles.switch}>
                        <input type="checkbox"></input>
                        <span className={classnames(innerStyles.slider, innerStyles.round)}></span>
                    </label>
                </div>
            </div>
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
            <td className={innerStyles.did_select_grade}>
                <div className={styles.is_pass_check}>
                     <SwitchBox textlabel="미이수" />
                </div>
                <div>
                    {this.state.btnGroup.map((grades, i) => {
                        return(<BtnGroup group={grades.grade} key={i}/>);
                    })}
                </div>
            </td>
        );
    }
}

class BtnGroup extends Component{
    render(){
        return (
            <div className={innerStyles.did_select_btn_child}>{this.props.group}</div>
        );
    }
}


export default Graduated;