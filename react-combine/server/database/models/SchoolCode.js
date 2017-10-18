let mongoose = require('mongoose');

let School = mongoose.Schema({
    code : {type : Number , default : null },
    government : {type : String ,default :""},
    name : {type : String,default :""},
    simpleGovernment : {type:String , default: ""}
},{collection : 'SchoolCode'});


School.methods.isRegionMismatch = function (regionType) {
    if (regionType === 'HOME') return !this.government.includes('대전');
    if (regionType === 'AWAY') return this.government.includes('대전');
}
module.exports = mongoose.model('SchoolCode', School);
