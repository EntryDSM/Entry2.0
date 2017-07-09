let mongoose = require('mongoose');
let schema = require('../schemas/userInfo');
let fs = require('fs');
let url = require('../../config').getPageUrl('input1');
let rootPath = require('../../config').getRootPath();

function makeMessage(comment) {
    return "<a href='" + url + "'>" + comment + "</a>";
}

function profileImageSrcValidation(src, messages) {
    // 프로필 이미지 경로 값이 null일 때
    if (src == null) {
        messages.push(makeMessage('증명사진을 등록해주세요'));
        return;
    }

    // 프로필 이미지 경로로 파일을 불러들일 수 없을 때 (상대경로로는 불러들일 수 없음)
    try {
        let profile = fs.readFileSync(rootPath + '/profileImages/' + src);
    } catch (err) {
        messages.push(makeMessage('증명사진을 등록해주세요'));
    }

};

function gradeValidation(grade, messages) {

    // 학년 값이 null일 때
    if (grade == null) {
        messages.push("<a href = '" + url + "'>학년이 입력되지 않았습니다.</a>")
    }

    // 학년 값이 정수가 아닐 때
    else if (grade % 1 != 0) messages.push("<a href='" + url + "'>학년은 정수 1~3 중 하나여야 합니다. 현재 입력된 값 : " + grade + "</a>");

    // 학년 값이 1~3이 아닐 때 
    else if (3 < grade || grade < 0) {
        messages.push("<a href='" + url + "'>학년은 1~3 중 하나여야 합니다. 현재 입력된 값 : " + grade + "</a>");
    }

};

function classValidation(Class, messages) {
    if (Class == null) {
        messages.push("<a href='" + url + "'>반이 입력되지않았습니다.</a>");
    }


    // 반 값이 정수가 아닐 때 
    else if (Class % 1 != 0) {
        messages.push("<a href='" + url + "'>반이 잘못입력되었습니다. 현재 입력된 값 : " + Class + "</a>");
    }

};

function sexValidation(sex, messages) {
    if (sex == null) messages.push("<a href='" + url + "'>성별을 입력해주세요.</a>");
    else if (sex != '남자' && sex != '여자') messages.push("<a href='" + url + "'>성별을 입력해주세요. 현재 성별 : " + sex + "</a>");
};

function protectorValidation(protectorName, protectorTel, messages) {
    if (protectorName == null) messages.push("<a href='" + url + "'>부모님 성함을 입력해주세요.</a>");
    // 한글도 정규식으로 거를 수 있나? :: 이름에 숫자가 들어가는걸 거를 수 있을까?
    if (protectorTel == null) messages.push("<a href='" + url + "'>보호자 전화번호를 입력해주세요.</a>");
};

function phoneNumValidation(phoneNum, messages) {
    if (phoneNum == null) messages.push("<a href='" + url + "'>전화번호를 입력해주세요.</a>");
};

function schoolValidation(schoolName, schoolTel, messages) {
    if (schoolName == null) messages.push("<a href='" + url + "'>학교를 선택해주세요.</a>");
    if (schoolTel == null) messages.push("<a href='" + url + "'>학교 전화번호를 입력해주세요.</a>");
};

function birthValidation(birth, messages) {
    if (birth == null) messages.push("<a href='" + url + "'>생년월일을 입력해주세요.</a>");
};

function addressValidation(addressBase, addressDetail, messages) {
    if ((addressBase == null) || (addressDetail == null)) messages.push("<a href='" + url + "'>주소 정보를 빠짐없이 입력해주세요.</a>");
};

function postNumberValidation(postNumber, messages) {
    if (postNumber == null) messages.push("<a href='" + url + "'>우편 번호를 입력하세요.</a>");
};

schema.static('validation', function (key, callback) {
    let response = {
        messages: [],
        page: 'first'
    };

    this.findOne({
        "salt": key
    }, function (err, doc) {

        // 일치하는 계정을 찾는 과정에서 오류가 발생했을 때
        if (err) {
            callback(null);
            return;
        }

        let messages = response.messages;

        // 성공적으로 계정을 찾음
        if (doc != null) {
            profileImageSrcValidation(doc.profileImageSrc, messages);
            gradeValidation(doc.grade, messages);
            classValidation(doc.class, messages);
            sexValidation(doc.sex, messages);
            protectorValidation(doc.protectorName, doc.protectorTel, messages);
            phoneNumValidation(doc.phoneNum, messages);
            schoolValidation(doc.schoolName, doc.schoolTel, messages);
            birthValidation(doc.birth, messages);
            addressValidation(doc.addressBase, doc.addressDetail, messages);
            postNumberValidation(doc.postNumber, messages);
            callback(response);
        }

        // 일치하는 계정을 찾지못함
        else {
            callback(null);
        }
    });
});

let model = mongoose.model('userInfo', schema);
module.exports = model;