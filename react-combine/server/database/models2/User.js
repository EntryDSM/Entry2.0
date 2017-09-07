let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let User = Schema({
    name: { type : String, required: true },
    email: { type : String, required: true, unique : true },
    password: { type : String, required: true },
    applyData: { type : Schema.Types.ObjectId, ref: 'ApplyData', unique : true }
},{ collection : 'User'});

User.statics.create = function (name, email, password) {
    const User = new this({
        name,
        email,
        password
    });
    return User.save();
}

User.methods.getDecryptedEmail = function () {
    const secret = process.env.ENTRYDSM_SECRET;
    const decrypted = crypto.createDecipher('aes192', secret)
        .update(this.email)
        .digest('base64');
    return decrypted;
}

User.methods.verify = function(password){
    const encryptedPassword = crypto.createHmac('sha1', secret)
    .update(password)
    .digest('base64');
    return this.password === encryptedPassword;
}
module.exports = mongoose.model('User', User);