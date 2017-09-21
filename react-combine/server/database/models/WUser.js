let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const UUID = require('uuid/v4');

let WUser = Schema({
    name: { type : String, required: true },
    email: { type : String, required: true },
    password: { type : String, required: true },
    verifyCode: { type : String, required : true }
},{ collection : 'WUser'});

WUser.statics.create = function (name, email, password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    const cipher = crypto.createCipher('aes192', secret);
    let encryptedEmail = cipher.update(email, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');
    let wUser = new this({
        name,
        "email": encryptedEmail,
        "password": encryptedPassword,
        verifyCode: UUID().slice(0, 6).toUpperCase()
    });
    console.log(wUser);
    return wUser.save();

}

WUser.methods.getDecryptedEmail = function () {
    const secret = process.env.ENTRYDSM_SECRET;
    const decipher = crypto.createDecipher('aes192', secret)
    let decrypted = decipher.update(this.email, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

WUser.statics.findOneByEmailAndRemove = function (email) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedEmail = crypto.createCipher('aes192', secret)
        .update(email, 'utf8', 'hex');
    return this.findOneAndRemove({ "email": encryptedEmail });
}
module.exports = mongoose.model('WUser', WUser);