let mongoose = require('mongoose');

let schema = mongoose.Schema({
    salt: { type: String, required: true, unique : true },
    profileImageSrc : {type : String, default : null},
    sex : { type : String, default : null },
    grade : { type : Number, default : null },
    class : { type : Number, default : null },
    protectorName : { type : String, default : null },
    protectorTel : { type : String, default : null },
    phoneNum : { type : String, default : null },
    schoolCode : { type : Number, default : null },
    schoolName : { type : String, default : null },
    schoolTel : { type : String, default : null },
    birth : { type : String, default : null },
    addressBase : { type : String, default : null },
    addressDetail : { type : String, default : null },
    postNumber : { type : String, default : null }
});

module.exports = schema;