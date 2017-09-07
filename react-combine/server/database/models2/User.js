let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

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
    
    const cipher = crypto.createCipher('aes192', secret);
    let encryptedEmail = cipher.update(email, 'utf8', 'hex');
    encryptedEmail += cipher.final('hex');

    return this.findOne({ "email": encryptedEmail }).exec();
}

User.methods.verify = function (password) {
    const secret = process.env.ENTRYDSM_SECRET;
    const encryptedPassword = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    return this.password === encryptedPassword;
}

User.methods.generateVerifyCode = function(){
    this.verifyCode = generateVerifyCode()
    return this.save();
}

function generateVerifyCode() {
    return new Promise((resolve, reject) => {
        while (true) {
            let verifyCode = UUID().slice(0, 6);
            User.findOne({ verifyCode })
                .then((wUser) => {
                    if (!wUser) resolve(verifyCode);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });
}

module.exports = mongoose.model('User', User);