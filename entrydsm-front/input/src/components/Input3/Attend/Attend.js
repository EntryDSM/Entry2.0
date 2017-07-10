import React, {Component} from 'react';
import styles from './Attend.css';

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
            <div className={styles.attendTable}>
                <div>출석성적</div>
                <table>
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
                <td className={styles.td_title}>
                    {this.props.unauthorizedDayType}
                </td>
                <td className={styles.td_content}>
                    <input type="number" />
                </td>
            </tr>
        );
    }
}

export default Attend;