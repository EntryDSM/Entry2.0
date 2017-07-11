let mongoose = require('mongoose');
let schema = require('../schemas/school');

schema.static('findgovernment',function(office,callback){
    return this.find({"government":office},callback);
});


let model = mongoose.model('schoolCodes', schema);
module.exports = model;
