let mongoose = require('mongoose');

let School = mongoose.Schema({
    code : {type : Number , default : null },
    government : {type : String ,default :""},
    name : {type : String,default :""},
    fullGoverment : {type:String , default: ""}
},{collection : 'School'});

module.exports = mongoose.model('School', School);
