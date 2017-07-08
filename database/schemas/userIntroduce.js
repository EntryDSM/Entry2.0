let mongoose = require('mongoose');

let schema = mongoose.Schema({
    salt: { type: String, required: true, unique : true },
    self: { type: String, default : null},
    plan: { type: String, default : null}
});

module.exports = schema;