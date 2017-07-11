let mongoose = require('mongoose');
let schema = require('../schemas/applydata');
let crypto = require('crypto');
let config = require('../../config');
let model = {};

schema.static('updatepersonal', function (id, newData, callback) {
    var month = newData.month < 10 ? '0' + newData.month : newData.month;
    var date = newData.date < 10 ? '0' + newData.date : newData.date;
    var birth = newData.year + '-' + month + '-' + date;
    return this.updateOne({
        user: id
    }, {
        $set: {
            schoolCode: newData.schoolCode,
            schoolName: newData.schoolName,
            gradeNumber: newData.grade,
            classNumber: newData.class,
            birthday: birth,
            sex: newData.sex,
            addressBase: newData.addressBase,
            addressDetail: newData.addressDetail,
            parentName: newData.parentName,
            parentTel: newData.parentTel,
            schoolTel: newData.schoolTel,
            myTel: newData.myTel,
            updateDate: new Date() // need to be updated
        }
    }, callback);
});

schema.static('updateimage', function (id, newPath, callback) {
    return this.updateOne({
        user: id
    }, {
        $set: {
            memberImage: newPath
        }
    }, callback);
});

schema.static('validation', function (id, callback) {
    let response = {
        pageValidation: {
            info: false,
            score: false,
            introduce: false
        },
        info: {
            "url": config.getPageUrl('info'),
            "messages": []
        },
        score: {
            "url": config.getPageUrl('score'),
            "messages": []
        },
        introduce: {
            "url": config.getPageUrl('introduce'),
            "messages": []
        }
    };
    this.findOne({
        "user": id
    }, function (err, user) {
        if (!user) {
            // 사용자 찾지 못함 :: 400 반환
            callback(400);
        } else {

            let validation = new Promise(function (resolve, reject) {

                // info, score, introduce 페이지 각각의 유효성 검사 결과 메시지를 담을 변수 선언
                let infoMessages = response.info.messages;
                let scoreMessages = response.score.messages;
                let introduceMessages = response.introduce.messages;

                // 모든 학생 원서의 공통적 요소 검사 :: 학생 신상정보 검사
                parentValidation(user.parentName, user.parentTel, infoMessages);
                birthdayValidation(user.birthday, infoMessages);
                sexValidation(user.sex, infoMessages);
                addressValidation(user.addressBase, user.addressDetail, infoMessages);
                telValidation(user.myTel, infoMessages);
                memberImageValidation(user.memberImage, infoMessages);

                // 모든 학생 원서의 공통적 요소 검사 :: 학생 성적
                volunteerValidation(user.volunteer, scoreMessages);

                // 모든 학생 원서의 공통적 요소 검사 :: 학생 자기소개서 / 학업계획서 
                introduceValidation(user.introduce, introduceMessages);
                studyPlanValidation(user.studyPlan, introduceMessages);
                console.log(user.graduateType + " : " + typeof user.graduateType);


                // 학생 졸업 유형에 따른 개별적 요소 검사 :: 졸업 예정
                if (user.graduateType === 'Will') {
                    console.log('ddd');
                    schoolValidation(user.schoolName, user.schoolTel, infoMessages);
                    classValidation(user.class, infoMessages);
                    attendValidation(user.attend, scoreMessages);
                    scoreValidationForWill(user.score, scoreMessages);
                    console.log(response);
                    resolve(response);
                }

                // 학생 졸업 유형에 따른 개별적 요소 검사 :: 졸업
                else if (user.graduateType === 'Done') {
                    schoolValidation(user.schoolName, user.schoolTel, infoMessages);
                    classValidation(user.class, infoMessages);
                    attendValidation(user.attend, scoreMessages);
                    scoreValidationForDone(user.score, scoreMessages);
                    resolve(response);
                }

                // 학생 졸업 유형에 따른 개별적 요소 검사 :: 검정고시
                else if (user.graduateType == 'Black') {
                    scoreValidationForBlack(user.score, scoreMessages);
                    resolve(response);
                }
                // 졸업 유형을 선택하지 않았을 때 reject() 호출
                else reject();

            });

            validation.then(function (response) {
                if (response.info.messages.length === 0) response.pageValidation.info = true;
                if (response.score.messages.length === 0) response.pageValidation.score = true;
                if (response.introduce.messages.length === 0) response.pageValidation.introduce = true;
                callback(response);
            }).catch(function () {
                // 응답코드 412 반환
                callback(412);
            })
        }
    })
});


function memberImageValidation(memberImage, messages) {
    // 프로필 이미지 경로 값이 null일 때
    if (memberImage === "") {
        messages.push('증명사진을 등록해주세요.');
        return;
    }

    // 프로필 이미지 경로로 파일을 불러들일 수 없을 때 (상대경로로는 불러들일 수 없음)
    try {
        let profile = fs.readFileSync(rootPath + '/profileImages/' + memberImage);
    } catch (err) {
        messages.push('증명사진을 등록해주세요.');
    }

};

// 학년 값은 졸업 구분이 졸업 예정 / 졸업자인 경우에만 존재하고, 값이 3으로 고정됨
// function gradeValidation(grade, messages) {

//     // 학년 값이 null일 때
//     if (grade === null) {
//         messages.push('학년이 입력되지 않았습니다.');
//     }

//     // 학년 값이 정수가 아닐 때
//     else if (grade % 1 !== 0) messages.push('학년은 정수 1~3 중 하나여야 합니다. 현재 입력된 값 : ' + grade);

//     // 학년 값이 1~3이 아닐 때 
//     else if (3 < grade || grade < 0) {
//         messages.push('학년은 1~3 중 하나여야 합니다. 현재 입력된 값 : ' + grade);
//     }

// };

function classValidation(Class, messages) {
    if (Class === null) {
        messages.push('반이 입력되지않았습니다.');
    }


    // 반 값이 정수가 아닐 때 
    else if (Class % 1 !== 0) {
        messages.push('반이 잘못입력되었습니다. 현재 입력된 값 : ' + Class);
    }

};

function sexValidation(sex, messages) {
    if (sex === "") messages.push('성별을 입력해주세요.');
    else if (sex != '남자' && sex != '여자') messages.push('성별을 입력해주세요. 현재 성별 : ' + sex);
};

function parentValidation(parentName, parentTel, messages) {
    if (parentName === "") messages.push('부모님 성함을 입력해주세요.');
    // 한글도 정규식으로 거를 수 있나? :: 이름에 숫자가 들어가는걸 거를 수 있을까?
    if (parentTel === "") messages.push('보호자 전화번호를 입력해주세요.');
};

function telValidation(myTel, messages) {
    if (myTel === "") messages.push('전화번호를 입력해주세요.');
};

function schoolValidation(schoolName, schoolTel, messages) {
    if (schoolName === "") messages.push('학교를 선택해주세요.');
    if (schoolTel === "") messages.push('학교 전화번호를 입력해주세요.');
};

function birthdayValidation(birthday, messages) {
    if (birthday === null) messages.push('생년월일을 입력해주세요.');
};

function addressValidation(addressBase, addressDetail, messages) {
    if ((addressBase === "") || (addressDetail === "")) messages.push('주소 정보를 빠짐없이 입력해주세요.');
};

function postNumberValidation(postNumber, messages) {
    if (postNumber === "") messages.push('우편 번호를 입력해주세요.');
};

function introduceValidation(introduce, messages) {
    if (introduce.length === 0) messages.push('자기소개서를 입력해주세요.');
}

function studyPlanValidation(studyPlan, messages) {
    if (studyPlan.length === 0) messages.push('학업계획서를 입력해주세요.');
}

function volunteerValidation(volunteer, messages) {
    if (volunteer === null) messages.push('봉사 시간을 입력해주세요.');
}

function attendValidation(attend, messages) {
    if (attend.absence === null && attend.lateness === null &&
        attend.earlyLeave === null && attend.subjectEscape === null)
        messages.push('출석 정보를 입력해주세요.');

    else if (attend.absence === null || attend.lateness === null ||
        attend.earlyLeave === null || attend.subjectEscape === null)
        messages.push('출석 정보를 빠짐없이 입력해주세요.');
}

function scoreValidationForWill(score, messages) {
    let subjects = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어']
    let semester = score.semester;

    for (var i = 0; i < 5; i++) {
        if (semester[i][0].pass === true && semester[i][0].grade === null &&
            semester[i][1].pass === true && semester[i][1].grade === null &&
            semester[i][2].pass === true && semester[i][2].grade === null &&
            semester[i][3].pass === true && semester[i][3].grade === null &&
            semester[i][4].pass === true && semester[i][4].grade === null) {
            messages.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 성적을 입력해주세요.');
            continue;
        }
        for (var j = 0; j < 7; j++) {
            if (semester[i][j].pass === true) {

                if (semester[i][j].grade === null) {
                    messages.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 ' + subjects[j] + '성적을 입력해주세요.');
                }
            }
        }
    }
}

function scoreValidationForDone(score, messages) {
    let subjects = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어']
    let semester = score.semester;

    for (var i = 0; i < 6; i++) {
        if (semester[i][0].pass === true && semester[i][0].grade === null &&
            semester[i][1].pass === true && semester[i][1].grade === null &&
            semester[i][2].pass === true && semester[i][2].grade === null &&
            semester[i][3].pass === true && semester[i][3].grade === null &&
            semester[i][4].pass === true && semester[i][4].grade === null &&
            semester[i][5].pass === true && semester[i][5].grade === null) {
            messages.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 성적을 입력해주세요.');
            continue;
        }
        for (var j = 0; j < 7; j++) {
            if (semester[i][j].pass === true) {

                if (semester[i][j].grade === null) {
                    messages.push((Math.floor(i / 2) + 1) + '학년 ' + ((i % 2) + 1) + '학기 ' + subjects[j] + '성적을 입력해주세요.');
                }
            }
        }
    }
}

function scoreValidationForBlack(score, messages) {
    let subject = ['국어', '수학', '사회', '과학'];
    for (var i = 0; i < score.scores.length; i++) {
        if (score.scores[i] == null) {
            messages.push('검정고시 ' + subject[i] + ' 성적을 입력해주세요.');
        }
    }
    if (score.choose.subject === "") messages.push('검정고시 선택과목에 대한 점수를 입력해주세요.');
    else if (score.choose.subject !== "" && score.choose.score === null) {
        messages.push('선택과목 ' + score.choose.subject + ' 점수를 입력해주세요.');
    }
}

schema.static('createEmptyDocument', function (salt, owner) {
    let document = {
        "user": salt,
        "name": owner,
        "score": {
            "semester": [],
            "scores": [null, null, null, null],
            "choose": {
                "subject": "",
                "score": null
            },

        },
        "attend": {
            "absence": null,
            "lateness": null,
            "earlyLeave": null,
            "subjectEscape": null
        }

    };
    let inItem = {
        "pass": true,
        "grade": null
    }
    for (var i = 0; i < 6; i++) {
        let item = [];
        for (var j = 0; j < 7; j++) {
            item.push(inItem);
        }
        document.score.semester.push(item);
    }

    return document;
});
// function score
model = mongoose.model('applyData', schema);

module.exports = model;