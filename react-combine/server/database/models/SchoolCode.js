let mongoose = require('mongoose');

let School = mongoose.Schema({
    code : {type : Number , default : null },
    goverment : {type : String ,default :""},
    name : {type : String,default :""},
    fullGoverment : {type:String , default: ""}
},{collection : 'SchoolCode'});


School.methods.isRegionMismatch = function(regionType){
    console.log(regionType);
    console.log(this.goverment);
    console.log(this.goverment.includes("대전"));
    if(regionType === 'HOME') return !this.goverment.includes('대전');
    if(regionType === 'AWAY') return this.goverment.includes('대전');
}
module.exports = mongoose.model('SchoolCode', School);
