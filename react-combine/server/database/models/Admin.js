let mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

let Admin = mongoose.Schema({
    id: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    isSuper: { type: Boolean, default: false }
}, { collection: 'Admin' });


Admin.statics.findOneById = function (id) {
    const secret = process.env.ENTRYDSM_SECRET;
    const cipher = crypto.createCipher('aes192', secret);
    let encryptedId = cipher.update(id, 'utf8', 'hex');
    encryptedId += cipher.final('hex');
    console.log(encryptedId);
    return this.findOne({ "id": encryptedId }).exec();
}

Admin.methods.verify = function (password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    return this.password === encryptedPassword;
}

module.exports = mongoose.model('Admin', Admin);