let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let WUser = Schema({
    name: { type : String, required: true },
    email: { type : String, required: true, unique : true },
    password: { type : String, required: true },
    applyData: { type : Schema.Types.ObjectId, ref: 'ApplyData', unique : true }
},{ collection : 'WUser'});

WUser.statics.create = function (name, email, password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    const encryptedEmail = crypto.createCipher('aes192', secret)
        .update(email)
        .digest('base64');

    const wUser = new this({
        name,
        "email": encryptedEmail,
        "password": encryptedPassword
    });
    return wUser.save();
}

WUser.methods.getDecryptedEmail = function () {
    const secret = process.env.ENTRYDSM_SECRET;
    const decrypted = crypto.createDecipher('aes192', secret)
        .update(this.email)
        .digest('base64');
    return decrypted;
}

module.exports = mongoose.model('WUser', WUser);