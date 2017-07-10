var fs = require('fs');
var rootPath = require('../../config').getRootPath();

exports.save = (req, res) => {
  var updatedData = req.body;
  var userkey = req.params.userid;
  var Docs = req.app.get('database');

  // update image.
  var imagePath = '', targetPath = '';
  if(req.files.member_image){
    image = req.files.member_image;
    targetPath = "\\images\\" + userkey + image.name.substring(image.name.lastIndexOf('.'));

    req.body.member_image = targetPath;

    if(Docs.connection){
      saveImage(Docs, userkey, image, targetPath, (err, result) => {
        if(err){
          console.error(err);
          console.log('Image 저장 실패 [' + userkey + ']');
        }else{
          if(result){
            console.log('Image 저장 성공 [' + userkey + ']');
          }else{
            console.log('Image 저장 실패 [' + userkey + ']');
          }
        }
      });
    }
  }

  // update applydata.
  if(Docs.connection){
    updatepersonal(Docs, userkey, updatedData, (err, docs) => {
      if(err){
        console.error(err.stack);
        res.status(500).json({error: 'database personal data update failure'});
      }else{
        res.send('<script>alert("수정이 완료되었습니다.");</script>');
      }
    });
  }
}

exports.load = (req, res) => {
  var userkey = req.params.userid;
  var Docs = req.app.get('database');

  if(Docs.connection){
    loadpersonal(Docs, userkey, function(err, docs){
      if(err){
        console.error(err.stack);
        res.status(500).json({error: 'database personal data select failure'});
      }else{
        res.render('view2',
         {
           data: docs,
           key: userkey
         });
      }
    })
  }
}

var updatepersonal = (database, docId, data, callback) => {
  database.applydataModel.updatepersonal(docId, data, (err, results) => {
    if(err){
      callback(err, null);
    }
    else{
      console.log('인적사항 데이터 업데이트 완료');
      callback(null, results);
    }
  });
}

var loadpersonal = (database, key, callback) => {
  database.applydataModel.findOne({user: key}, (err, docs) => {
    if(err){
      callback(err, null);
    }else{
      console.log('인적사항 데이터 불러오기 완료');
      callback(null, docs);
    }
  });
}

function saveImage(database, id, src, dst, callback){
  database.applydataModel.updateimage(id, dst, (err, docs) => {
    if(err){
      callback(err, null);
    }else{
      if(saveImageData(src, dst)){
        callback(null, true);
      }else{
        callback(null, false);
      }
    }
  });
}

function saveImageData(src, dst){
  if(src != null && src != ''){
    src.mv(rootPath + dst, (err) => {
      if(err){
        console.error(err);
        return false;
      }else{
        return true;
      }
    })
  }else{
    return false;
  }
}