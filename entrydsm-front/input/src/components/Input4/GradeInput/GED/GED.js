import React, {Component} from 'react';
import styles from './GED.css';

class GED extends Component{
    constructor(props){
        super(props);
        this.state = {
            subjects: [
                {name: '국어'},
                {name: '수학'},
                {name: '사회'},
                {name: '과학'}
            ],
            optionalSubjects: [
                {name: '도덕'},
                {name: '기술'},
                {name: '가정'},
                {name: '체육'},
                {name: '음악'},
                {name: '미술'}
            ]
        }
    }

    render(){
        return(
            <div id={styles.GEDTable}>
                <div className={styles.table_title}>검정고시</div>
                <table>
                    <tbody>
                        {this.state.subjects.map((subject, index) => {
                            return <Subject name={subject.name} key={index}/>
                        })}
                        <tr>
                            <td id={styles.td_option}>
                                <select id={styles.optionalSubjects}>
                                    {this.state.optionalSubjects.map((subject, index) => {
                                        return <option key={index}>{subject.name}</option>
                                    })}
                                </select>
                            </td>
                            <td id={styles.td_content}><input type="number" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class Subject extends Component{
    render(){
        return(
            <tr>
                <td id={styles.td_title} className={styles.subjectName}>{this.props.name}</td>
                <td id={styles.td_content}><input type="number" /></td>
            </tr>
        );
    }
}

export default GED;