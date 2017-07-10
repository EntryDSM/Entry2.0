let mongoose = require('mongoose');
let schema = require('../schemas/applydata');
let crypto = require('crypto');
let model = {};

schema.static('updatepersonal', function(id, newData, callback){
  var month = newData.month < 10 ? '0' + newData.month : newData.month;
  var date = newData.date < 10 ? '0' + newData.date : newData.date;
  var birth = newData.year + '-' + month + '-' + date;
  return this.updateOne(
    {user: id},
    {
      $set : {
        school_code: newData.school_code,
        school_name: newData.school_name,
        grade_number: newData.grade,
        class_number: newData.class,
        birthday: birth,
        sex: newData.sex,
        address_base: newData.address_base,
        address_detail: newData.address_detail,
        parent_name: newData.parent_name,
        parent_tel: newData.parent_tel,
        school_tel: newData.school_tel,
        my_tel: newData.my_tel,
        updatedate: new Date() // need to be updated
      }
    }, callback);
});

schema.static('updateimage', function(id, newPath, callback){
  return this.updateOne(
    {user: id},
    {
      $set : {member_image: newPath}
    }, callback);
});

model = mongoose.model('applydata', schema);

module.exports = model;
