let mongoose = require('mongoose');

let schema = mongoose.Schema({
    code : {type : Number , default : null },
    government : {type : String ,default :""},
    name : {type : String,default :""},
    fullGoverment : {type:String , default: ""}
},{collection : 'schoolCode'});


module.exports = schema
