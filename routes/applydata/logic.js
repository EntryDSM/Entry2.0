var fs = require('fs');
var rootPath = require('../../config').getRootPath();

exports.save = (req, res) => {
  var updatedData = req.body;
  var userkey = req.params.userid;
  var Docs = req.app.get('database');

  // update image.
  var imagePath = '',
    targetPath = '';
  if (req.files.member_image) {
    image = req.files.member_image;
    targetPath = "\\images\\" + userkey + image.name.substring(image.name.lastIndexOf('.'));

    req.body.member_image = targetPath;

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
  var userkey = req.params.userid;
  var Docs = req.app.get('database');

  if (Docs.connection) {
    loadpersonal(Docs, userkey, function (err, docs) {
      if (err) {
        console.error(err.stack);
        res.status(500).json({
          error: 'database personal data select failure'
        });
      } else {
        res.render('view2', {
          data: docs,
          key: userkey
        });
      }
    })
  }
}

var updatepersonal = (database, docId, data, callback) => {
  database.applydataModel.updatepersonal(docId, data, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('인적사항 데이터 업데이트 완료');
      callback(null, results);
    }
  });
}

var loadpersonal = (database, key, callback) => {
  database.applydataModel.findOne({
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

function saveImage(database, id, src, dst, callback) {
  database.applydataModel.updateimage(id, dst, (err, docs) => {
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

function saveImageData(src, dst) {
  if (src != null && src != '') {
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
  let Infoarr={};
  let Principalarr={};
  let Somkearr={};
  let tab = req.query.tab || req.params.tab;
  console.log(tab)
  console.log('실행');
  if (req.session.key) {

    let id = req.session.key;
    let database = req.app.get('database');

    database.applyDataModel.findUserInfo(id, (err, check) => {

        console.log('session key ' + id)

        if (check) {

          let ImageBuffer = fs.readFileSync(rootPath + '/profileImages/' + check[0]._doc.memberImage);
          check["Image"] = ImageBuffer;
          
          if (tab === "userInfo") {
          console.log('실행');
          let Fulladdress = check[0]._doc.addressBase + check[0]._doc.addressDetail;
          let school = check[0]._doc.schoolName.split('중학교');
          console.log(school);
          
           Infoarr["memberImage"] =  check[0]._doc.memberImage //이미지경로
           Infoarr["sex"] =  check[0]._doc.sex  //성별
           Infoarr["grade"] = check[0]._doc.grade  //학년
           Infoarr["class"] = check[0]._doc.class //반
           Infoarr["parentName"] = check[0]._doc.parentName //부모님이름 
           Infoarr["schoolCode"] = check[0]._doc.schoolCode //학교코드
           Infoarr["schoolName"] = school //학교이름
           Infoarr["schoolTel"] = check[0]._doc.schoolTel //학교번호
           Infoarr["myTel"] = check[0]._doc.myTel //내번호
           Infoarr["parentTel"] = check[0]._doc.parentTel //부모님번호 
           Infoarr["birthday"] = check[0]._doc.birthday //생일
           Infoarr["Fulladdress"] = Fulladdress //주소
           Infoarr["submitNumber"] = check[0]._doc.submitNumber //접수번호
           Infoarr["examNumber"] = check[0]._doc.examNumber //수험번호
           Infoarr["name"] = check[0]._doc.name //이름
           Infoarr["applyBaseType"] = check[0]._doc.applyBaseType //전형구분

          // 성적은 영훈이형 계산처리하고 넣을게요
          // Infoarr["score"] = check[0]._doc.score //이름
          // 현재 출석 칼럼이 존재하지않음
          Infoarr["volunteer"] = check[0]._doc.volunteer //봉사시간

          
        console.log(Infoarr + '이 출력됨 ');

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(Infoarr));

      } else if (tab === "introduce") {

        console.log('1번 ')
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(check[0]._doc.introduce));

      } else if (tab === "studyPlan") {
        console.log('3번 ')
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(check[0]._doc.studyPlan));

      } else if (tab === "principal") {
        let school = check[0]._doc.schoolName.split('중학교');
          console.log(school);

        Principalarr["name"] = check[0]._doc.name
        Principalarr["class"] =check[0]._doc.class
        Principalarr["schoolName"] =check[0]._doc.school

        console.log('4번 ' + Principalarr)

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(Principalarr));

      } else if (tab === "noSmoke") {
        let Fulladdress = check[0]._doc.addressBase + check[0]._doc.addressDetail;

        Somkearr["name"] = check[0]._doc.name
        Somkearr["examNumber"] = check[0]._doc.examNumber
        Somkearr["myTel"] = check[0]._doc.myTel
        Somkearr["schoolName"] = check[0]._doc.schoolName
        Somkearr["Fulladdress"] = Fulladdress

        console.log('5번 ' + Somkearr)

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(Somkearr));
      }
    }
    else {
      res.send('<script>alert("미리보기를 할수없습니다.");</script>')
    }
  });
}
}