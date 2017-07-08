let mongoose = require('mongoose');
let schema = require('../schemas/userInfo');
let url = require('../../config').getPageUrl('input3');

function makeMessage(comment) {
    return "<a href='" + url + "'>" + comment + "</a>";
}

function selfValidation(self, messages){
    if(self == null) messages.push(makeMessage('자기소개서를 입력해주세요.'));
}

function planValidation(plan, messages){
    if(plan == null) messages.push(makeMessage('학업계획서를 입력해주세요.'));
}

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
            selfValidation(doc.self, messages);
            planValidation(doc.self, messages);
            callback(response);
        }
        // else 일치하는 계정이 없을 때 (발생 할까?)
    });
});

let model = mongoose.model('userIntroduce', schema);

module.exports = model;