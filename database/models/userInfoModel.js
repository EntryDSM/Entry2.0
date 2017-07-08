let mongoose = require('mongoose');
let schema = require('../schemas/userInfo');
let fs = require('fs');
let url = require('../../config').getPageUrl('input1');

function makeMessage(comment) {
    return "<a href='" + url + "'>" + comment + "</a>";
}

function profileImageSrcValidation(src, messages) {
    console.log("=====profileImageSrcValidation=====");
    console.log('../../profileImages' + src);

    // 프로필 이미지 경로 값이 null일 때
    if (src == null) {
        messages.push(makeMessage('증명사진을 등록해주세요'));
        return;
    }

    // 프로필 이미지 경로로 파일을 불러들일 수 없을 때 (현재 항상 불러들일 수 없는 이슈 발생함)
    try {
        let profile = fs.readFileSync('../../profileImages/' + src);
    } catch (err) {
        console.log(err);
        messages.push(makeMessage('증명사진을 등록해주세요'));
    }

};

function gradeValidation(grade, messages) {
    console.log("=====gradeValidation=====");
    console.log(grade);

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
    console.log('=====sexValidation=====');
    if (sex == null) messages.push("<a href='" + url + "'>성별을 입력해주세요.</a>");
    else if (sex != '남자' && sex != '여자') messages.push("<a href='" + url + "'>성별을 입력해주세요. 현재 성별 : " + sex + "</a>");
};

function protectorNameValidation(protectorName, messages) {
    if (protectorName == null) messages.push("<a href='" + url + "'>부모님 성함을 입력해주세요.</a>");
    // 한글도 정규식으로 거를 수 있나? :: 이름에 숫자가 들어가는걸 거를 수 있을까?
};

function protectorTelValidation(protectorTel, messages) {
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
        if (err) {
            throw err;
        }

        let messages = response.messages;

        if (doc != null) {
            console.log(doc.profileImageSrc)
            console.log(doc);
            profileImageSrcValidation(doc.profileImageSrc, messages);
            gradeValidation(doc.grade, messages);
            classValidation(doc.class, messages);
            protectorNameValidation(doc.protectorName, messages);
            protectorTelValidation(doc.protectorTel, messages)
            schoolValidation(doc.schoolName, doc.schoolTel, messages);
            birthValidation(doc.birth, messages);
            addressValidation(doc.addressBase, doc.addressDetail, messages);
            postNumberValidation(doc.postNumber, messages);
            callback(response);
        }
        // else 일치하는 계정이 없을 때 (발생 할까?)
    });
});

let model = mongoose.model('userInfo', schema);
module.exports = model;