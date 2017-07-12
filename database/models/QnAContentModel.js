var mongoose = require("mongoose");
var schema = require("../schemas/QnAContent");

var model =  mongoose.model('QnAContent', schema);

module.exports = model;