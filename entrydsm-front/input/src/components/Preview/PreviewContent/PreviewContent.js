import React, {Component} from 'react';
import styles from './PreviewContent.css';
import UserInfo from './UserInfo/UserInfo';
import SelfIntroduce from './SelfIntroduce/SelfIntroduce';
import StudyPlan from './StudyPlan/StudyPlan';
import NoSmoke from './NoSmoke/NoSmoke';
import Principal from './Principal/Principal';
 
class PreviewContent extends Component {

    constructor() {
        super();
    }
 
     render() {
        var content = null;
        if(true) {// this.props.target != null) {
            switch("principal") {//this.props.target) {
                case "userInfo":
                    content = <UserInfo datas= {this.props.datas}/>;
                    break;
                case "self":
                    content = <SelfIntroduce datas= {this.props.datas}/>;
                    break;
                case "plan":
                    content = <StudyPlan datas= {this.props.datas}/>;
                    break;
                case "noSmoke":
                    content = <NoSmoke datas= {this.props.datas}/>;
                    break;
                case "principal":
                    content = <Principal datas= {this.props.datas}/>;
                    break;
            }
        }
        return(
            <div id="London" className={styles.tabcontent}>
                {content}
            </div>
        );
    }
}

export default PreviewContent;