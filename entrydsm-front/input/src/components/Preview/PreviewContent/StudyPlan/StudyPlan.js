import React, {Component} from 'react';
import styles from './StudyPlan.css';
 
class StudyPlan extends Component {

    constructor() {
        super();
    }
 
     render() {
        var arr = [];

        var addressData = null;
        var tableHeader = null;

        switch(this.props.target) {
            case "userInfo":
                return <UserInfo />
            case "self":
                return <SelfIntroduce />
            case "plan":
                return <StudyPlan />
            case "noSmoke":
                return <NoSmoke />
            case "principal":
                return <Principal />
            
        }
    }
}

export default StudyPlan;