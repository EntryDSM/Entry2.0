let mongoose = require('mongoose');

let School = mongoose.Schema({
    code : {type : Number , default : null },
    goverment : {type : String ,default :""},
    name : {type : String,default :""},
    fullGoverment : {type:String , default: ""}
},{collection : 'SchoolCode'});

module.exports = mongoose.model('SchoolCode', School);
