let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const UUID = require('uuid/v4')

let User = Schema({
    name: { type : String, required: true },
    email: { type : String, required: true, unique : true },
    password: { type : String, required: true },
    applyData: { type : Schema.Types.ObjectId, ref: 'ApplyData' },
    entryDate: { type : String, required : true },
    verifyCode: { type : String }
},{ collection : 'User'});

User.statics.create = function (name, email, password) {

    const date = new Date();
    const entryDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const User = new this({
        name,
        email,
        password,
        entryDate
    });
    return User.save();
}

User.methods.getDecryptedEmail = function () {
    const secret = process.env.ENTRYDSM_SECRET;
    const decipher = crypto.createDecipher('aes192', secret)
    let decrypted = decipher.update(this.email, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

User.statics.findOneByEmail = function (email) {
    const secret = process.env.ENTRYDSM_SECRET;
    console.log(email);
    const cipher = crypto.createCipher('aes192', secret);
    let encryptedEmail = cipher.update(email, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');
    console.log(encryptedEmail);
    return this.findOne({ "email": encryptedEmail }).exec();
}

User.methods.verify = function (password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    return this.password === encryptedPassword;
}

User.methods.generateVerifyCode = function () {
    this.verifyCode = UUID().slice(0, 6).toUpperCase();
    return this.save();
}

User.methods.changePassword = function (password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    this.password = encryptedPassword;
    console.log(this);
    return this.save();
}

User.statics.findOneForChangePassword = function (verifyCode, name, email) {
    const secret = process.env.ENTRYDSM_SECRET;
    const cipher = crypto.createCipher('aes192', secret);
    let encryptedEmail = cipher.update(email, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');

    return this.findOne({ verifyCode, "email": encryptedEmail, name })
}

module.exports = mongoose.model('User', User);