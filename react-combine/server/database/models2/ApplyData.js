let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ApplyData = Schema({
    user: { type : Schema.Types.ObjectId, ref : 'User', required : true, unique : true },
    classification: { type : JSON, required: true },
    info: { type: JSON, required: true },
    grade: { type: JSON, required: true },
    introduce: { type: JSON, required: true },
    submitNumber: { type : Number, default : null },
    examNumber: { type : Number, default : null },
    applyStatus: { type : Boolean, default : false },
    createdAt : { type : String, required: true },
    updatedAt: { type : String, required: true }
}, {collection : 'ApplyData'});

/*
user : 지원자 고유 키
submitNumber : 접수번호
examNumber : 수험번호
schoolCode : 학교 코드
schoolName : 학교명
name : 지원자 이름
birthday : 생년월일
sex : 성별
postNumber : 우편번호
addressBase : 기본주소
addressDetail :  상세주소
parentName : 보호자 이름
parentTel : 보호자 연락처
schoolTel : 학교 연락처
myTel : 지원자 연락처
graduateType : 졸업 유형   (Will : 졸업 예정, Done : 졸업, Black : 검정고시)
graduateYear : 졸업 년도
regionType : 지역 유형 (대전, 전국)
applyBaseType : 지원 유형 (일반전형, 마이스터 인재전형, 사회 통합 전형)
applyDetailType : 비고 (일반, 국가유공자, 특례입학자)
score :
1) 재학중/졸업 ::
{
    semester : [0][ // 1학년 1학기 성적 | 졸업예정자는 [4], 졸업자는 [5]까지 있음 (3학년 2학기)
        {  // 국어
            "pass" : Boolean,  // 이수 여부
            "grade" : String   // 등급
        },
        {
            "pass" : Boolean,
            "grade" : String
        },
        {
            "pass" : Boolean,
            "grade" : String
        },
        {
            "pass" : Boolean,
            "grade" : String
        },
        {
            "pass" : Boolean,
            "grade" : String
        },
        {
            "pass" : Boolean,
            "grade" : String
        },
        {
            "pass" : Boolean,
            "grade" : String
        }
    ]
}
2) 검정고시 졸업생 ::
{
    scores : [100,100,100,100], // 차례대로 국어 수학 사회 과학
    choose : { "subject" : 과목명, "score" : 점수 } // 선택과목 한 과목
}
attend : {"absence" : 무단 결석 일수, "lateness" : 무단 지각 일수, "earlyLeave" : 무단 조퇴 일수, "subjectEscape" : 무단 결과 일수}
volunteer : 봉사 시간
profileImageSrc : 이미지 경로
introduce : 자기소개서
studyPlan : 학업계획서
attendance : 출석
grade : 학년 (졸업예정, 졸업자는 3으로 고정)
class : 반
applyStatus : 원서 접수 여부
createdAt : 문서가 만들어진 날짜
updatedAt : 수정 날짜 (시간)
*/

const documentTemplate = {
    classification: {
        "isBlack": false, // 검정고시 여부
        "regionType": 'HOME', // or AWAY
        "graduateType": 'WILL', // or DONE or null
        "graduateYear": '2018', // default
        "applyBaseType": {
            "type": 'COMMON', // or MEISTER or SOCIAL
            "cause": null
            // cause === 사회통합전형 사유
            // BASIC_BENEFICIARY : 기초생활수급권자
            // SINGLE_PARENT : 한부모가정
            // LOWER_INCOME : 차상위계층
            // LOW_INCOME : 차사상위계층
            // FROM_NORTH : 북한이탈주민
            // MULTICULTURAL : 다문화가정
            // ETC : 기타
        },
        applyDetailType: {
            "IS_COMMON": true, // 일반
            "IS_NATIONAL_MERIT": false, // 국가 유공자 후손 여부
            "IS_EXCEPTIONEE": false // 특례입학 대상자 여부
        }
    },
    info: {
        "sex": null, // man or woman
        "birthday": null,
        "grade": 3,
        "class": null,
        "number": null,
        "schoolCode": "",
        "schoolName": "",
        "tel": "",
        "parentsName": "",
        "parentsTel": "",
        "schoolTel": "",
        "addressBase": "",
        "addressDetail": ""
    },
    grade: {
        "volunteer": null,
        "attend": {
            "absence": 0, // 무단 결석
            "lateness": 0, // 무단 지각
            "earlyLeave": 0, // 무단 조퇴
            "subjectEscape": 0 // 무단 결과
        },
        "score": this.grade_will
    },
    introduce: {
        "introduce": "",
        "plan": ""
    },
    grade_black: {
        scores: [null, null, null, null], // 차례대로 국어 수학 사회 과학
        choose: { "subject": null, "score": null } // 선택과목 한 과목
    },
    grade_done: gradeTableGenerate(6),
    grade_will: gradeTableGenerate(5)
}

function gradeTableGenerate(semester) {
    let semesters = {
        "semester": [
        ]
    }
    let inSemester = [];
    for (let j = 0; j < 7; j++) {
        inSemester.push({
            "pass": true,
            "grade": null
        })
    }
    for (let i = 0; i < semester; i++) {
        semesters.semester.push(inSemester);
    }
    return semesters;
}

ApplyData.statics.createEmpty = function (user) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return new this({
        user,
        "classification": documentTemplate.classification,
        "info": documentTemplate.info,
        "grade": documentTemplate.grade,
        "introduce": documentTemplate.introduce,
        "createdAt": date_now,
        "updatedAt": date_now
    }).save();
}

ApplyData.methods.reviseClassification = function (classification) {
    if ((this.classification.isBlack !== classification.isBlack) && classification.isBlack) this.grade = documentTemplate.grade_black;
    else if (this.classification.isBlack && (this.classification.isBlack !== classification.isBlack)) {
        this.grade = documentTemplate[classification.graduateType == 'WILL' ? 'grade_will' : 'grade_done'];
    }
    this.classification = classification;
    return this.save();
}

ApplyData.methods.reviseInfo = function (info) {
    this.info = info;

    return this.save();
}

ApplyData.methods.reviseGrade = function (grade) {
    this.grade = grade;

    return this.save();
}

ApplyData.methods.reviseIntroduce = function (introduce) {
    this.introduce = introduce;
    
    return this.save();
}

/**
 * 
 * TO DO :: ApplyData Validation
 */
ApplyData.methods.validation = function(){
    let result = {};
}

function classificationValidation(classification){
    let result = [];

}
module.exports = mongoose.model('ApplyData', ApplyData);
