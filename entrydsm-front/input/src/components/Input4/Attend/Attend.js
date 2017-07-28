import React, {Component} from 'react';
import innerStyles from './Attend.css';
import styles from '../Input4.css';

class Attend extends Component{
    constructor(props){
        super(props);
        this.state = {
            unauthorizedDays: [
                {name: "전체 무단 결석 일수"},
                {name: "전체 무단 지각 일수"},
                {name: "전체 무단 조퇴 일수"},
                {name: "전체 무단 결과 일수"}
            ]
        }
    }

    render(){
        return(
            <div id={innerStyles.attend_table}>
                <div className={styles.grade_table_title}>출석성적</div>
                <table className={styles.grade_table}>
                    <tbody>
                        {this.state.unauthorizedDays.map((unauthorizedDays, index) => {
                            return <UnauthorizedDay unauthorizedDayType={unauthorizedDays.name} key={index}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class UnauthorizedDay extends Component{
    render(){
        return(
            <tr>
                <td id={innerStyles.unauthorized_title} className={styles.grade_td_title}>
                    {this.props.unauthorizedDayType}
                </td>
                <td className={styles.grade_td_content}>
                    <input id={innerStyles.unauthorized_input} type="number" />
                </td>
            </tr>
        );
    }
}

export default Attend;