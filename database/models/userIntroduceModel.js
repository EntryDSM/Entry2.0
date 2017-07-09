let mongoose = require('mongoose');
let schema = require('../schemas/userIntroduce');
let url = require('../../config').getPageUrl('input3');

function makeMessage(comment) {
    return "<a href='" + url + "'>" + comment + "</a>";
}

function selfValidation(self, messages) {
    if (self == null) messages.push(makeMessage('자기소개서를 입력해주세요.'));
}

function planValidation(plan, messages) {
    if (plan == null) messages.push(makeMessage('학업계획서를 입력해주세요.'));
}

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
            console.log(doc.profileImageSrc)
            console.log(doc);
            selfValidation(doc.self, messages);
            planValidation(doc.self, messages);
            callback(response);
        }

        // 일치하는 계정을 찾지못함
        else {
            callback(null);
        }
    });
});

let model = mongoose.model('userIntroduce', schema);

module.exports = model;