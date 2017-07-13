let mongoose = require('mongoose');

let schema = mongoose.Schema({
    user: { type : String, required : true, unique : true },
    submitNumber: { type : Number, default : null },
    examNumber: { type : Number, default : null },
    schoolCode: { type : Number, default : null },
    schoolName: { type : String, default : "" },
    name: { type : String, default : "" },
    birthday: { type : Date, default : null },
    sex: { type : String, default : "" },
    postNumber: { type : String, default : "" },
    addressBase: { type : String, default : "" },
    addressDetail: { type : String, default : "" },
    parentName: { type : String, default : "" },
    parentTel: { type : String, default : "" },
    schoolTel: { type : String, default : "" },
    myTel: { type : String, default : "" },
    graduateType: { type : String, default : "" },
    graduateYear: { type : String, default : "" },
    regionType: { type : String, default : "" },
    applyBaseType: { type : String, default : "" },
    applyDetailType: { type : String, default : "" },
    score : { type : JSON, default : null },
    attend : { type : JSON, default : null },
    volunteer : { type : Number, default : null },
    memberImage: { type : String, default : "" },
    introduce: { type : String, default : "" },
    studyPlan: { type : String, default : "" },
    grade: { type : Number, default : null },
    class: { type : Number, default : null },
    attendance : {type : Number,default : null},
    applyStatus: { type : Boolean, default : false },
    createDate : { type : Date, default : Date.now() },
    updateDate: { type : Date, default : Date.now() }
}, {collection : 'applyData'});

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
regionType : 지역 유형
applyBaseType : 지원 유형 (일반전형, 마이스터 인재전형, 사회 통합 전형)
applyDetailType : 비고 (일반, 국가유공자, 특례입학자)
score :
1) 재학중/졸업 ::
{
    semester : [0][ // 1학년 1학기 성적 | 졸업예정자는 [4], 졸업자는 [5]까지 있음 (3학년 2학기)
        {  // 국어
            "pass" : Boolean,  // 이수 여부
            "grade" : String   // 점수
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
memberImage : 이미지 경로
introduce : 자기소개서
studyPlan : 학업계획서
attendance : 출석
grade : 학년 (졸업예정, 졸업자는 3으로 고정)
class : 반
applyStatus : 원서 접수 여부
createDate : 문서가 만들어진 날짜
updateDate : 수정 날짜 (시간)
*/
module.exports = schema;
