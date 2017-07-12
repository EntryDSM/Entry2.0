let mongoose = require('mongoose');
let schema = require('../schemas/school');

schema.static('findgovernment',function(office,callback){
    return this.find({"government":office},callback);
});

schema.static('findMidleSchool',function(sname,callback){
    return this.find({"name":sname},callback);
})


let model = mongoose.model('schoolCode', schema);
module.exports = model;
