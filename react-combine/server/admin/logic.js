const scoreLogic = require('../util/calculator');
const applyFormat = require('./adminApply');
const applyDataModel = require('../database/models/ApplyData');
const user = require('../database/models/User');

exports.findBase = (userId, database) => { // 겹치는 로직 중복 최적화 필요해 제작 setData();
    return new Promise((resolve, reject) => {
        applyDataModel.findOne({
            "user": userId
        }).then((find) => {
            if (find) {
                setData(find)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((data) => {
                        console.log('Error ' + data);
                    });
            } else {
                reject('조건에 맞는 유저를 찾지 못했습니다.');
            }
        });

    });
};
exports.getDetail = (userId) => { // 상세보기 나머지 데이터 부분 addObj()
    return new Promise((resolve, reject) => {
        applyDataModel.findOne({
            "user": userId
        }).then((data) => {
            if (data) {
                addObj(data)
                    .then((obj) => {
                        resolve(obj);
                    });
            } else {
                reject('유저 정보 찾지 못함');
            }
        })
    });
};


function setData(find) {
    let obj = {};
    return new Promise((resolve, reject) => {
        user.findOne({
                "_id": find.user
            })
            .then((data) => {
                if (data) {
                    obj["_id"] = find.user;
                    obj["examNumber"] = find.examNumber; //수험번호
                    obj["name"] = data.name; //이름
                    obj["applyBaseType"] = applyFormat.baseType(find.classification.applyBaseType.type); // 전형
                    obj["schoolName"] = find.info.schoolName; //중학교명
                    obj["receipt"] = find.checkReceipt; //원서 조회여부
                    obj["regionType"] = applyFormat.regionCheck(find.classification.regionType); // 관내/관외 여부
                    obj["sex"] = find.info.sex; //성별
                    obj["payment"] = find.checkPayment; //결제 여부
                    resolve(obj);
                } else {
                    reject('학생 정보를 찾지못함');
                }
            });
    });

}

function addObj(data) {
    return new Promise((resolve, reject) => {
        let address = data.info.addressBase + data.info.addressDetail;
        let obj = {};
        obj["schoolCode"] = data.info.schoolCode; // 학교번호
        obj["myTel"] = data.info.tel; //본인연락처
        obj["class"] = data.info.class; //반
        obj["birthday"] = data.info.birthday; //생일
        obj["address"] = address; //주소
        obj["memberImage"] = data.profile; //이미지 경로
        obj["graduateType"] = applyFormat.checkType(data.classification.graduateType); //졸업구분
        obj["parentTel"] = data.info.parentsTel; //보호자 전화번호
        obj["schoolTel"] = data.info.schoolTel; //학교 연락처
        obj["remarks"] = applyFormat.check(data.classification, 'String'); //지원자 특기사항
        getScoreData(data, (data) => {
            obj["score"] = data;
            resolve(obj);
        }); // 일반 또는 검정고시의 성적 데이터
    });
}

function getScoreData(uData, callback) {
    let obj = new Array();
    scoreLogic.calculate(uData.grade, uData.classification.graduateType, uData.classification.applyBaseType.type)
        .then((data) => {

            if (uData.classification.graduateType != 'BLACK') {
                obj.push({
                    "first": data.score.first
                });
                obj.push({
                    "second": data.score.second
                });
                obj.push({
                    "third": data.score.third
                });
                obj.push({
                    "subjectTotal": data.score.total
                });
                obj.push({
                    "volunteer": data.volunteer
                });
                obj.push({
                    "attend": data.attendance
                });
                obj.push({
                    "finalSum": parseFloat(data.score.total) + parseFloat(data.volunteer) + parseFloat(data.attendance)
                });
                callback(obj);

            } else { // 검정고시 일경우
                obj.push({
                    "blackTotal": data.score.total
                });
                obj.push({
                    "volunteer": data.volunteer
                });
                obj.push({
                    "attend": data.attendance
                });
                obj.push({
                    "finalSum": parseFloat(data.score.total) + parseFloat(data.volunteer) + parseFloat(data.attendance)
                });
                callback(obj);
            }
        });

}

function verification(data) {
    let payment = data.checkPayment;
    let receipt = data.checkReceipt;

    if (payment && receipt) {
        return true;
    } else {
        return false;
    }
}

exports.createNum = (userId) => {
    return new Promise((resolve, reject) => {
        applyDataModel.findOne({
                "user": userId,
                "applyStatus": true
            })
            .then((find) => {
                if (find && verification(find)) {
                    if (!find.examNumber) {
                        let examNum = new Array();
                        examNum.push(getNumber(find.classification)); // 일반, 마이스터, 사회 통합 
                        applyFormat.regionCheck(find.classification.regionType) === '대전' ? examNum.push(1) : examNum.push(2);
                        examNum.push(applyFormat.getDetailType(find.classification.applyBaseType.cause, 'Number')); // detail부분 숫자 
                        examNum.push(changeExamNum(find.submitNumber));
                        console.log(formatNum(examNum));
                        find.updateExamNumber(formatNum(examNum))
                            .then(() => {
                                resolve();
                            }).catch((err) => {
                                console.log('수험번호 생성중 오류 ' + err);
                                reject(err);
                            })
                    } else {
                        reject('이미 존재하는 값 입니다 ');
                    }
                } else {
                    reject('결제, 접수, 서류  확인이 필요합니다');
                }
            })
    });
};

function getNumber(data) {
    let apply = data.applyBaseType.type;
    if (apply == 'COMMON') {
        return 1;
    } else if (apply == 'MEISTER') {
        return 2;
    } else if (apply == 'SOCIAL') {
        return 3;
    }
}

function formatNum(arr) {
    let str = '';
    for (let i of arr) {
        str = str + i + '';
    }
    return str;
}

function changeExamNum(n) { // 1,2,3 등의 한자리숫자 001,002등으로 변경
    n = n + '';
    return n.length >= 3 ? n : new Array(3 - n.length + 1).join('0') + n;
}

exports.userInfo = (data) => {
    return new Promise((resolve, reject) => {
        user.findOne({
                "_id": data
            })
            .then((userData) => {
                if (userData)
                    resolve(userData);
                else {
                    reject('Not Found userData');
                }
            });
    })
}

exports.search = (body) => {
    let obj;
    return new Promise((resolve, reject) => {
        if (body.advanceSearch == 'true') {
            console.log('상세 검색');
            obj = getSearch(body);
            console.log(obj);
        } else if (body.advanceSearch == 'false'){
            console.log('전체 검색');
            obj = getSearch(body, true);
        } else {
            obj = {};
        }
        applyDataModel.find(obj)
            .then(data => getSearchName(data))
            .then((data) => {
                console.log(data)
                data ? resolve(data) : reject('데이터가 존재하지않음');
            })
            .catch((err) => {
                console.log('검색 중 Error - ' + err);
                reject(err);
            })
    })
}

function getSearch(body, check) {
    let returnData;
    let obj = {
        "classification.regionType": body.region,
        "info.sex": body.gender,
        "classification.applyBaseType.type": body.applyType,
        "checkReceipt": body.checkReceipt,
        "checkPayment": body.checkPayment,
        // "examNumber": body.examNumber,
        // "info.schoolName": body.schoolName
    };
    if ((body.name || body.examNumber || body.schoolName) && typeof check == 'undefined') { // 상세 - 추가 입력
        let addObj = {
            $or: [{
                    "name": body.name
                },
                {
                    "examNumber": body.examNumber
                },
                {
                    "info.schoolName": body.schoolName
                }
            ]
        };
        returnData = Object.assign(deleteKey(obj), addObj);
    } else if (typeof check == 'undefined') { // 상세검색 
        returnData = obj;
    } else { // 전체검색
        returnData = {
            "classification.regionType": body.region,
        };
    }

    return returnData;
}

function deleteKey(data) {
    delete data.examNumber;
    delete data["info.schoolName"];
    return data;
}

function getSearchName(data) {
    return new Promise((resolve, reject) => {
        let arr = new Array;
        if (0 >= data.length) reject('해당하는 학생 정보 찾지못함');
        for (let i = 0; i < data.length; i++) {
            user.findOne(data[i].user)
                .then((find) => {
                    find ? arr.push(addSearchObj(find, data[i])) : reject('해당하는 학생 정보 찾지못함');
                    if (i === data.length - 1) {
                        resolve(arr);
                    }
                })
        }

    })
}

function addSearchObj(user, apply) {
    let obj = {};
    obj.applyStatus = apply.applyStatus;
    obj.examNumber = apply.examNumber;
    obj.applyBaseType = apply.classification.applyBaseType.type;
    obj.name = user.name;
    obj.receipt = apply.checkReceipt;
    obj.payment = apply.checkPayment;
    obj.schoolName = apply.info.schoolName;
    obj.user = apply.user;
    return obj;
}

exports.updateApplyStatus = (applyStatus, user) => {
    return new Promise((resolve, reject) => {
        applyDataModel.update({ "user": user }, { $set: { "applyStatus": applyStatus } }, (err) => {
            err ? reject(err) : resolve();
        })
    })
}

exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        applyDataModel.findOne({ "user": userId })
            .then(data => data.removeData())
            .then(() => {
                user.remove({ "_id": userId })
                    .then(() => resolve())
            })
            .catch((err) => {
                console.log('삭제 오류');
                console.log(err);
                reject(err);
            })
    });
}