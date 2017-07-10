let mongoose = require('mongoose');

let schema = mongoose.Schema({
    salt: { type: String, required: true, unique : true },
    profileImageSrc : {type : String, default : ""},
    sex : { type : String, default : "" },
    grade : { type : Number, default : null },
    class : { type : Number, default : null },
    protectorName : { type : String, default : "" },
    protectorTel : { type : String, default : "" },
    phoneNum : { type : String, default : "" },
    schoolCode : { type : Number, default : null },
    schoolName : { type : String, default : "" },
    schoolTel : { type : String, default : "" },
    birth : { type : String, default : "" },
    addressBase : { type : String, default : "" },
    addressDetail : { type : String, default : "" },
    postNumber : { type : String, default : "" }
});

module.exports = schema;