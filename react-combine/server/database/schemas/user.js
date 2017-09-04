let mongoose = require('mongoose');

let schema = mongoose.Schema({
    number: Number,
    owner: String,
    email: String,
    salt: { type: String, required: true, unique:true},
    check: Boolean,
    hash_password: {type : String,unique : true},
    hash_email: {type : String,unique : true}
},{ collection : 'user'});

module.exports = schema;