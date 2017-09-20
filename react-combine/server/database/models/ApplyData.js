let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const calculator = require('../../util/calculator');

let ApplyData = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    classification: { type: JSON, required: true },
    info: { type: JSON, required: true },
    grade: { type: JSON, required: true },
    introduce: { type: JSON, required: true },
    submitNumber: { type: Number, required: true, default: -1 },
    examNumber: { type: Number, default: null },
    applyStatus: { type: Boolean, default: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    profile: { type: String, required: false, default: null }
}, { collection: 'ApplyData' });

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
    semesters : [0][ // 1학년 1학기 성적 | 졸업예정자는 [4], 졸업자는 [5]까지 있음 (3학년 2학기)
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

function gradeTableGenerate(semester) {
    let grade = {
        "semesters": [
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
        grade.semesters.push(inSemester);
    }
    return grade;
}

const grade_done = gradeTableGenerate(6);
const grade_will = gradeTableGenerate(5);

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
    info_not_black: {
        "sex": null, // man or woman
        "birthday": "",
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
    info_black: {
        "sex": null, // man or woman
        "birthday": "",
        "tel": "",
        "parentsName": "",
        "parentsTel": "",
        "addressBase": "",
        "addressDetail": ""
    },
    grade: {
        "volunteer": 0,
        "attend": {
            "absence": 0, // 무단 결석
            "lateness": 0, // 무단 지각
            "earlyLeave": 0, // 무단 조퇴
            "subjectEscape": 0 // 무단 결과
        },
        "score": grade_will,
        "calculatedScore": null
    },
    introduce: {
        "introduce": "",
        "plan": ""
    },
    grade_black: {
        "volunteer": 0,
        "attend": {
            "absence": 0, // 무단 결석
            "lateness": 0, // 무단 지각
            "earlyLeave": 0, // 무단 조퇴
            "subjectEscape": 0 // 무단 결과
        },
        "calculatedScore": null,
        "score" : {
            scores: [null, null, null, null], // 차례대로 국어 수학 사회 과학
            choose: { "subject": null, "score": null } // 선택과목 한 과목
        }
    },
}

ApplyData.statics.findOneByUser = function (user) {
    return this.findOne({ user }).exec();
}

ApplyData.methods.apply = function () {
    this.applyStatus = true;
    return this.save();
}

ApplyData.statics.createEmpty = function (user) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    this.find({}, { 'submitNumber': true }).sort({ 'submitNumber': -1 })
        .then((current) => {
            console.log("===================\n" + current[0])
            console.log("===================\n" + current.length);
            const next = typeof current[0] !== "undefined" ? current[0].submitNumber + 1 : 1;
            console.log("===================\n" + next)
            
            let applyData = new this({
                user,
                "classification": documentTemplate.classification,
                "info": documentTemplate.info_not_black,
                "grade": documentTemplate.grade,
                "introduce": documentTemplate.introduce,
                "createdAt": date_now,
                "updatedAt": date_now,
                "submitNumber": next
            });
            console.log(applyData.grade);
            if (applyData.classification.isBlack) applyData.grade.score = documentTemplate.grade_black;
            else applyData.grade.score = applyData.classification.graduateType === 'WILL' ? grade_will : grade_done;
            return applyData.save();
        })
        .catch((err) => {
            console.log(err);
        })
}

ApplyData.methods.reviseProfile = function (src) {
    this.profile = src;

    return this.save();
}

ApplyData.methods.reviseClassification = function (classification) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.updatedAt = date_now;

    if ((this.classification.isBlack !== classification.isBlack) && classification.isBlack) {
        this.info = documentTemplate.info_black;
        this.grade = documentTemplate.grade_black;
    }
    else if (this.classification.isBlack && (this.classification.isBlack !== classification.isBlack)) {
        this.info = documentTemplate.info_not_black;
        this.grade = documentTemplate[classification.graduateType == 'WILL' ? 'grade_will' : 'grade_done'];
    }
    this.classification = classification;
    return this.save();
}

ApplyData.methods.reviseInfo = function (info) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.updatedAt = date_now;

    this.info = info;

    return this.save();
}

ApplyData.methods.reviseGrade = function (grade) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.updatedAt = date_now;

    this.grade = grade;

    const _applyData = this;
    console.log("=======================");
    console.log(_applyData);
    new Promise((resolve, reject) => {
        resolve(gradeValidation(_applyData.classification.isBlack ? 'BLACK' : _applyData.classification.graduateType, _applyData.grade));
    })
        .then((validationResult) => {
            console.log(validationResult);
            if (validationResult.length === 0) {
                return calculator.calculate(_applyData.grade, _applyData.classification.graduateType, _applyData.classification.applyBaseType.type);
            }
            else return;
        })
        .then(score => {
            console.log(score);
            _applyData.grade.calculatedScore = score;
            return _applyData.save();
        })
        .catch(console.log);
}

ApplyData.methods.reviseIntroduce = function (introduce) {
    const date = new Date();
    const date_now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.updatedAt = date_now;

    this.introduce = introduce;

    return this.save();
}

/**
 * 
 * TO DO :: ApplyData Validation
 */
ApplyData.methods.validation = function () {
    const data = this;
    return new Promise((resolve, reject) => {
        let result = { 'classification': [], 'info': [], 'grade': [], 'introduce': [] };


        if (data.classification.isBlack) {
            result.info = infoValidation('BLACK', this.info);
            result.grade = gradeValidation('BLACK', this.grade);
        }
        else if (data.classification.graduateType === 'WILL') {
            result.info = infoValidation('WILL', this.info)
            result.grade = gradeValidation('WILL', this.grade);
        }
        else {
            result.info = infoValidation('DONE', this.info)
            result.grade = infoValidation('DONE', this.grade)
        }
        result.introduce = introduceValidation(this.introduce);

        resolve(result);
    })
}

function infoValidation(type, info) {
    let result = [];
    if (info.sex == null) result.push('성별 정보를 입력해주세요.');
    if (info.birthday == null) result.push('생일을 입력해주세요.');
    if (type !== 'BLACK' && (info.grade > 3 || info.grade < 1)) result.push('학년 정보를 정확히 입력해주세요.');
    if (type !== 'BLACK' && (info.class == null)) result.push('반을 입력해주세요.');
    if (type !== 'BLACK' && (info.schoolCode == null || info.schoolName == null || info.schoolTel == null)) result.push('학교 정보를 입력해주세요.');
    if (info.tel == null) result.push('전화번호를 입력해주세요.');
    if (info.parentsName == null) result.push('부모님 성함을 입력해주세요.');
    if (info.parentsTel == null) result.push('부모님 전화번호를 입력해주세요.');
    if ((info.addressBase == null) || (info.addressDetail == null)) result.push('주소를 빠짐없이 입력해주세요.');

    return result;
}

function gradeValidation(type, grade) {
    let result = [];
    if (type === 'WILL') {
        let subjects = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어']
        console.log(grade);
        const semesters = grade.score.semesters;

        for (var i = 0; i < 5; i++) {
            if (semesters[i][0].pass === true && semesters[i][0].grade === null &&
                semesters[i][1].pass === true && semesters[i][1].grade === null &&
                semesters[i][2].pass === true && semesters[i][2].grade === null &&
                semesters[i][3].pass === true && semesters[i][3].grade === null &&
                semesters[i][4].pass === true && semesters[i][4].grade === null) {
                result.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 성적을 입력해주세요.');
                continue;
            }
            for (var j = 0; j < 7; j++) {
                if (semesters[i][j].pass === true) {

                    if (semesters[i][j].grade === null) {
                        result.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 ' + subjects[j] + '성적을 입력해주세요.');
                    }
                }
            }
        }
    }
    else if (type === 'DONE') {
        let subjects = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어']
        const semesters = grade.score.semesters;

        for (var i = 0; i < 6; i++) {
            if (semesters[i][0].pass === true && semesters[i][0].grade === null &&
                semesters[i][1].pass === true && semesters[i][1].grade === null &&
                semesters[i][2].pass === true && semesters[i][2].grade === null &&
                semesters[i][3].pass === true && semesters[i][3].grade === null &&
                semesters[i][4].pass === true && semesters[i][4].grade === null &&
                semesters[i][5].pass === true && semesters[i][5].grade === null) {
                result.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 성적을 입력해주세요.');
                continue;
            }
            for (var j = 0; j < 7; j++) {
                if (semesters[i][j].pass === true) {

                    if (semesters[i][j].grade === null) {
                        result.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 ' + subjects[j] + '성적을 입력해주세요.');
                    }
                }
            }
        }
    }
    else if (type === 'BLACK') {
        let subjects = ['국어', '수학', '사회', '과학'];
        const score = grade.score;

        for (var i = 0; i < score.scores.length; i++) {
            if (score.scores[i] == null) {
                messages.push('검정고시 ' + subjects[i] + ' 성적을 입력해주세요.');
            }
        }
        if ((score.choose.subject === "") || (score.choose.subject === null)) messages.push('검정고시 선택과목에 대한 점수를 입력해주세요.');
        else if (score.choose.subject !== "" && score.choose.score === null) {
            messages.push('선택과목 ' + score.choose.subject + ' 점수를 입력해주세요.');
        }
    }

    return result;
}

function introduceValidation(introduce) {
    let result = [];
    if (introduce.introduce.length === 0) result.push('자기소개서를 입력해주세요.');
    if (introduce.plan.length === 0) result.push('학업계획서를 입력해주세요.');

    return result;
}
module.exports = mongoose.model('ApplyData', ApplyData);
