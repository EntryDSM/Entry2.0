let mongoose = require('mongoose');
let schema = require('../schemas/user');
let model = {};
schema.virtual('password').set(function (password) {
    console.log('virtual password');
    this._password = password;
    this.hash_password = this.enpassword(password);
}).get(function () {
    return this._password;
});

schema.method('enpassword', function (text, inSalt) {
    if (inSalt) {
        return crypto.createHmac('sha1', inSalt).update(text).digest('hex');
    } else {
        return crypto.createHmac('sha1', this.salt).update(text).digest('hex');
    }
});

schema.static('findByUser', function (name, callback) {
    return this.find({
        owner: name
    }, callback);
});

schema.method('makesalt', function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

schema.method('authenticate', function (text, inSalt, hash_password) {
    if (inSalt) {
        return this.enpassword(text, inSalt) === hash_password;
    } else {
        return this.enpassword(text) === this.hash_password;
    }
});
schema.static('authEnemail', function (unemail, Email, Salt, callback) {
    callback(this.unemailmethod(Email, Salt) === unemail);
});

schema.static('findunemail', function (hash_email, callback) {
    return this.find({
        hash_email: hash_email
    }, callback);
});

schema.virtual('unemail').set(function (unemail) {
    console.log('virtual unemail');
    this._unemail = unemail;
    this.salt = this.makesalt();
    console.log('salt make');
    this.hash_email = this.unemailmethod(unemail);
}).get(function () {
    return this._unemail;
});

schema.method('unemailmethod', function (unemail) {
    return crypto.createHmac('sha1', this.salt).update(unemail).digest('hex');
});

schema.static('unemailmethod', function (Email, Salt) {
    return crypto.createHmac('sha1', Salt).update(Email).digest('hex');
});
schema.static('findByEmail', function (email, callback) {
    return this.find({
        email: email
    }, callback);
});

schema.method('findEmail', function (email, callback) {
    return this.find({
        email: email
    }, callback);
});

schema.static('findSalt', function (salt, callback) {
    return this.find({
        salt: salt
    }, callback);
});

model = mongoose.model('user', schema);

module.exports = model;