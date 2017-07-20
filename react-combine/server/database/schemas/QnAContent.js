var mongoose = require("mongoose");

var schema = mongoose.Schema({
    index: Number,
    title: String,
    contents: String,
    date: {type: Date, default: Date.now},
    author: String
},{collection : 'QnAContent'});

module.exports = schema;