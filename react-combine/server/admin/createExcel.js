const scoreLogic = require('../util/calculator');
const detailType = require('./adminApply');
const mongoXlsx = require('mongo-xlsx');
const logic = require('./logic');
const applyDataModel = require('../database/models/ApplyData');

exports.excel = (userId, callback) => {
    if (typeof userId != 'undefined') {
        console.log('학생 엑셀 출력');
        applyDataModel.findOne({
                "user": userId,
                "applyStatus": true
            })
            .then((findData) => {
                if (findData) {
                    return getObject(findData, true);
                } else {
                    throw ('학생 정보를 찾지 못했습니다.');
                }
            }).then((data) => {
                let model = mongoXlsx.buildDynamicModel(data);
                callback(data, model);
            })
            .catch((err) => {
                console.log('엑셀 - 학생출력 오류 : ' + err);
                callback(null, null);
            });
    } else {
        console.log('전체 엑셀 출력');
        applyDataModel.find({
                "applyStatus": true
            })
            .then((find) => {
                if (0 < find.length) {
                    let arr = new Array();
                    for (let i = 0; i < find.length; i++) {
                        getObject(find[i])
                            .then((eData) => {
                                if (eData) arr.push(eData);
                                else throw ('해당하는 학생 정보를 찾지 못함');
                                if (i == find.length - 1) {
                                    console.log('return array');
                                    console.log(arr.length + ' , ' + find.length);
                                    return arr;
                                } else {}
                            })
                            .then((arr) => {
                                if (arr) {
                                    console.log('들어옴');
                                    let model = mongoXlsx.buildDynamicModel(arr);
                                    callback(arr, model);
                                }
                            })
                            .catch((err) => {
                                console.log('엑셀 - 전체출력 오류 : ' + err);
                                callback(null, null);
                            });
                    }
                } else {
                    callback(null, null);
                }
            });
    }
};


function getObject(findData, check) { // 성적을 입력하기 전의 Object
    return new Promise((resolve, reject) => {
        logic.userInfo(findData.user)
            .then((user) => {
                let date = findData.birthday + '';
                let baseData = {
                    접수번호: findData.examNumber,
                    전형유형: detailType.baseType(findData.classification.applyBaseType.type), //classification.applyBaseType
                    지역: detailType.regionCheck(findData.classification.regionType), //classification.regionType
                    세부유형: detailType.getDetailType(findData.classification.applyBaseType.cause, 'String'),
                    성명: user.name, // user에서 찾은 유저 정보 합치기
                    생년월일: findData.info.birthday, //info.birthday
                    지원자주소: findData.info.addressBase + findData.info.addressDetail, //info
                    지원자휴대폰: findData.info.tel, //info.tel
                    성별: findData.info.sex, //info.sex
                    학력구분: detailType.checkType(findData.classification.graduateType), //classification.graduateType
                    졸업년도: findData.classification.graduateYear, //classification.graduateYear
                    출신학교: findData.info.schoolName, //info.schoolName
                    반: findData.info.class, //info.class
                    보호자성명: findData.info.parentsName, // info.parentsName
                    보호자연락처: findData.info.parentsTel, // info.parentsTel
                };
                let detailData = addSubject(findData);
                getScore(findData)
                    .then((scoreData) => {
                        let addData = Object.assign(baseData, detailData, scoreData);
                        if (check) resolve([addData]);
                        resolve(addData);
                    });
            }).catch((err) => {
                console.log('Excel Error ' + err);
                reject(err);
            });
    });
}

function addSubject(data) {
    const sub = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어'];
    console.log(data.info.parentsName + '의 시작');

    if (data.classification.graduateType != 'BLACK') {
        console.log('성적 - 일반');
        let count = checkCount(data);
        let arrayObj = getArr(sub);
        for (let i = 0; i < count; i++) {
            let obj = {};
            for (let j = 0; j < 7; j++) {
                if (data.grade.score.semesters[i][j].pass) {
                    let name = detailType.getKeyName(i);
                    arrayObj[sub[j] + name] = data.grade.score.semesters[i][j].grade;
                }
            }
        }
        console.log(data.info.parentsName + '의 끝');
        return arrayObj;

    } else {
        console.log('성적 - 검정고시');
        return getArr(sub);
    }

}

function checkCount(data) {
    let count;
    data.classification.graduateType === 'WILL' ? count = 5 : count = 6;
    return count;
}

function getArr(sub) {
    let obj = {};
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let name = detailType.getKeyName(i);
            obj[sub[j] + name] = "";
        }
    }
    return obj;
}

function getScore(data) {
    let obj = {};
    return new Promise((resolve, reject) => {
        scoreLogic.calculate(data.grade, data.classification.graduateType, data.classification.applyBaseType.type)
            .then((sData) => {
                if (data.classification.graduateType != 'BLACK') {
                    obj["1학년"] = sData.score.first;
                    obj["2학년"] = sData.score.second;
                    obj["3학년"] = sData.score.third;
                    obj["교과성적환산점수"] = sData.score.total;
                    obj["봉사시간"] = data.grade.volunteer;
                    obj["봉사점수"] = sData.volunteer;
                    obj["결석"] = data.grade.attend.absence;
                    obj["지각"] = data.grade.attend.lateness;
                    obj["조퇴"] = data.grade.attend.earlyLeave;
                    obj["결과"] = data.grade.attend.subjectEscape;
                    obj["출석점수"] = sData.attendance;
                    obj["1차_전형_총점"] = parseFloat(sData.score.total) + parseFloat(sData.volunteer) + parseFloat(sData.attendance);
                    resolve(obj);
                } else {
                    obj["교과성적환산점수"] = sData.score.total;
                    obj["봉사시간"] = data.grade.volunteer;
                    obj["봉사점수"] = sData.volunteer;
                    obj["출석점수"] = sData.attendance;
                    obj["1차_전형_총점"] = parseFloat(sData.score.total) + parseFloat(sData.volunteer) + parseFloat(sData.attendance);
                    resolve(obj);
                }
            });
    });
}