import React, {Component} from 'react';
import styles from './Attend.css';

class Attend extends Component{
    constructor(props){
        super(props);
        this.state = {
            unauthorizedDays: [
                {name: "전체 무단 결석 일수 :"},
                {name: "전체 무단 지각 일수 :"},
                {name: "전체 무단 조퇴 일수 :"},
                {name: "전체 무단 결과 일수 :"}
            ]
        }
    }

    render(){
        return(
            <div className={styles.attendDiv}>
                <h2 id={styles.attendTitle}>출석 성적</h2>
                {this.state.unauthorizedDays.map((unauthorizedDays, index) => {
                    return <UnauthorizedDay unauthorizedDayType={unauthorizedDays.name} key={index}/>
                })}
            </div>
        );
    }
}

class UnauthorizedDay extends Component{
    render(){
        return(
            <p className={styles.UnauthorizedDayInput}>{this.props.unauthorizedDayType} <input className={styles.dayInput} type="number"/></p>
        );
    }
}

export default Attend;