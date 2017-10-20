import React, {Component} from 'react';
import UserInfo from '../components/UserInfo';
import SelfIntroduce from '../components/SelfIntroduce';
import StudyPlan from '../components/StudyPlan';
import NoSmoke from '../components/NoSmoke';
import Principal from '../components/Principal';
 
class PreviewContent extends Component { 
     render() {
        let content = null;
        let datas = this.props.datas;
        let graduationYear;
        if(datas.graduation !== "DONE"){
            graduationYear = "2017";
        } else {
            graduationYear = datas.graduateYear;
        }

        let UserInfoData = () => {
            return {
                schoolCode: datas.schoolCode,
                class: datas.class,
                name: datas.name,
                birth: datas.birth,
                sex: datas.sex,
                address: datas.address,
                parentsTel: datas.parentsTel,
                parentsName: datas.parentsName,
                schoolTel: datas.schoolTel,
                schoolName: datas.schoolName,
                phoneNum: datas.phoneNum,
                graduation: datas.graduation,
                type: datas.type,
                local: datas.local,
                isSpecial: datas.isSpecial,
                isBlack: datas.isBlack,
                isCountryMerit: datas.isCountryMerit,
                firstGrade: datas.firstGrade,
                secondGrade: datas.secondGrade,
                thirdGrade: datas.thirdGrade,
                totalSubjectGrade: datas.totalSubjectGrade,
                attend: datas.attend,
                volunteer: datas.volunteer,
                totalGrade: datas.totalGrade,
                submitNumber: datas.submitNumber,
                graduateYear: graduationYear
            }
        }

        let SelfIntroduceData = () => {
            return  {
                name: datas.name,
                schoolName: datas.schoolName,
                introduce: datas.introduce,
                submitNumber: datas.submitNumber
            }
        }

        let StudyPlanData = () => { 
            return {
                name: datas.name,
                schoolName: datas.schoolName,
                plan: datas.plan,
                submitNumber: datas.submitNumber
            }
         } 

        let NoSmokeData = () => {
            return {
                name: datas.name,
                phoneNum: datas.phoneNum,
                schoolName: datas.schoolName,
                address: datas.address,
                submitNumber: datas.submitNumber
            }
        }

        let PrincipalData = () => {
            return { 
                schoolName: datas.schoolName,
                local: datas.local,
                type: datas.type,
                class: datas.class,
                name: datas.name
            }
        } 

        if(true) {
            switch(this.props.target) {
                case "userInfo":
                    content = <UserInfo datas= {UserInfoData}/>;
                    break;
                case "self":
                    content = <SelfIntroduce datas= {SelfIntroduceData}/>;
                    break;
                case "plan":
                    content = <StudyPlan datas= {StudyPlanData}/>;
                    break;
                case "noSmoke":
                    content = <NoSmoke datas= {NoSmokeData}/>;
                    break;
                case "principal":
                    content = <Principal datas= {PrincipalData}/>;
                    break;
                default:
                    break;
            }
        }
        
        return(
            <div id="London" className="tabcontent">
                {content}
            </div>
        );
    }
}

export default PreviewContent;