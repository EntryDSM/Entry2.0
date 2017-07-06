var crypto = require('crypto');
var Schema = {};
Schema.createSchema = function (mongoose) {

  var DocsSchema = mongoose.Schema({
    number: Number,
    owner: String,
    email: String,
    salt: {
      type: String,
      required: true,
      unique:true
    },
    check: Boolean,
    hash_password: {type : String,unique : true},
    hash_email: {type : String,unique : true}
  });
  DocsSchema.virtual('password').set(function (password) {
    console.log('virtual password');
    this._password = password;
    this.hash_password = this.enpassword(password);
  }).get(function () {
    return this._password;
  });

  DocsSchema.method('enpassword', function (text, inSalt) {
    if (inSalt) {
      return crypto.createHmac('sha1', inSalt).update(text).digest('hex');
    } else {
      return crypto.createHmac('sha1', this.salt).update(text).digest('hex');
    }
  });

  DocsSchema.static('findByUser', function (name,callback){
  return this.find({
      owner : name
    }, callback);
  });
  DocsSchema.method('makesalt', function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  });

DocsSchema.method('authenticate', function (text, inSalt, hash_password) {
    if (inSalt) {
      return this.enpassword(text, inSalt) === hash_password;
    } else {
      return this.enpassword(text) === this.hash_password;
    }
  });
DocsSchema.static('authEnemail', function (unemail, Email,Salt, callback) {
    callback(this.unemailmethod(Email,Salt) === unemail);
  });

DocsSchema.static('findunemail', function (hash_email, callback) {
    return this.find({
      hash_email: hash_email
    }, callback);
  });

DocsSchema.virtual('unemail').set(function (unemail) {
    console.log('virtual unemail');
    this._unemail = unemail;
       this.salt = this.makesalt();
       console.log('salt make');
    this.hash_email = this.unemailmethod(unemail);
  }).get(function () {
    return this._unemail;
  });
  
DocsSchema.method('unemailmethod', function (unemail) {
    return crypto.createHmac('sha1', this.salt).update(unemail).digest('hex');
  });

DocsSchema.static('unemailmethod', function (Email,Salt) {
    return crypto.createHmac('sha1', Salt).update(Email).digest('hex');
  });
DocsSchema.static('findByEmail', function (email, callback) {
    return this.find({
      email: email
    }, callback);
  });

DocsSchema.method('findEmail', function (email, callback) {
    return this.find({
      email: email
    }, callback);
  });

DocsSchema.static('findSalt', function (salt, callback) {
    return this.find({
      salt: salt
    }, callback);
  });

  var ApplySchema = new mongoose.Schema({
    submit_number: Number,
    exam_number: Number,
    school_code: Number,
    school_name: String,
    hometeacher: String,
    name: String,
    birthday: Date,
    sex: String,
    post_number: String,
    base_address: String,
    detail_address: String,
    parent_name: String,
    parent_tel: String,
    school_tel: String,
    my_tel: String,
    graduate_type: String,
    graduate_year: String,
    region_type: String,
    apply_type: Number,
    score: Number,
    score_sum: Number,
    final_sum: Number,
    bohoon_num: String,
    member_image: String,
    introduce: String,
    studyplan: String,
    grade_number: Number,
    class_number: Number,
    graduate_score: String,
    apply_status: Number,
    pay_status: Number,
    document_status: Number,
    insertdate: Date,
    updatedate: Date
  });

  var SchoolSchema = new mongoose.Schema({
    code: Number,
    fullname: String,
    name: String
  });

  return DocsSchema;
};


module.exports = Schema;