let mongoose = require('mongoose');

let schema = mongoose.Schema({
    salt: { type: String, required: true, unique : true },
    self: { type: String, default : ""},
    plan: { type: String, default : ""}
});

module.exports = schema;