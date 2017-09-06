var fs = require('fs');
var rootPath = require('../../config').getRootPath();

// save(update) type of applicant.(input1)
exports.saveType = (req, res) => {
  if (!req.session.key) {
    return res.sendStatus(401);
  }
  let updatedData = {
    "applyBaseType": req.body.type,
    "regionType": req.body.local,
    "applyDetailType": req.body.note,
    "graduateType": req.body.graduation
  }
  let userkey = req.session.key;
  console.log(updatedData);
  let Docs = req.app.get('database');

  if (Docs.connection) {
    saveApplyType(Docs, userkey, updatedData, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log('전형 수정 완료');
        res.sendStatus(200);
      }
    });
  }
}

// load(select) type of applicant.(input1)
exports.loadType = (req, res) => {
  console.log(req.session.key);
  if (!req.session.key) {
    res.sendStatus(401);
  }
  let userKey = req.session.key;
  let Docs = req.app.get('database');

  if (Docs.connection) {
    Docs.applyDataModel.selectApplyType(userKey)
      .then((applyType) => {
        res.status(200).json(applyType);
      });
  } else {
    res.status(500).end();
  }
}

var saveApplyType = (database, userkey, data, callback) => {
  console.log(userkey);
  database.applyDataModel.updateApplyType(userkey, data, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
}

// save(update) applydata.(input2)
exports.save = (req, res) => {
  let updatedData = req.body;
  let userkey = req.params.userid;
  let Docs = req.app.get('database');

  // update image.
  var imagePath = '',
    targetPath = '';
  if (req.files.memberImage != undefined) {
    image = req.files.memberImage;
    targetPath = "\\images\\" + userkey + '.jpg';

    req.body.memberImage = targetPath;

    if (Docs.connection) {
      saveImage(Docs, userkey, image, targetPath, (err, result) => {
        if (err) {
          console.error(err);
          console.log('Image 저장 실패 [' + userkey + ']');
        } else {
          if (result) {
            console.log('Image 저장 성공 [' + userkey + ']');
          } else {
            console.log('Image 저장 실패 [' + userkey + ']');
          }
        }
      });
    }
  }

  // update applydata.
  if (Docs.connection) {
    updatepersonal(Docs, userkey, updatedData, (err, docs) => {
      if (err) {
        console.error(err.stack);
        res.status(500).json({
          error: 'database personal data update failure'
        });
      } else {
        res.send('<script>alert("수정이 완료되었습니다.");</script>');
      }
    });
  }
}

exports.load = (req, res) => {
  if (!req.session.key) {
    return res.sendStatus(401);
  }
  var userkey = req.session.key;
  var Docs = req.app.get('database');

  if (Docs.connection) {
    loadpersonal(Docs, userkey, function (err, docs) {
      if (err) {
        console.error(err.stack);
        res.status(500).json({
          error: 'database personal data select failure'
        });
      } else {
        console.log(docs);
        res.render('view2', {
          data: docs,
          key: userkey
        });
      }
    })
  }
}

var updatepersonal = (database, docId, data, callback) => {
  database.applyDataModel.updatepersonal(docId, data, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('인적사항 데이터 업데이트 완료');
      callback(null, results);
    }
  });
}

var loadpersonal = (database, key, callback) => {
  database.applyDataModel.findOne({
    user: key
  }, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('인적사항 데이터 불러오기 완료');
      callback(null, docs);
    }
  });
}

var saveImage = (database, id, src, dst, callback) => {
  database.applyDataModel.updateimage(id, dst, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      if (saveImageData(src, dst)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });
}

var saveImageData = (src, dst) => {
  if (src != null && src != '') {
    fs.unlinkSync(rootPath + dst);
    src.mv(rootPath + dst, (err) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        return true;
      }
    })
  } else {
    return false;
  }
}

exports.validation = (req, res) => {
  if (!req.session.key) {
    res.writeHead(401, {
      'Content-Type': 'text/html;charset=utf8'
    });
    res.write("<script>alert('권한이 없습니다. 로그인해주세요');</script>");
    res.write("<script>location.href='/public/login.html';</script>");
    res.end();
    return;
  }

  let database = req.app.get('database');

  // database connection is exist
  if (database.connection) {

    // validation
    database.applyDataModel.validation(req.session.key, function (response) {
      if (response === 400) {
        res.writeHead(400, {
          'Content-Type': 'text/plain;charset=utf8'
        });
        res.write('일치하는 사용자 찾을 수 없음');
        res.end();
      } else if (response === 412) {
        res.writeHead(412, {
          'Content-Type': 'text/plain;charset=utf8'
        });
        res.write('전형 유형을 선택하지 않음');
        res.end();
      } else if (response) {
        res.writeHead(200, {
          'Content-Type': 'application/json;charset=utf8'
        });
        res.write(JSON.stringify(response));
        res.end();
      }

    });
  }

  // database connection is not exist
  else {
    res.writeHead(500);
    res.end();
  }
}

//미리보기 양식 데이터 전송

exports.demo = (req, res) => {
  let infoArr = {};
  let principalArr = {};
  let somkeArr = {};
  let introArr = {};
  let planArr = {};
  let tab = req.query.tab || req.params.tab;

  console.log('미리보기 실행');
  try {
    if (req.session.key) {

      let id = req.session.key;
      let database = req.app.get('database');

      database.applyDataModel.findUserInfo(id, (err, check) => {

        console.log('session key ' + id)

        if (check) {

          let imageBuffer = fs.readFileSync(rootPath + '/profileImages/' + check[0]._doc.memberImage);
          check["image"] = imageBuffer;

          if (tab === "userInfo") {

            console.log('userInfo Start');
            let fullAddress = check[0]._doc.addressBase + " " + check[0]._doc.addressDetail;

            console.log('총 주소 : ' + fullAddress);
            let school = check[0]._doc.schoolName.split('중학교');


            infoArr["memberImage"] = check[0]._doc.memberImage //이미지경로
            infoArr["sex"] = check[0]._doc.sex //성별
            infoArr["class"] = check[0]._doc.class //반
            infoArr["parentName"] = check[0]._doc.parentName //부모님이름
            infoArr["schoolCode"] = check[0]._doc.schoolCode //학교코드
            infoArr["schoolName"] = school[0] //학교이름
            infoArr["schoolTel"] = check[0]._doc.schoolTel //학교번호
            infoArr["phoneNum"] = check[0]._doc.myTel //내번호
            infoArr["parentTel"] = check[0]._doc.parentTel //부모님번호
            infoArr["birth"] = check[0]._doc.birthday //생일
            infoArr["address"] = fullAddress //주소
            infoArr["registration"] = check[0]._doc.submitNumber //접수번호
            infoArr["examine"] = check[0]._doc.examNumber //수험번호
            infoArr["name"] = check[0]._doc.name //이름
            infoArr["applyBaseType"] = check[0]._doc.applyBaseType //전형구분
            infoArr["applyDetailType"] = check[0]._doc.applyDetailType //전형 자세히 구분
            infoArr["applyNoteType"] = check[0]._doc.applyNoteType //전형 비고(특례입학, 유공자 자녀 등)
            infoArr["regionType"] = check[0]._doc.regionType // 지역구분
            // 성적은 영훈이형 계산처리하고 넣을게요
            // infoArr["score"] = check[0]._doc.score //이름
            // 현재 출석 칼럼이 존재하지않음
            infoArr["volunteer"] = check[0]._doc.volunteer //봉사시간
            infoArr["attendance"] = check[0]._doc.attendance //출석
            infoArr["graduateType"] = check[0]._doc.grade //졸업구분

            res.writeHead(200, {
              'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(infoArr));



          } else if (tab === "introduce") {
            console.log('introduce Strat ')
            introArr["introduce"] = check[0]._doc.introduce;
            res.writeHead(200, {
              'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(introArr));



          } else if (tab === "studyPlan") {

            console.log('studyPlan Strat ')
            planArr = check[0]._doc.studyPlan
            res.writeHead(200, {
              'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(planArr));



          } else if (tab === "principal") {

            console.log('principal Strat ')

            let school = check[0]._doc.schoolName.split('중학교');
            console.log(school[0]);


            principalArr["name"] = check[0]._doc.name
            principalArr["class"] = check[0]._doc.class
            principalArr["schoolName"] = school[0]


            res.writeHead(200, {
              'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(principalArr));

          } else if (tab === "noSmoke") {

            console.log('noSmoke Strat ')

            let fullAddress = check[0]._doc.addressBase + " " + check[0]._doc.addressDetail;

            console.log('총 주소 : ' + fullAddress);

            somkeArr["name"] = check[0]._doc.name
            somkeArr["examNumber"] = check[0]._doc.examNumber
            somkeArr["myTel"] = check[0]._doc.myTel
            somkeArr["schoolName"] = check[0]._doc.schoolName
            somkeArr["fullAddress"] = fullAddress

            res.writeHead(200, {
              'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(somkeArr));
          }

        }
      });
    }
  } catch (err) {
    console.log(err)
    res.writeHead(400);
    res.end();
  }
}

exports.getdemo = (req, res) => {
  let getDemo = {};
  console.log('자소서 , 학업계획서 조회 ');
  let userId = req.session.key;
  console.log(userId + '로 조회 합니다');
  let database = req.app.get('database');
  database.applyDataModel.findUserInfo(userId, function (err, data) {
    console.log(data + '찾은 데이터');

    if (err) {
      console.log(err);
      res.writeHead(400);
      res.end();
    }
    if (data) {
      getDemo['self'] = data[0]._doc.self;
      getDemo['plan'] = data[0]._doc.plan;

      console.log(getDemo + '조회 완료');

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.end(JSON.stringify(getDemo));

    }

  })
}


exports.intro = (req, res) => {

  console.log('자소서,학업계획서 저장 함수 실행');
  let database = req.app.get('database');
  let self = req.body.self; //자기소개서
  let plan = req.body.plan; //학업계획서

  try {
    if (req.session.key) {

      console.log(self + ',' + plan + '로 업데이트');

      let userId = req.session.key;

      console.log(userId + '로 접속');

      database.applyDataModel.findUserInfo(userId, function (err, user) {

        if (err) {
          console.log(err);
          res.writeHead(400);
          res.end();
        }

        if (user) {
          database.applyDataModel.update({
              "user": req.session.key
            },

            {
              "$set": {
                "introduce": self,
                "studyPlan": plan
              }
            },

            {
              multi: true
            }, (err, output) => {

              if (err) {
                console.log(err);
                res.writeHead(400);
                res.end();
                return;
              }

              if (output) {
                res.writeHead(200);
                console.log('데이터 업데이트 성공')
                res.end();
              }
            });

        } else {
          res.writeHead(400);
          //res.send('학업계획서, 자기소개서 저장 실패');
          res.end();
        }

      })
    }

  } catch (err) {
    console.log(err)
    res.writeHead(400);
    res.end();
  }
}