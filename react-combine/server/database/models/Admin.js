let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mSchema = mongoose.Schema({
    id: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    admin: { type: Boolean, default: false }
}, { collection: 'Admin' });

module.exports = mongoose.model('Admin', mSchema);